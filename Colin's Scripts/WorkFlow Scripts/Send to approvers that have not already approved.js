// Set the variable 'answer' to a comma-separated list of user ids and/or group ids or an array of user/group ids to add as approvers.
//
// For example:
//       answer = [];
//       answer.push('id1');
//       answer.push('id2');
// Set the variable 'answer' to a comma-separated list of user ids and/or group ids or an array of user/group ids to add as approvers.
//
// For example:
//       answer = [];
//       answer.push('id1');
//       answer.push('id2');
answer = [];

var approvers = current.u_additional_approvers.split(',');

for (i = 0; i < approvers.length; i++) {

    var previousRejectorsGR = new GlideRecord('sysapproval_approver');
    previousRejectorsGR.addEncodedQuery('state=approved^document_id=' + current.sys_id +'^approver=' + approvers[i].toString());
    previousRejectorsGR.query();
    if (previousRejectorsGR.next()) {
        //answer.push(previousRejectorsGR.approver.sys_id);
    }
	else{
		answer.push(approvers[i]);
	}

}
