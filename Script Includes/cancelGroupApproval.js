//WF Run Script
var cancelApproval = new global.cancelApproval();
cancelApproval.cancelApproval(current.sys_id);

//Script Include
var cancelApproval = Class.create();
cancelApproval.prototype = {
	initialize: function() {
	},

	cancelApproval: function(approvalSysId){

		var gr = new GlideRecord("sysapproval_group");
		gr.addQuery("parent", approvalSysId);
		gr.query();
		while (gr.next()) {
			gr.approval = 'not requested';
			gr.update();
		}


		var app=new GlideRecord('sysapproval_approver');
		app.addQuery('sysapproval',approvalSysId);
		app.query();
		while(app.next()){
			app.state ='not requested';
			//app.autoSysFields(false);
			//app.setWorkflow(false);
			app.update();
		}
	},

	type: 'cancelApproval'
};
