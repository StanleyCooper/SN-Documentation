var cTaskGR = new GlideRecord('change_task');
cTaskGR.addEncodedQuery('state!=3^ORstate=^change_request=' + current.sys_id);
cTaskGR.query();
while(cTaskGR.next()){
	cTaskGR.state = 2; //In Progress
	cTaskGR.update();
}
gs.addInfoMessage('Associated Change Tasks for ' + current.number + ' have been set to In Progress');
