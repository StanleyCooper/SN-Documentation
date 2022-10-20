// 2016-05-25 Aptris Gold Service Desk Logging
// Because it has a lower order number, this inbound action will intercept the out-of-box action
//
//	Note: current.opened_by is already set to the first UserID that matches the From: email address
if(current.opened_by.name == 'Guest'){
	gs.log('Current Caller is Guest','Rich');
	var isVendor = false;

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
		current.caller = rec.sys_id;
		current.u_affected_user = rec.sys_id;
		current.u_callback_number = rec.phone;
		current.short_description = email.subject;
		current.description = email.subject +"\n" +email.body_text; // added 9/12 STRY0245990
		current.contact_type = "email";
		current.insert();
	}
	else{
		current.caller = gs.getUserID();
		current.u_affected_user = gs.getUserID();
		current.u_callback_number =current.caller.phone;
		current.short_description = email.subject;
		current.description = email.subject +"\n" +email.body_text; // added 9/12 STRY0245990
		current.contact_type = "email";
		current.insert();
	}

}
else{
	current.caller = gs.getUserID();
	current.u_affected_user = gs.getUserID();
	current.u_callback_number =current.caller.phone;
	current.short_description = email.subject;
	current.description = email.subject +"\n" +email.body_text; // added 9/12 STRY0245990
	current.contact_type = "email";
	current.insert();
}
