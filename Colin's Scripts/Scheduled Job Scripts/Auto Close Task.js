autoCloseTickets();

function autoCloseTickets() {
var ps = gs.getProperty('glide.ui.autoclose.time'); //Here create your own system property and pass the updated name
var pn = parseInt(ps);
var queryTime = new GlideDateTime();
queryTime.addDaysUTC(-pn);

if (pn > 0) {
var gr = new GlideRecord('PASS TABLE NAME HERE');
gr.addQuery('sys_updated_on', '<', queryTime);
gr.query();
while(gr.next()) {
gr.state = 7;
gr.comments = 'Ticket automatically closed after ' + pn + ' days in the Resolved state.';
gr.active = false;
gr.update();
}
}
}
