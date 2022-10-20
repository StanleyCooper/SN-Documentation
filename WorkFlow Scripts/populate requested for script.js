var req = new GlideRecord('sc_request');
req.addQuery('sys_id', current.request); // find the REQ record
req.query();
// if REQ record found then set value
if (req.next()){
     req.requested_for = current.variables.u_requested_for; //change this variable
     req.update();
}
