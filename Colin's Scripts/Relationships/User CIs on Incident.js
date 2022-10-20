//Applies to Incident
//Queries from cmdb_ci


(function refineQuery(current, parent) {

	// Add your code here, such as current.addQuery(field, value);
	var caller = parent.caller_id;
	var affectedUser = parent.u_affected_user;

	current.addEncodedQuery('assigned_to=' + caller + '^ORassigned_to=' + affectedUser);

})(current, parent);
