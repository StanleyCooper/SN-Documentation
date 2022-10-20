//require attachment
function onSubmit() {
    'use strict';
    var attachment = new GlideRecord("sys_attachment");
    attachment.addQuery("table_name", "sc_cart_item");
    attachment.addQuery("table_sys_id", gel('sysparm_item_guid').value);
    attachment.query();
    if (!attachment.hasNext()) {
        alert("You must attach your public SSH Key. Please see instructions for more information.");
        return false;
    }
}
