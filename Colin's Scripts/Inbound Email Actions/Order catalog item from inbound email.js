var	employee = email.body.employee.toString();
var	contractor = email.body.contractor.toString();
var manager = email.body.manager.toString();
var	jobTitle = email.body.job_title.toString();
var	office = email.body.office.toString();
var	hireDate = email.body.hire_date.toString();
var	effectiveDate = email.body.effective_date.toString();
var	removePayroll = email.body.remove_from_payroll_on.toString();
var	dateNotice = email.body.date_notice_was_given.toString();
var	sendPassword = email.body.send_new_password_to.toString();
var	replacementManager = email.body.replacement_manager_if_currently_a_manager.toString();
var	extendAccess = email.body.extend_access_for_x_days.toString();
var	forwardCallsTo = email.body.forward_calls_to.toString();
var	forwardEmails = email.body.forward_emails_to.toString();
var	mailboxAccess = email.body.mailbox_access.toString();

//get the user ID of the employee
employee = employee.split('(');
employee = employee[1].split('\\');
employee = employee[1].split(')');

//query for employee and return the sys_id
var employeeGr = new GlideRecord('sys_user');
employeeGr.addQuery('user_name',employee[0]);
employeeGr.query();
if(employeeGr.next()){
	//gs.log('Employee found ' + employeeGr.name + ' sys id ' + employeeGr.sys_id , 'Aptris');
	employee = [{
		name: employeeGr.name,
		first_name: employeeGr.first_name,
		middle_name: employeeGr.middle_name,
		last_name: employeeGr.last_name,
		location: employeeGr.location.u_site_code,
		sys_id: employeeGr.sys_id
	}];
	//employee = employeeGr.sys_id.toString();
}

//get the user ID of the manager
manager = manager.split('(');
manager = manager[1].split('\\');
manager = manager[1].split(')');

//query for manager and return the sys_id
var managerGr = new GlideRecord('sys_user');
managerGr.addQuery('user_name',manager[0]);
managerGr.query();
if(managerGr.next()){
	//gs.log('manager found ' + managerGr.name + ' sys id ' + managerGr.sys_id , 'Aptris');
	manager = managerGr.sys_id.toString();
}

//get the name of Send Password - check to see if the user can be provided with the User id for uniqueness and proper name check similar to employee and manager
sendPassword = sendPassword.split(',');
sendPassword = sendPassword[1] + ' ' + sendPassword[0];
sendPassword = sendPassword.trim();
//gs.log('sendPassword is ' + sendPassword , 'Aptris');

//query for sendPassword user and return the sysID
var sendPasswordGr = new GlideRecord('sys_user');
sendPasswordGr.addQuery('name',sendPassword);
sendPasswordGr.query();
if(sendPasswordGr.next()){
	//gs.log('sendPassword found ' + sendPasswordGr.name + ' sys id ' + sendPasswordGr.sys_id , 'Aptris');
	sendPassword = sendPasswordGr.sys_id.toString();
}

//get the name of replacement manager - check to see if the user can be provided with the User id for uniqueness and proper name check similar to employee and manager
replacementManager = replacementManager.split(',');
replacementManager = replacementManager[1] + ' ' + replacementManager[0];
replacementManager = replacementManager.trim();
//gs.log('replacementManager is ' + replacementManager , 'Aptris');

//query for replacementManager user and return the sysID
var replacementManagerGr = new GlideRecord('sys_user');
replacementManagerGr.addQuery('name',replacementManager);
replacementManagerGr.query();
if(replacementManagerGr.next()){
	//gs.log('replacementManager found ' + replacementManagerGr.name + ' sys id ' + replacementManagerGr.sys_id , 'Aptris');
	replacementManager = replacementManagerGr.sys_id.toString();
}

//get the name of forwardEmails - check to see if the user can be provided with the User id for uniqueness and proper name check similar to employee and manager
forwardEmails = forwardEmails.split(',');
	forwardEmails = forwardEmails[1] + ' ' + forwardEmails[0];
	forwardEmails = forwardEmails.trim();
	//gs.log('forwardEmails is ' + forwardEmails , 'Aptris');

//query for forwardEmails user and return the sysID
var forwardEmailsGr = new GlideRecord('sys_user');
forwardEmailsGr.addQuery('name',forwardEmails);
	forwardEmailsGr.query();
	if(forwardEmailsGr.next()){
	//gs.log('forwardEmails found ' + forwardEmailsGr.name + ' sys id ' + forwardEmailsGr.sys_id , 'Aptris');
	forwardEmails = forwardEmailsGr.sys_id.toString();
	}

//get the name of mailboxAccess - check to see if the user can be provided with the User id for uniqueness and proper name check similar to employee and manager
mailboxAccess = mailboxAccess.split(',');
mailboxAccess = mailboxAccess[1] + ' ' + mailboxAccess[0];
mailboxAccess = mailboxAccess.trim();
//gs.log('mailboxAccess is ' + mailboxAccess , 'Aptris');

//query for mailboxAccess user and return the sysID
var mailboxAccessGr = new GlideRecord('sys_user');
mailboxAccessGr.addQuery('name',mailboxAccess);
mailboxAccessGr.query();
if(mailboxAccessGr.next()){
	//gs.log('mailboxAccess found ' + mailboxAccessGr.name + ' sys id ' + mailboxAccessGr.sys_id , 'Aptris');
	mailboxAccess = mailboxAccessGr.sys_id.toString();
}

//Get date only in year-month-day to set the effective date
var dateOnly = effectiveDate.split(' ')[0];
dateOnly = dateOnly.split('/');
var dMonth = dateOnly[0].toString();
if(dMonth.length == 1){
	dMonth = '0' + dMonth;
}
var dDay = dateOnly[1].toString();
if(dDay.length == 1){
	dDay = '0' + dDay;
}
var dYear = dateOnly[2].toString();
effectiveDate = dYear + '-' + dMonth + '-' + dDay + ' 00:00:00';

gs.log('Employee: ' + employee + '\nContractor: ' + contractor + '\nManager: ' + manager + '\nJob Title: ' + jobTitle + '\nOffice: ' + office + '\nHire Date: ' +hireDate + '\nEffective Date: ' + effectiveDate + '\nRemove From Payroll On: ' + removePayroll + '\nDate Notice was Given: ' + dateNotice + '\nSend New Password To: ' + sendPassword + '\nReplacement Manager (if currently a manager): ' + replacementManager + '\nExtend Access For x Days: ' + extendAccess + '\nForward Calls To: ' + forwardCallsTo + '\nForward Emails To: ' + forwardEmails + '\nMailbox Access: ' + mailboxAccess , 'Aptris');

var cartId = GlideGuid.generate(null);
var cart = new Cart(cartId);


//sys_id of catalog item
var item = cart.addItem('b737da14dbd7df00326336be3b961912');

//Set value of all variables
cart.setVariable(item, 'employee_name', employee[0].name);
cart.setVariable(item, 'firstName', employee[0].first_name);
cart.setVariable(item, 'middleName', employee[0].middle_name);
cart.setVariable(item, 'lastName', employee[0].last_name);
cart.setVariable(item, 'manager', manager);
cart.setVariable(item, 'branchcode', employee[0].location);
cart.setVariable(item, 'effectivedate', effectiveDate);


var rc = cart.placeOrder();
var gr = new GlideRecord("sc_req_item");

// Stop to process next inbound actions


event.state="stop_processing";

// Workaround to set target to REQ
sys_email.instance = rc.sys_id;
sys_email.target_table = rc.getTableName();
sys_email.update();
