(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {

    // Add your code here

    //Update RITM 'New extension date' field
    var openedDate = new GlideDateTime(); //Get currrent date
    var expDate = new GlideDateTime(current.variables.expiration_date); //Get current expiration date
    var dateLength = gs.dateDiff(openedDate.getDisplayValue(), expDate.getDisplayValue(), false); //Get length of time between opened and expiration date

    template.print(dateLength.split(' ')[0]);

})(current, template, email, email_action, event);
