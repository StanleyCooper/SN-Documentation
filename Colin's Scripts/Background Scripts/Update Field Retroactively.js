var count = 0;

var gr = new GlideRecord("alm_hardware");
gr.addEncodedQuery('asset_tag=PF0VY4V5');
gr.query();
while (gr.next()) {
	gs.log('Asset: ' + gr.display_name + ' Warranty Expiration ' + gr.warranty_expiration);
	gr.u_replacement_date = gr.warranty_expiration;
	gr.autoSysFields(false);
	gr.update();

	count++;
}

gs.log(count);
