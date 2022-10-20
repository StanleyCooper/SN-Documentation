(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	var gr = new GlideRecord("u_service_portal_announcement");
	gr.addQuery("u_display_first", true);
	gr.query();
	if (gr.next()) {
		var link = gr.getLink();
		gs.addErrorMessage('An announcement is already chosen to display first. Please click <a href = "/' + link + '">here</a> to update that announcement.');
		current.setAbortAction(true);
		current.u_display_first = previous.u_display_first;
	}


})(current, previous);
