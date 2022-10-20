//condition to run
//current.parent.nil() && current.table_name != 'rm_enhancement' || current.parent.nil() && current.table_name != 'pm_project'

(function executeRule(current, previous /*null when async*/) {
	/*//Added by BPL on 12-8-2017
	var prevstordate = previous.schedule_start_date;
	var prevenordate = previous.schedule_end_date;
	var toptask = new GlideRecord('pm_project');
	toptask.get(current.getValue('top_task'));
	//gs.addInfoMessage('curretnt Partant: ' + current.getValue('top_task'));
	var orgdate = new GlideDateTime();
	orgdate.setDisplayValue(toptask.getValue('schedule_end_date'));
	//orgdate.setDisplayValue(toptask.schedule_end_date);
	var orgStartdate = new GlideDateTime();
	orgStartdate.setDisplayValue(toptask.getValue('schedule_start_date'));
	//orgStartdate.setDisplayValue(toptask.schedule_start_date);
	//end ADD BPL */
	var taskExclusions = new PlannedTaskRecalculationExclusion();
	if( !taskExclusions.isExcluded(current)) {
		var recalculationHelper = new RecalculationHelper();
        var doRecalculate = recalculationHelper.recalculate(current);
        if(doRecalculate) {
            var tasksToRecalculate = recalculationHelper.tasksToRecalculate(current);
            var plannedTaskAPI = new SNC.PlannedTaskAPI();
            var recalculationConstraintsStrategy = new RecalculationConstraintsStrategy();
            plannedTaskAPI.setConstraints(recalculationConstraintsStrategy.recalculationConstraint(current.top_task.getRefRecord()));
            var jsonRet = plannedTaskAPI.recalculateTaskWithPreviousGr(current, true, tasksToRecalculate, previous);
            var _previous = current.getValue('top_task') == current.getValue('sys_id') ? previous: undefined;
            PostEngineHandlers.fire(current.top_task, jsonRet, _previous);
        }
	}
	/*//added by BPL on 12-8-2017
	gs.addInfoMessage('BPL Prev End Date: ' + prevenordate);
	gs.addInfoMessage('BPL Prev Start Date: ' + prevstordate);
	current.schedule_end_date = prevenordate.getDisplayValue();
	current.schedule_start_date = prevstordate.getDisplayValue();
	//current.setWorkflow(false);
	current.update();
	//gs.addInfoMessage('original Date: ' + orgdate.getDisplayValue());
	//orgdate.addSeconds(-14400);
	//orgStartdate.addSeconds(-14400);
	if(current.sys_id != current.top_task){
		var newEnddate = new GlideDateTime();
		var newStartdate = new GlideDateTime();
		newStartdate.setDisplayValue(orgStartdate.getDate() + ' 08:00:00');
		newEnddate.setDisplayValue(orgdate.getDate() + ' 08:00:00');
		//toptask.schedule_end_date = orgdate.setDisplayValue(orgdate.getDate() + ' 00:00:00');
		//toptask.schedule_start_date = orgStartdate.setDisplayValue(orgStartdate.getDate() + ' 00:00:00');
		gs.addInfoMessage('BPL New End Date: ' + newEnddate);
		gs.addInfoMessage('BPL New Start Date: ' + newStartdate);
		toptask.schedule_end_date = newEnddate.getDisplayValue();
		toptask.schedule_start_date = newStartdate.getDisplayValue();

		//toptask.setWorkflow(false);
		toptask.update();
	}
	//end ADD BPL */

})(current, previous);
