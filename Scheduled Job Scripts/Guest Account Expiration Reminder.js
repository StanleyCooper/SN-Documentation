//Send reminder 2 weeks
var twoWeeks = new GlideDate(); //generate current date
twoWeeks.addDays(14); //add number of days lead time to create requests for
twoWeeks.toString();

//find all accounts needed for reminder
var twoWeeksGR = new GlideRecord('alm_hardware');
twoWeeksGR.addEncodedQuery("u_guest_account_expiration_dateBETWEENjavascript:gs.dateGenerate('" + twoWeeks + "','00:00:00')@javascript:gs.dateGenerate('" + twoWeeks + "','23:59:59')");
twoWeeksGR.query();
while (twoWeeksGR.next()) {

	gs.eventQueue('cdw.guest.account.reminder.twoweek', twoWeeksGR);

}

//Send reminder 1 week
var oneWeek = new GlideDate(); //generate current date
oneWeek.addDays(7); //add number of days lead time to create requests for
oneWeek.toString();

//find all accounts needed for reminder
var oneWeekGR = new GlideRecord('alm_hardware');
oneWeekGR.addEncodedQuery("u_guest_account_expiration_dateBETWEENjavascript:gs.dateGenerate('" + oneWeek + "','00:00:00')@javascript:gs.dateGenerate('" + oneWeek + "','23:59:59')");
oneWeekGR.query();
while (oneWeekGR.next()) {

	gs.eventQueue('cdw.guest.account.reminder.oneweek', oneWeekGR);

}

//Send reminder 2 days
var twoDays = new GlideDate(); //generate current date
twoDays.addDays(2); //add number of days lead time to create requests for
twoDays.toString();

//find all accounts needed for reminder
var twoDaysGR = new GlideRecord('alm_hardware');
twoDaysGR.addEncodedQuery("u_guest_account_expiration_dateBETWEENjavascript:gs.dateGenerate('" + twoDays + "','00:00:00')@javascript:gs.dateGenerate('" + twoDays + "','23:59:59')");
twoDaysGR.query();
while (twoDaysGR.next()) {

	gs.eventQueue('cdw.guest.account.reminder.twodays', twoDaysGR);

}
