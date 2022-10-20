multiVar();
function multiVar(){
current.work_notes = 'Run script';
current.description = '';

var idnum = current.sys_id;
current.work_notes = idnum;
var desc1 = '';
var desc = '';

var gr = new GlideRecord('sc_req_item');
if(gr.get(idnum)){
var variables = gr.variables.getElements();
var rowcount = gr.variables.firewall_changes.getRowCount();
for (var i=0;i<variables.length;i++){
var question = variables[i].getQuestion();
desc1 += question.getLabel() + ': ' + question.getDisplayValue();
}

//var desc2 = '\nNumber of DNS entries requested: ' + gr.variables.dns_request.getRowCount() + '\nEntry details:\n\n';

for(var rc=0;rc<rowcount;rc++){
var row = gr.variables.firewall_changes.getRow(rc);
desc += 'Source Hostname: ' + row.source_hostname + '\nSource Address / Subnet Mask: ' + row.source_address_subnet + '\nSource Protocol / Port: ' + row.source_protocol_port + '\nDestination Hostnames: ' + row.destination_hostnames + '\n----------------\n';
}
current.description = desc;
}
}
