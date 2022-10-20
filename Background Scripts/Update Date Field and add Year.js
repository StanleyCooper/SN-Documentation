var count = 0;

var gr = new GlideRecord("alm_hardware");
gr.addEncodedQuery('warranty_expiration!=NULL');
gr.query();
while (gr.next()) {
	var gdt = new GlideDateTime(gr.warranty_expiration);
	gdt.addYears(1);
	gs.log('Asset: ' + gr.display_name + ' Warranty Expiration ' + gr.warranty_expiration + 'New Date: ' + gdt.getDate());
	gr.u_replacement_date = gdt.getDate();
	gr.autoSysFields(false);
	gr.setWorkflow(false);
	gr.update();
	gr.setWorkflow(true);

	count++;
}

gs.log('Assets updated - ' + count);
