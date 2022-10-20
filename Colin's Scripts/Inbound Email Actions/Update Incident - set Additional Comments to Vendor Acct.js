gs.include('validators');

if (current.getTableName() == "incident") {

	var gr = current;

	if (email.subject.toLowerCase().indexOf("please reopen") >= 0){
		gr = new Incident().reopen(gr, email) || gr;
	}
	else if (email.subject.toLowerCase().indexOf("please close ticket") >= 0){
		gr.state = 7;
		gr.incident_state = 7;
		gr.work_notes = "The caller has accepted resolution of this incident";
	}

	//get the domain of the current email
	var vendor = email.origemail.split('@')[1];
	var vendorName = '';
	vendor = '@' + vendor;
	//gs.log(vendor,'Rich');

	//query for vendor record
	var rec = new GlideRecord("sys_user");
	rec.addQuery("user_name", vendor);
	rec.query();
	if (rec.next()) {
		gs.log(rec.name + ' gr found','Rich');
		vendorName = rec.name;
		var commentMsg = "reply from: " + vendorName + "\n\n" + email.body_text;
		gr.comments.setJournalEntry(commentMsg,vendorName);
	}
	else{
		gs.log(vendorName + " is Blank",'Rich');
		gr.comments = "reply from: " + email.origemail + "\n\n" + email.body_text;
	}

	if (gs.hasRole("itil")) {
		if (email.body.assign != undefined)
			gr.assigned_to = email.body.assign;

		if (email.body.priority != undefined && isNumeric(email.body.priority))
			gr.priority = email.body.priority;
	}

	gr.update();
}
