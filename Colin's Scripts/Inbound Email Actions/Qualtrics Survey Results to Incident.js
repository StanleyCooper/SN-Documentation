//recipeints contains qualtrics2stattest@hms.harvard.edu

//set customer variable from email box
var customer = email.body.customer.toString().trim();
customer = customer + '@med.harvard.edu';

//set customer not found
var customerNotFound = email.body.customer.toString().trim();

//set disable notification
var disableNotification = email.body.disable_notification.toString().trim();

//set customer phone
var customerPhone = email.body.customer_phone.toString().trim();

//set customer email
var customerEmail = email.body.customer_email.toString().trim();

//set service
var service = email.body.service.toString().trim();

//set ticket type
var ticketType = email.body.ticket_type.toString().trim();

//set request type
var requestType = email.body.request_type.toString().trim();

//set app/hardware
var appHardware = email.body.app_hardware.toString().trim();

//set Duedate
var dueDate = email.body.due_date.toString().trim();

//set watchlist
var watchList = email.body.watch_list.toString().trim();

//Set contact type
var contactType = email.body.contact_type.toString().trim();

//set assignment group
var assignmentGroup = email.body.assignment_group.toString().trim();

//set assigned to
var assignedTo = email.body.assigned_to.toString().trim();

//set status
var status = email.body.status.toString().trim();

//set impact
var emailImpact = email.body.impact.toString().trim();

//set urgency
var emailUrgency = email.body.urgency.toString().trim();

//set Location of Incident
var locationOfIncident = email.body.location_of_incident.toString().trim();

//set short description
var shortDescription = email.body.short_description.toString().trim();

//set description
var description = email.body_text.split("\nDescription:")[1];

/**********

The if(var != ') is checking if the variable exists in the email. if not don't set values on the incident.

***********/


//Search if a customer exists from eCommons ID
if(customer != null){

	var customerGR = new GlideRecord('sys_user');
	customerGR.addEncodedQuery('user_name=' + customer);
	customerGR.query();

	//if found set customer to that record
	if(customerGR.next()){
		current.caller_id = customerGR.sys_id;
		current.opened_by.setValue(customerGR.name);
	}
	else{

		//if not found, set caller not found, caller name, caller email and opened by
		current.u_caller_not_found = true;
		current.u_caller_name = customerNotFound;
		current.u_caller_email = customerEmail;
		//current.opened_by.setDisplayValue('Guest');
	}
}

//check if notifications should be disabled if so set
if(disableNotification != null){
	var disableNotificationGR = new GlideRecord('sys_choice');
	disableNotificationGR.addEncodedQuery('element=notify^name=incident^label=' + disableNotification);
	disableNotificationGR.query();
	if(disableNotificationGR.next()){
		current.notify = disableNotificationGR.value;
	}
}

//set customer phone
if(customerPhone != null){
	current.u_caller_phone = customerPhone;
}

//set customer email
if(customerEmail != null){
	current.u_caller_email = customerEmail;
}

//set service
if(service != null){
	current.u_service_offering.setDisplayValue(service);
}

//set tickettype
if(ticketType != null){

	var ticketTypeGR = new GlideRecord('sys_choice');
	ticketTypeGR.addEncodedQuery('element=category^name=incident^label=' + ticketType);
	ticketTypeGR.query();
	if(ticketTypeGR.next()){
		current.category = ticketTypeGR.value;
	}
}

//set request type
if(requestType != null){
	var requestTypeGR = new GlideRecord('sys_choice');
	requestTypeGR.addEncodedQuery('element=subcategory^name=incident^label=' + requestType);
	requestTypeGR.query();
	if(requestTypeGR.next()){
		current.subcategory = requestTypeGR.value;
	}

}

//set apphardware
if(appHardware != null){
	current.cmdb_ci.setDisplayValue(appHardware);
}

//set Due Date
if(dueDate != null){
	current.due_date.setDisplayValue(dueDate);
}

//set watchlist
if(watchList != null){
	current.watch_list.setDisplayValue(watchList);
}

//set contact type
if(contactType != null){
	current.contact_type.setDisplayValue(contactType);
}

//set assignment group
if(assignmentGroup != null){
	current.assignment_group.setDisplayValue(assignmentGroup);
}

//set assigned to
if(assignedTo != null){
	current.assigned_to.setDisplayValue(assignedTo);
}

//set status
if(status != null){

	var statusGR = new GlideRecord('sys_choice');
	statusGR.addEncodedQuery('element=state^name=incident^label=' + status);
	statusGR.query();
	if(statusGR.next()){
		current.state = statusGR.value;
	}

}

//set impact
if(emailImpact != null){

	var impactGR = new GlideRecord('sys_choice');
	impactGR.addEncodedQuery('element=impact^name=incident^label=' + emailImpact);
	impactGR.query();
	if(impactGR.next()){
		current.impact = impactGR.value;
	}

}

//set urgency
if(emailUrgency != null){
	var urgencyGR = new GlideRecord('sys_choice');
	urgencyGR.addEncodedQuery('element=urgency^name=incident^label=' + emailUrgency);
	urgencyGR.query();
	if(urgencyGR.next()){
		current.urgency = urgencyGR.value;
	}

}

//set Location of Incident
if(locationOfIncident != null){
	var locIncGR = new GlideRecord('cmn_location');
	locIncGR.addEncodedQuery('full_name=' + locationOfIncident);
	locIncGR.query();
	if(locIncGR.next()){
		current.location = locIncGR.sys_id;
	}
}

//set short description
if(shortDescription != null){
	current.short_description = shortDescription;
}

//set description
if(description != null){
	current.description = description;
}

current.insert(); 
