// Query all Time Sheets for the previous week and Submit them automatically it will submit and approve as users through impersonation

var groupMemberArray = []; // Create an empty array
var grpProperty = gs.getProperty('managers.time.entry.users'); // Currently set to 'd816491e1b505810ee41fc43cd4bcbf9' (Managers - Time Entry Users)

// Find all members of the 'Managers - Time Entry Users' group. Use these to determine their direct reports
var grpMembers = new GlideRecord('sys_user_grmember');
grpMembers.addQuery('group', grpProperty); // Group that contains the managers
grpMembers.query();

while (grpMembers.next()) {
	groupMemberArray.push(grpMembers.getValue('user')); // Build the Array of Manager sys_id's
}

// Loop through the User records where Manager = groupMemberArray manager to find all direct reports
for (var i = 0; i < groupMemberArray.length; i++) {

	//var mgr = groupMemberArray[i]; // sys_id of the manager
	var userArray = []; // Create an empty array
	var teamMember = new GlideRecord('sys_user');
	teamMember.addQuery('manager', groupMemberArray[i]);
	teamMember.addActiveQuery();
	teamMember.query();

	while (teamMember.next()) {

		var tSheet = new GlideRecord('time_sheet');

		//tSheet.addEncodedQuery('week_starts_onRELATIVEEE@dayofweek@ago@7^user=' + teamMember.getUniqueValue()); // Week starts on the previous Sunday
		//tSheet.addEncodedQuery('week_starts_onRELATIVEGE@dayofweek@ago@15^user=' + teamMember.getUniqueValue()); // Set to how ever many days from today for testing
		tSheet.addEncodedQuery("week_starts_onON2020-06-21@javascript:gs.dateGenerate('2020-06-21','start')@javascript:gs.dateGenerate('2020-06-21','end')^user=" + teamMember.getUniqueValue());
		tSheet.query();
		if (tSheet.next()) {

			//Query for all timecards where total time on time card is 0 hours and delete them
			var tCard = new GlideRecord('time_card');
			tCard.addEncodedQuery('time_sheet=' + tSheet.sys_id);
			tCard.query();
			while(tCard.next()){
				if(tCard.total <= 0){
					gs.log('---Time Card--- : Time Card for ' + tCard.user.name + ' deleted via Automatic Time Sheet Approval Scheduled Job.');
					tCard.deleteRecord();
				}
			}

			userArray.push(tSheet.getDisplayValue('user'));
			userArray.push(tSheet.total_hours);


			//var timeSheetId = tSheet.getUniqueValue();
			var timeSheetId = tSheet.sys_id;
			var timeSheet = new TimeSheetCDW(timeSheetId);

			timeSheet.submitTimeCards(teamMember.getUniqueValue());
			gs.sleep('5000'); // Wait 5 seconds
			timeSheet.approveTimeCards(groupMemberArray[i]);
		}
	}

	//gs.eventQueue('time_sheet_submitted_approved', teamMember, mgr, userArray);
	gs.eventQueue('time_sheet_submitted_approved', teamMember, groupMemberArray[i], userArray);

}



/////////
// Script Include
////////


