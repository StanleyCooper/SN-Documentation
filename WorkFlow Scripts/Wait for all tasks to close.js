checkCatalogTasks();
​
function checkCatalogTasks() {
    var grTask = new GlideRecord('sc_task');
    grTask.addQuery('request_item', current.sys_id);
    grTask.addQuery('active', true);
    grTask.query();
    if(grTask.hasNext()){
        answer = false;
    }
    else{
        answer = true;
    }
}
