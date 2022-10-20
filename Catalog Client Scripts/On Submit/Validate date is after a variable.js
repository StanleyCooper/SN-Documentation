//Validate Date is after variable
function onSubmit() {
    //validate that the start date is before the end date
    var st = getDateFromFormat(g_form.getValue("start_date_time"), g_user_date_time_format);
    var et = getDateFromFormat(g_form.getValue("end_date_time"), g_user_date_time_format);
    if (st > et) {
        g_form.hideAllFieldMsgs();
        alert("Estimated end date must be after the start date.");
        g_form.showErrorBox("resource_est_end_date", "Estimated end date must be after the start date.");
        return false;
    }
}
