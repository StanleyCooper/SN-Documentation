var gd = new GlideDate();
gs.log(gd);
gd.addDays(1798);
gd.toString();
gs.log(gd);

var gr = new GlideRecord('alm_hardware');
gr.addEncodedQuery("u_replacement_dateON" + gd + "@javascript:gs.dateGenerate('" + gd + "','start')@javascript:gs.dateGenerate('" + gd + "','end')");
gr.query();
while(gr.next()){
gs.log(gr.asset_tag);
}
