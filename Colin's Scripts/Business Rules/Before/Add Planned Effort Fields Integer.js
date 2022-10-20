(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	var totalEffort;
	var enhancementEffort = 0;
	var parentEffort;
	var currentEnhancementEffort = current.u_planned_effort;
	var parentRecord;

	var parentRec = new GlideRecord("sn_customerservice_case");
	parentRec.addQuery("number", current.parent.getDisplayValue());
	parentRec.query();
	if (parentRec.next()) {
		parentRecord=parentRec.sys_id;
		parentEffort = parentRec.u_estimated_hours;
		//gs.addInfoMessage('Parent Req hours ' + parentRec.u_estimated_hours);

	}

	totalEffort = currentEnhancementEffort + parentEffort;
	//gs.addInfoMessage('enhancement effor after parent ' + totalEffort);

	var encodedQuery = 'parent=' + parentRec.sys_id + '^sys_id!=' + current.sys_id;
	var enhancements = new GlideRecord('rm_enhancement');
	enhancements.addEncodedQuery(encodedQuery);
	enhancements.query();
	while(enhancements.next()){
		//gs.addInfoMessage(enhancements.u_planned_effort);
		enhancementEffort = enhancementEffort + enhancements.u_planned_effort;

	}

	totalEffort = totalEffort + enhancementEffort;
	parentRec.u_planned_effort_with_enhance = totalEffort;
	parentRec.update();
	//gs.addErrorMessage(totalEffort);

})(current, previous);
