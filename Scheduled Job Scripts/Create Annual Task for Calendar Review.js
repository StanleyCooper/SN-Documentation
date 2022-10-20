var req = new GlideRecord('sc_request');
req.initialize();
req.setWorkflow(false);//Only create a Request
req.approval = 'approved';
req.request_state = 'in_process';
req.short_description = 'Annual review of Holiday Calendar';
req.description = 'Visit the cmn_schedule table and select the UMass Holidays Calendar to review the holdiays for the year.';
req.insert();

gs.log('The req is ' + req.sys_id, 'Rich');

var rec = new GlideRecord('sc_req_item');
rec.initialize();
rec.setWorkflow(false);//Only create a Requested Item
rec.request = req.sys_id;//Set the request
rec.short_description = 'Annual review of Holiday Calendar';
rec.description = 'Visit the cmn_schedule table and select the UMass Holidays Calendar to review the holdiays for the year.';
rec.cmdb_ci = 'ed8020854ff5ee0032fb7f75f110c7ff'; //Service-Now
rec.insert();

gs.log('The rec is ' + rec.sys_id, 'Rich');

var gr = new GlideRecord('sc_task');
gr.initialize();
gr.setWorkflow(false);//Only create a catalog task
gr.request_item = rec.sys_id;//Set the item
gr.short_description = 'Annual review of Holiday Calendar';
gr.description = 'Visit the cmn_schedule table and select the UMass Holidays Calendar to review the holdiays for the year.';
gr.assignment_group = '21c386bd1bc76b0074128480cd4bcb4a'; //ServiceNow Admins
gr.cmdb_ci = 'ed8020854ff5ee0032fb7f75f110c7ff'; //Service-Now
gr.insert();
