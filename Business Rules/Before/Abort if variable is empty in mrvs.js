(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	var cancelUpdate;
	var variableArray = JSON.parse(current.variables.people_moving_ritm);
	for(var i=0; i < variableArray.length; i++) {
		if(!variableArray[i].moved_asset.toString()){
			cancelUpdate = true;
		}
	}

	if(cancelUpdate){
		gs.addErrorMessage('Please fill out asset information prior to closing the task');
		current.setAbortAction(true);
	}
})(current, previous);
