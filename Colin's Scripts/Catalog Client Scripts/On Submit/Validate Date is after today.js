//Validate Date is after today
//GwtDate not available on service portal
function onSubmit() {
    //Type appropriate comment here, and begin script below
    //validate that the start date is before the today's date
    var field = 'start_date';
    var st = g_form.getValue(field);
    var newTime = new GwtDate(st);
    var tm = new GwtDate();
    tm.now();
    tm.subtractHours(24);
    if (newTime.compare(tm, true) < 0) {
        g_form.hideFieldMsg(field, true);
        g_form.showFieldMsg(field, 'Start date must be after the today\'s date.', 'error');
        return false;
    }
}
