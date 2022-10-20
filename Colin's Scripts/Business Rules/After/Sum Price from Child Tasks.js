(function executeRule(current, previous /*null when async*/ ) {
    // Add your code here
    var price = [];
    var grPrice;
    var wotGR = new GlideRecord("wm_task");
    wotGR.addEncodedQuery('parent=' + current.parent.sys_id + '^state!=7');
    wotGR.query();
    while (wotGR.next()) {

        grPrice = parseFloat(wotGR.u_price.getReferenceValue());
		price.push(grPrice);

    }

    var sum = 0;
    for (var i = 0; i < price.length; i++) {
        sum += price[i];
    }


    var woGR = new GlideRecord("wm_order");
    woGR.addEncodedQuery("sys_id=" + current.parent.sys_id);
    woGR.query();
    if (woGR.next()) {
        woGR.u_total_price = sum;
        woGR.update();
    }



})(current, previous);
