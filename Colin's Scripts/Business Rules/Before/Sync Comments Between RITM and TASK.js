//Name: push comments to ritm
//Table: Catalog Task
//When: Before
//Insert: false
//Update:true
(function executeRule(current, previous /*null when async*/) {
    try{
        var sc_req_item = new GlideRecord('sc_req_item');
        if(sc_req_item.get(current.request_item)){
            sc_req_item.comments = current.comments;
            sc_req_item.setUseEngines(false);
            // Tells the system not to run anything
            // with "engine" in the name from this list.
            // https://is.gd/gsNiQZ
            sc_req_item.update();
            var email = {};
            email.sys_id = sc_req_item.u_requested_for.sys_id;
            email.name = sc_req_item.u_requested_for.getDisplayValue();
            gs.eventQueue("custom.catalog.ritm.commented",
                          sc_req_item,
                          email.sys_id,
                          email.name);
        }
    } catch (error) {
        var log = 'Push comments to ritm';
        gs.log('Error: ' + error, log);
    }
})(current, previous);


//Name: push comments to tasks
//Table: Request Item
//When: Before
//Insert: false
//Update:true
(function executeRule(current, previous /*null when async*/) {
    try{
        var sc_task = new GlideRecord('sc_task');
        sc_task.addQuery('request_item', current.sys_id);
        sc_task.addQuery('active','true');
        sc_task.query();
        while(sc_task.next()){
            sc_task.comments = current.comments;
            sc_task.setUseEngines(false);
            // Tells the system not to run anything
            // with "engine" in the name from this list.
            // https://is.gd/gsNiQZ
            sc_task.update();
            var email = {};
            if(sc_task.assigned_to){
                email.sys_id = sc_task.getValue('assigned_to');
                email.name = sc_task.assigned_to.getDisplayValue();
            } else {
                email.sys_id = sc_task.getValue('assignment_group');
                email.name = sc_task.assignment_group.getDisplayValue();
            }
            gs.eventQueue("custom.catalog.ritm.commented",
                          sc_task,
                          email.sys_id,
                          email.name);
        }
    } catch (error) {
        var log = 'Push comments to tasks';
        gs.log('Error: ' + error, log);
    }
})(current, previous);
