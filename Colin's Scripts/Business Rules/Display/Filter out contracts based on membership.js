(function executeRule(current, previous /*null when async*/ ) {

	var query = '';
	var queryString = '';
	var me = gs.getUserID(); // Get the sys_id for the currently logged-on user

	var roleCheck = new GlideRecord('sys_user_has_role'); // Check for 'admin' OR 'u_super_user' roles
	roleCheck.addEncodedQuery('role=76ad18e8db988014209464b4da96199d^ORrole=16bad17c13a304105e0376666144b03f^user=' + me);
	roleCheck.query();

	if (roleCheck.next()) {
		return query;
	}

	// TSI Entity Query Information
	var corps = corpsLookup(me); // Create a comma-separated list of Tempur Corporations
	var queryStringCorp = '';
	var corpString = corps.toString().split(',');

	// Contract Model Lookup
	var models = modelLookup(me); // Creates a comma-separated list of Contract Models
	var queryStringModel = '';
	var modelString = models.toString().split(',');

	if (current.getEncodedQuery().indexOf('sys_id=') != 0) { // What is this line doing? It returns "ORDERBYnumber"
		// Check if the user is a member of the TSI Entity
		if (corpString != '') {
			for (i = 0, len = corpString.length, text = ""; i < len; i++) {
				queryStringCorp = queryStringCorp + 'u_tempur_sealy_corporation=' + corpString[i] + '^OR';
			}
		}

		if (modelString != '') { //else if check if user is member of a Contract Model
			for (i = 0, len = modelString.length, text = ''; i < len; i++) {
				queryStringModel = queryStringModel + 'contract_model=' + modelString[i] + '^OR';
			}
		}

		if (!gs.hasRole('contract_manager') && !gs.hasRole('contract_read_only') && !gs.hasRole('admin') && gs.getSession().isInteractive()) {
			var dept = departmentLookup(me); // Creates a comma-separated list of Departments
			var queryStringDept = '';
			var deptString = dept.toString().split(',');

			if (deptString != '') {
				for (i = 0, len = deptString.length, text = ''; i < len; i++) {
					queryStringDept = queryStringDept + 'u_contract_department=' + deptString[i] + '^OR';
				}
			}
		}
	}

	queryString = queryStringCorp + queryStringModel + queryStringDept;

	if (queryString != '') {
		query = current.addEncodedQuery(queryString);
	}
	else {
		query = current.addEncodedQuery('u_tempur_sealy_corporation=' + 'd21788ef133fc810cbb674c66144b066'); // 'DoNotUse' Tempur Corporation
	}

	return query;

	// *************************************************************************************** //

	//Function to look up Entity
	function corpsLookup(me) {
		var answer = [];
		var tcUsers = new GlideRecord('u_m2m_tempur_corporations_users');
		tcUsers.addQuery('u_user', me);
		tcUsers.query();

		while (tcUsers.next()) {
			answer.push(tcUsers.u_tempur_corporations.toString());
		}

		return answer;
	}

	//Function to look up department
	function departmentLookup(me) {
		answer = [];
		var deptLookup = new GlideRecord('u_contract_department_users');
		deptLookup.addQuery('u_user', me);
		deptLookup.addQuery('u_active', true);
		deptLookup.query();

		while (deptLookup.next()) {
			answer.push(deptLookup.u_contract_department.toString());
		}

		return answer;
	}

	//Function to look up Models
	function modelLookup(me) {
		var answer = [];
		var tcModels = new GlideRecord('u_m2m_model_names_users');
		tcModels.addQuery('u_user', me);
		tcModels.query();

		while (tcModels.next()) {
			answer.push(tcModels.u_model_name.toString());
		}

		return answer;
	}

})(current, previous);
