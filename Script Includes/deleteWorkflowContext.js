//Put into WF Run Script
var deleteWF = new global.deleteWorkflowContext();
deleteWF.deleteWFContext(current.sys_id,'Installation Applications Stakeholder Approval');


//script include
var deleteWorkflowContext = Class.create();
deleteWorkflowContext.prototype = {
	initialize: function() {

	},

	deleteWFContext :function(currentWFContext,currentWFContextName){

		gs.log(currentWFContext,'rich');

		var str = 'id=';
		str = str + currentWFContext;
		str = str + '^workflow_version.nameSTARTSWITH';
		str = str + currentWFContextName;
		var gr = new GlideRecord('wf_context');
		gr.addEncodedQuery(str);
		gr.query();
		while(gr.next()){
			gs.log('Deleted workflow context for PIA#: ' + gr.id.number + ' PIA SYS_ID ' + gr.id.sys_id + ' Workflow Name: ' + gr.workflow_version.name + ' Workflow Context SYS_ID ' + gr.sys_id,'rich');
			gr.deleteRecord();
		}
	},

	type: 'deleteWorkflowContext'
};
