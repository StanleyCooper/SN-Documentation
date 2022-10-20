function onChange(control, oldValue, newValue, isLoading, isTemplate) {

    if (isLoading || newValue === '') {
        return;
    }

    //get the new and current date/time as an object
    var dateObjectNow = new Date();
    var dateObjectNew = new Date(newValue);
    //get the dates in days - also use floor to convert valeus to integers
    var dateNow = Math.floor(dateObjectNow.valueOf()/(1000*60*60*24));
    var dateNew = Math.floor(dateObjectNew.valueOf()/(1000*60*60*24));
    // Get day of week (Sunday = 0)
    var dayOfWeek = dateObjectNew.getDay();

    // Check Date if date is 2 or more days in the future and not on the weekend.
    // dateNow is the Date/Time now, whereas dateNew is the date at midnight
    // so dateNew currently equals dateNow -1.  So use 2 in the check below (not 2).
    var msg;
    if (dateNew >= (dateNow + 2) && dayOfWeek > 0 && dayOfWeek < 6) {
        msg = 'Date is OK';
        g_form.hideFieldMsg('date_required',true);
        g_form.showFieldMsg('date_required',msg,'info',false);
    }
    else {
        msg = 'ERROR: Date must be 2 or more days in the future and not on the weekend.';
        g_form.hideFieldMsg('date_required',true);
        g_form.showFieldMsg('date_required',msg,'error',false);
    }
}
