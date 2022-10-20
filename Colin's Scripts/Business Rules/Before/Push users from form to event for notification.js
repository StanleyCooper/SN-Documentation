(function executeRule(current, previous /*null when async*/) {
	//This goes to end-users when the Incident is Opened - caller/affected user if applicable
	//Event "incident.opened.notify" triggers notification "Aptris - Incident opened for me"
	// Start our arrays for the users/groups this goes to. sendUsers is sysparm1, sendGroups is sysparm2
	var sendUsers = [];
	var sendGroups = [];
	var sendTechs = [];

	//Check if the caller/affected user are different, if yes, check each individually to push
	if(current.u_affected_user != current.caller_id){
		//Check if we should notify the caller on this
		if(current.u_no_notify_caller == false){
			sendUsers.push(current.caller_id.toString());
		}
		//Check if we should notify the affected user on this
		if(current.u_no_notify_affected_user == false){
			sendUsers.push(current.u_affected_user.toString());
		}
	}
	//Otherwise, check as a unit and send if we neither is checked
	else{
		if(current.u_no_notify_caller == false && current.u_no_notify_affected_user == false){
			sendUsers.push(current.caller_id.toString());
		}
	}
	//check that there is someone in assigned to
	if(current.assigned_to.user_name != current.sys_updated_by){
		sendTechs.push(current.assigned_to.toString());
	}
	//trigger event for users
	gs.eventQueue('incident.assignedTo.notifyTech',current, sendTechs);
	gs.eventQueue('incident.assignedTo.notifyEndUser',current, sendUsers, sendGroups);

})(current, previous);
