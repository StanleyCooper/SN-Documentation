/****************

when to run - before (insert)

condition

current.file_name =='HMS_Shield.gifx'


*******************/

(function executeRule(current, previous /*null when async*/) {

	// Add your code here
	current.setAbortAction(true);
	gs.log(current.file_name + ' insert aborted');

})(current, previous);
