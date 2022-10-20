//Populate short description and description
var shortDescription = 'New Server Build from Requested Item: ' + current.number;
var descrip = 'New Server Build requested from Requested Item: ' + current.number + '.\n\nData Center Location: ' + current.variables.datacenter_location_1.getDisplayValue();
descrip = descrip + '\nServer Role: ' + current.variables.server_role.getDisplayValue();
descrip = descrip + '\nServer Function: ' + current.variables.server_function.getDisplayValue();
descrip = descrip + '\nServer Business Justification: ' + current.variables.server_business_justification.getDisplayValue();
descrip = descrip + '\nCard Holder Data: ' + current.variables.contains_cardholder_data_cde.getDisplayValue();
descrip = descrip + '\nOperating System: ' + current.variables.operating_system.getDisplayValue();
descrip = descrip + '\nDomain: ' + current.variables.domain.getDisplayValue();
descrip = descrip + '\nSpecial Instructions: ' + current.variables.special_instructions.getDisplayValue();
var reqFor = current.request.requested_for;

//create change record
var gr = new GlideRecord('change_request');
gr.newRecord();
gr.setValue('requested_by', reqFor);
gr.setValue('short_description', shortDescription);
gr.setValue('description',descrip);
var myID = gr.number;
gr.insert();

//create link to new Change requested
var url = 'change_request.do?sys_id=' + myID;
var msg = 'New Change Request created under ' + myID + '.';
gs.addInfoMessage("<a href='" + url + "'>" + msg + "</a>");
