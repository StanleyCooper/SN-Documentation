//check to see if user doesn't have the HR Management role
	if(!gs.hasRole('aptris_hr_user')){

		//query for all groups containing the role aptris_hr_user
		var assigmentGroupQuery = '';
		var hrGroups = [];

		var gr = new GlideRecord("sys_group_has_role");
		gr.addEncodedQuery("role.nameSTARTSWITHaptris_hr_user");
		gr.query();
		while (gr.next()) {
			var group = gr.group.toString();
			hrGroups.push({
				groupSysID : group
			});
		}
		//build a query string for filtering all groups
		for(var i=0; i < hrGroups.length; i++){
			assigmentGroupQuery = assigmentGroupQuery + 'sys_id!=' + hrGroups[i].groupSysID + '^';
		}

		var u = gs.getUserID();
		var str = assigmentGroupQuery; //sn-hr-aspen-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}