var TimeSheetCDW = Class.create();
TimeSheetCDW.prototype = {
    initialize: function(obj) {
		if (obj instanceof GlideRecord) {
			this.gr = obj;
			this.sysId = this.gr.getValue('sys_id');
		}
		else {
			this.sysId = obj;
			this.gr = this.getGlideRecord();
		}
		//roll up fields map from time_card to time_sheet
		this.rollupFieldsMap = {
			monday: "monday",
			tuesday: "tuesday",
			wednesday: "wednesday",
			thursday: "thursday",
			friday: "friday",
			saturday: "saturday",
			sunday: "sunday",
			total: "total_hours"
		};

		var timesheetPolicy = TimeSheetPolicy.getFromUserId(gs.getUserID());
		this.isAllowMultipleRatetypes = timesheetPolicy.allowMultipleRatetypes();
		this.defaultRateType = timesheetPolicy.defaultRateType();
	},

	rollupStateFromTimeCards: function() {
		var countByState = {};
		var timeSheetState;
		var timeCards = new GlideAggregate("time_card");
		timeCards.addQuery("time_sheet", this.sysId);
		timeCards.addAggregate("COUNT", "state");
		timeCards.groupBy("state");
		timeCards.query();
		while (timeCards.next()) {
			countByState[timeCards.getValue("state")] = parseInt(timeCards.getAggregate("COUNT", "state"));
		}

		timeSheetState = "Pending";

		if(countByState["Pending"] > 0)
			timeSheetState = "Pending";
		else if(countByState["Recalled"] > 0)
			timeSheetState = "Recalled";
		else if(countByState["Rejected"] > 0)
			timeSheetState = "Rejected";
		else if (countByState["Submitted"] > 0)
			timeSheetState = "Submitted";
		else if (countByState["Approved"] > 0)
			timeSheetState = "Approved";
		else if (countByState["Processed"] > 0)
			timeSheetState = "Processed";

		var timeSheetGR = this.getGlideRecord();
		timeSheetGR.setValue("state", timeSheetState);
		return timeSheetGR.update();
	},

	recalculateHoursFields: function(fields) {
		var index;
		var timeCards = new GlideAggregate("time_card");
		timeCards.addQuery("time_sheet", this.sysId);
		for (index in fields) {
			timeCards.addAggregate("SUM", fields[index]);
		}
		timeCards.setGroup(false);
		timeCards.query();
		if (timeCards.next()) {
			for (index in fields) {
				this.gr.setValue(this.rollupFieldsMap[fields[index]], timeCards.getAggregate("SUM", fields[index]));
			}
			this.gr.update();
		}
	},

	recalculateAllHoursFields: function() {
		var allFields = Object.keys(this.rollupFieldsMap);
		this.recalculateHoursFields(allFields);
	},

	submitTimeCards: function(user) {
		var myUser = gs.getSession().impersonate(user);
		var userId;
		var timeCards = this.timeCardsPendingSubmission(); // Time Cards : State = Pending,Rejected,Recalled
		//gs.log('Time Card Submitted by ' + user);
		return this.updateTimeCardState(timeCards, 'Submitted', user);
	},

	approveTimeCards: function(user) {
		var myUser = gs.getSession().impersonate(user);
		var userId;

		if (!gs.hasRole('timecard_admin')) {
			userId = gs.getUserID();
		}

		var timeCards = this.timeCardsPendingApproval(userId);
		return this.updateTimeCardState(timeCards, 'Approved', user);
	},

	rejectTimeCards: function() {
		var userId;
		if (!gs.hasRole('timecard_admin'))
			userId = gs.getUserID();
		var timeCards = this.timeCardsPendingApproval(userId);
		return this.updateTimeCardState(timeCards, 'Rejected');
	},

	checkValidRecallPeriod: function(view) {
		if (!view)
			view = 'TimeSheet';
		var timeSheetPolicy = TimeSheetPolicy.getFromUserId(this.gr.getValue('user'));
		var valid = false;
		var msg = '';
		if (timeSheetPolicy.canBeRecalled()){
			var currentDate = new GlideDate();
			var timesheetRecallExpireDate = new GlideDate();
			timesheetRecallExpireDate.setValue(this.gr.week_starts_on);
			var allowedRecalledPeriod = parseInt(timeSheetPolicy.recallPeriod());
			timesheetRecallExpireDate.addDays(7 + allowedRecalledPeriod);
			if (timesheetRecallExpireDate.after(currentDate))
				valid = true;
			else
				msg = gs.getMessage('You cannot recall the {0} since it has crossed the recall period of {1} days',[view.toString(),allowedRecalledPeriod.toString()]);
		} else
			msg = gs.getMessage('You cannot recall the timesheet as it\'s not allowed as per policy');
		return {
			valid: valid,
			message: msg,
		};
	},

	recallTimeCards: function() {
		var timeCards = this.getTimeCards("stateINProcessed,Approved");
		return this.updateTimeCardState(timeCards, 'Recalled');
	},

	updateTimeCardState: function(timeCards, newState, user) {

		var myUser = gs.getSession().impersonate(user);
		var field, successCount = 0;
		while (timeCards.next()) {

			timeCards.setWorkflow(false);

			if(newState == 'Submitted'){
				timeCards.setValue('state', newState);
				var tSheet = new GlideRecord('time_sheet');
				tSheet.addEncodedQuery('sys_id=' + timeCards.time_sheet.toString());
				tSheet.query();
				if(tSheet.next()){
					tSheet.setWorkflow(false);
					tSheet.setValue('state', 'Submitted');
					tSheet.update();
				}
			}
			else if(newState == 'Approved'){
				timeCards.setValue('state', 'Approved');
				var tSheet = new GlideRecord('time_sheet');
				tSheet.addEncodedQuery('sys_id=' + timeCards.time_sheet.toString());
				tSheet.query();
				if(tSheet.next()){
					tSheet.setWorkflow(false);
					tSheet.setValue('state', 'Approved');
					tSheet.update();
				}
			}
			else{
				timeCards.setValue('state', newState);
			}

			if (timeCards.update())
				successCount++;
		}
		gs.log('Time Sheet is ' + timeCards.time_sheet);
		gs.getSession().impersonate(myUser);

		return successCount;
	},

	hasApprovedOrProcessedTimeCards: function() {
		var timeCards = new GlideAggregate('time_card');
		timeCards.addQuery('time_sheet', this.sysId);
		timeCards.addQuery('state', 'IN', 'Approved,Processed');
		timeCards.setGroup(false);
		timeCards.addAggregate('COUNT');
		timeCards.query();

		var count = 0;
		if (timeCards.next())
			count = parseFloat(timeCards.getAggregate('COUNT'));

		return count > 0;
	},

	timeCardsPendingSubmission: function() {
		var timeCards = new GlideRecord('time_card');
		timeCards.addQuery('state', 'IN', 'Pending,Rejected,Recalled');
		var filter = timeCards.getEncodedQuery();
		return this.getTimeCards(filter);
	},

	timeCardsPendingApproval: function(userId) {
		var timeCards = new GlideRecord("time_card");
		timeCards.addQuery('state', 'Submitted');
		if (JSUtil.notNil(userId)) {
			timeCards.addQuery('approver_list', new TimecardAjax().getUserandDelegators());
			timeCards.addQuery('approved_by', 'DOES NOT CONTAIN', userId).addOrCondition('approved_by', null);
		}
		var filter = timeCards.getEncodedQuery();
		return this.getTimeCards(filter);
	},

	getTimeCards: function(filter) {
		var timeCards = new GlideRecord("time_card");
		timeCards.addQuery("time_sheet", this.sysId);
		if (JSUtil.notNil(filter))
			timeCards.addEncodedQuery(filter);
		timeCards.query();
		return timeCards;
	},


	getTaskIds: function() {
		var gr = this.getTimeCards();
		var taskIds = [];
		while (gr.next())
			taskIds.push(gr.getValue('task'));

		return taskIds;
	},

	getTimeCardsToCopy: function(taskClosedAfter) {
		var currentTimeSheetTaskIds = this.getTaskIds();
		// Get all tasks of the time sheet that have been closed after the given GlideDate or still active
		var tasks = new GlideRecord('task');
		tasks.addQuery('sys_id', 'IN', currentTimeSheetTaskIds);
		tasks.addActiveQuery().addOrCondition('closed_at', '>=', TimeCardUtil.getWeekStartsOnDateTimeForUser(taskClosedAfter, this.gr.getValue('user')));
		tasks.query();

		var tasksToCopy = [];
		while (tasks.next()) {
			tasksToCopy.push(tasks.getValue('sys_id'));
		}

		var timeCards = new GlideRecord('time_card');
		timeCards.addQuery('time_sheet', this.sysId);
		sq = timeCards.addNullQuery('task'); // all non-task related time cards
		sq.addOrCondition('task', 'IN', tasksToCopy); // or all active task time cards
		timeCards.query();
		return timeCards;
	},

	copyFromPreviousTimeSheet: function(previousTimeSheetId, copyTime){
		if(JSUtil.nil(previousTimeSheetId))
			return;
		var count = 0;
		var previousTimeSheetGr = new GlideRecord('time_sheet');
		if(!(previousTimeSheetGr.get(previousTimeSheetId) && previousTimeSheetGr.canRead())){
			gs.addErrorMessage(gs.getMessage('You do not have permissions to perform this action.'));
			return;
		}
		var previousTimeSheet = new TimeSheet(previousTimeSheetId);
		var timeCardsToCopy = previousTimeSheet.getTimeCardsToCopy(this.gr.getValue('week_starts_on'));

		var currentTimeSheetTasks = [];
		var gr = this.getTimeCards('taskISNOTEMPTY');
		while (gr.next()) {
			var key = gr.getValue('task');
			if (gr.isValidField('project_time_category') && !gr.project_time_category.nil())
				key += gr.getValue('project_time_category');
			if (gr.isValidField('rate_type') && !gr.rate_type.nil())
				key += gr.getValue('rate_type');
			currentTimeSheetTasks.push(key);
		}
		var arrayUtil = new ArrayUtil();
		while(timeCardsToCopy.next()){
			// Skip if time card already exists for task
			if (!timeCardsToCopy.task.nil()) {
				var timeCardKey = timeCardsToCopy.getValue('task');
				if (timeCardsToCopy.isValidField('project_time_category') && !timeCardsToCopy.project_time_category.nil())
					timeCardKey += timeCardsToCopy.getValue('project_time_category');
				if (timeCardsToCopy.isValidField('rate_type') && !timeCardsToCopy.rate_type.nil())
					timeCardKey += timeCardsToCopy.getValue('rate_type');
				if (arrayUtil.contains(currentTimeSheetTasks, timeCardKey))
					continue;
			}
			if(this.copyTimeCard(timeCardsToCopy, copyTime))
				count++;
		}
		return count;
	},

	copyTimeCard: function(timeCard, copyTime){
		var newTimeCard = new GlideRecord('time_card');
		newTimeCard.initialize();
		var fieldsToCopy = ['category', 'comments','task', 'project_time_category', 'sys_domain'];
		if (copyTime)
			fieldsToCopy.push('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
		newTimeCard.setValue('time_sheet', this.sysId);
		newTimeCard.setValue('week_starts_on', this.gr.getValue('week_starts_on'));
		var rateType = this._getNewRateType(timeCard);
		if(!gs.nil(rateType))
			newTimeCard.setValue('rate_type', rateType);
		for(var i=0; i< fieldsToCopy.length; i++){
			if (timeCard.isValidField(fieldsToCopy[i]))
				newTimeCard[fieldsToCopy[i]] = timeCard.getValue(fieldsToCopy[i]);
		}
		return newTimeCard.insert();
	},

	_getNewRateType: function(sourceTimeCard) {
		var rateType;
		if(!this.isAllowMultipleRatetypes)
			rateType = null;
		else if(!gs.nil(sourceTimeCard.rate_type) && !sourceTimeCard.rate_type.active)
			rateType = this.defaultRateType;
		else
			rateType = sourceTimeCard.rate_type;

		return rateType;
	},

	getGlideRecord: function() {
		var gr = new GlideRecord("time_sheet");
		gr.get(this.sysId);
		return gr;
	},

	validateMaxHours: function(policy) {
		if (JSUtil.nil(policy)) {
			var user = this.gr.user.getRefRecord();
			policy = TimeSheetPolicy.getFromUser(user);
		}
		var daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		var exceedingMaxHours = false;
		var maxHoursPerDay = policy.maxHoursPerDay();
		var maxHoursPerWeek = policy.maxHoursPerWeek();

		var exceedingDays = [];
		for (i = 0; i < daysOfWeek.length; ++i) {
			if (parseFloat(this.gr.getValue(daysOfWeek[i])) > maxHoursPerDay) {
				exceedingDays.push(this.gr.getElement([daysOfWeek[i]]).getLabel());
				exceedingMaxHours = true;
			}
		}

		if (exceedingMaxHours)
			gs.addErrorMessage(gs.getMessage('Maximum hours per day cannot exceed {0} hours. The following days have exceeded maximum hours - {1}', [maxHoursPerDay, exceedingDays.join(',')]));

		if (maxHoursPerWeek > 0 && parseFloat(this.gr.getValue('total_hours')) > maxHoursPerWeek) {
			gs.addErrorMessage(gs.getMessage('Maximum hours per week cannot exceed {0} hours', maxHoursPerWeek));
			exceedingMaxHours = true;
		}

		return exceedingMaxHours;
	},

	deleteTimeCards: function() {
		var timeCards = this.getTimeCards();
		while (timeCards.next())
			timeCards.deleteRecord();
	},

	type: 'TimeSheetCDW'
};
