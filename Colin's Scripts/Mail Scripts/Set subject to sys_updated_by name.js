(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
/* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
/* Optional GlideRecord */ event) {

	// Add your code here
	var userName;
	var gr = new GlideRecord("sys_user");
	gr.addQuery("user_name", current.sys_updated_by);
	gr.query();
	if (gr.next()) {
		userName = gr.first_name + ' ' + gr.last_name;
	}


	var str = current.number + ' has been escalated to your group by ' + userName;
	email.setSubject(str);



})(current, template, email, email_action, event);
