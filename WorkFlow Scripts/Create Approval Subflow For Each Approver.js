var gr = new GlideRecord('ast_contract');
gr.get('c3c64169db931810e0037a43e2961956');

var approvers = gr.u_additional_approvers.split(',');

gs.log(approvers)

var i;
for (i = 0; i < approvers.length; i++) {
    //Declare an instance  of workflow.js
    var wf = new Workflow(); //Get the workflow id
    var wfId = wf.getWorkflowFromName("CDW - Contract Approval Subflow");

    var variableArr = {};
    variableArr.u_approval_user= approvers[i];

    wf.startFlow(wfId, gr, "CDW - Contract Approval Subflow", variableArr);
}
