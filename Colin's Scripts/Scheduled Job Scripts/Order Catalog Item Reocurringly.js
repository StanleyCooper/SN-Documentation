var gd = new GlideDate(); //generate current date
gd.addDays(1694); //add number of days lead time to create requests for
gd.toString();


//find all assets needed for reminder
var gr = new GlideRecord('alm_hardware');
gr.addEncodedQuery("install_status=1^substatus=staff_fte^assigned_to!=NULL^u_replacement_dateON" + gd + "@javascript:gs.dateGenerate('" + gd + "','start')@javascript:gs.dateGenerate('" + gd + "','end')");
gr.query();
while (gr.next()) {
    gs.log(gr.asset_tag);

    //order catalog item
    var itemSysId = gs.getProperty('cdw.classroomcheck.item');

    var cartId = GlideGuid.generate(null);
    var cart = new Cart(cartId, gr.assigned_to.sys_id);
    var item = cart.addItem(itemSysId); // Put the sys_id of the catalog item that you want to raise the request
    cart.setVariable(item, 'requested_for', gr.assigned_to.sys_id);
    cart.setVariable(item, 'asset', gr.sys_id);

    // set the other variables of your catalog item accordingly
    var rc = cart.placeOrder();
    rc.requested_for = gr.assigned_to.sys_id;
    rc.update();
    gs.info(rc.number);
}
