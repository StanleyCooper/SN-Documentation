(function executeRule(current, previous /*null when async*/) {

	// Add your code here

	//Build array of current/previous skills
	var previousSkills = previous.skills.split(',');
	var currentSkills = current.skills.split(',');
	var diffSkills = diff(previousSkills,currentSkills);

	//If skill removed
	if(previousSkills.length > currentSkills.length){

		//For each skill removed
		for (var i = 0; i < diffSkills.length; i++) {

			//query for tasks with this parent and found skill
			var cancelTaskGR = new GlideRecord('wm_task');
			cancelTaskGR.addEncodedQuery('skillsLIKE' + diffSkills[i] + '^parent=' + current.sys_id);
			cancelTaskGR.query();
			if(cancelTaskGR.next()){
				cancelTaskGR.state = 7;
				cancelTaskGR.work_notes = 'Task cancelled due to skill being removed on work order.';
				cancelTaskGR.update();
			}
		}
	}

	else{
		//For each skill added
		for (var j = 0; j < diffSkills.length; j++) {

			//create a task from the new skills
			var createTaskGR = new GlideRecord('wm_task');
			createTaskGR.initialize();
			createTaskGR.parent = current.sys_id;
			createTaskGR.u_caller = current.caller;
			createTaskGR.u_caller_phone = current.u_caller_phone;
			createTaskGR.u_caller_email = current.u_caller_email;
			createTaskGR.u_event_location = current.u_event_location;
			createTaskGR.skills = diffSkills[j];
			createTaskGR.short_description = current.short_description;
			createTaskGR.description = current.description;
			createTaskGR.state = 10;//Pending Dispatch;
			createTaskGR.dispatch_group.setDisplayValue('SN Media Services Managers');
			createTaskGR.u_reserved_start_time = current.u_reserved_start_time;
			createTaskGR.u_reserved_end_time = current.u_reserved_end_time;
			createTaskGR.u_event_start_time = current.u_event_start_time;
			createTaskGR.u_event_end_time = current.u_event_end_time;
			createTaskGR.u_reservation_id = current.u_reservation_id;
			createTaskGR.u_booking_id = current.u_booking_id;
			createTaskGR.u_event_type = current.u_event_type;
			createTaskGR.u_estimated_event_attendance = current.u_estimated_event_attendance;
			createTaskGR.u_service_order_id = current.u_service_order_id;

			var groupSkillGR = new GlideRecord('sys_group_has_skill');
			groupSkillGR.addEncodedQuery('skill=' + diffSkills[j]);
			groupSkillGR.query();
			if(groupSkillGR.next()){
				createTaskGR.assignment_group = groupSkillGR.group;
			}

			createTaskGR.insert();
		}
	}

	function diff(arr1, arr2) {
		var filteredArr1 = arr1.filter(function(ele) {
			return arr2.indexOf(ele) == -1;
		});

		var filteredArr2 = arr2.filter(function(ele) {
			return arr1.indexOf(ele) == -1;
		});
		return filteredArr1.concat(filteredArr2);
	}

})(current, previous);
