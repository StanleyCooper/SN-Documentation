(function() {
	// return the value to use for Parameter 1
	var mgr;
	var query = 'request_item=';
	query = query + current.task;
	var gr = new GlideRecord("sc_task");
	gr.addEncodedQuery(query);
	gr.query();
	if (gr.next()) {
		mgr = gr.assignment_group.manager.email.toString();
		}
	return mgr;
}());
