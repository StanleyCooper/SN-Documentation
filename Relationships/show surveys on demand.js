//Applies to table: Demand
//Queries from table: Assessmetn Instance

(function refineQuery(current, parent) {

	// Add your code here, such as current.addQuery(field, value);
	current.addQuery('task_id', parent.sys_id);

})(current, parent);
