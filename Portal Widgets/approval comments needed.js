HTML Template
<div class="panel panel-primary b">
  <!-- panel-{{::c.options.color}} -->
  <div class="panel-heading">
    <h4 class="panel-title" ng-if="c.data.state == 'requested'">${This {{c.data.label}} requires your approval}</h4>
    <h4 class="panel-title" ng-if="c.data.state == 'approved'">${Approved} <sn-time-ago timestamp="::c.data.sys_updated_on" /></h4>
    <h4 class="panel-title" ng-if="c.data.state == 'rejected'">${Rejected} <sn-time-ago timestamp="::c.data.sys_updated_on" /></h4>
  </div>
  <div class="panel-body">
    <form ng-submit="$event.preventDefault()" class="form-horizontal">
      <div ng-if="c.data.fields.length > 0">
        <div ng-repeat="field in c.data.fields" class="m-b-xs" ng-if="field.value">
          <label class="m-n">{{field.label}}</label>
          <span ng-switch="field.type">
            <div ng-switch-when="glide_date_time" title="{{field.display_value}}"><sn-time-ago timestamp="::field.value" /></div>
            <div ng-switch-default >{{field.display_value}}</div>
          </span>
        </div>
      </div>
      <div ng-if="c.data.state == 'requested'" class="question">
        <button type="button" name="approve" class="btn btn-success btn-question" ng-click="c.action('approved')">${Approve}</button>
        <div class="spacer"></div>
        <button type="button" name="reject" class="btn btn-default btn-question" ng-click="c.action('rejected')">${Reject}</button>
        </div>

    </form>
  </div>
</div>










CSS
.question {
  text-align: center;
  margin-top: 1em;
}

.spacer {
  display:inline-block;
  width:5%;
}

.btn-question {
	width: 46%;
}






























Client Script
function ($scope, spUIActionsExecuter, spUtil, spModal) {
	var c = this;

	var ESIGNATURE = {
		"approved": "cbfe291147220100ba13a5554ee4904d",
		"rejected": "580f711147220100ba13a5554ee4904b"
	};

	spUtil.recordWatch($scope, "sysapproval_approver", "state=requested^sys_id="+ c.data.sys_id);

	c.action = function(state) {
		if(c.data.esignature.e_sig_required) {
			var requestParams = {
				username: c.data.esignature.username,
				userSysId: c.data.esignature.userSysId
			};
			spUIActionsExecuter.executeFormAction(ESIGNATURE[state], "sysapproval_approver" , c.data.sys_id, [] , "", requestParams).then(function(response) {
			});
		} else {
			if (state == "rejected") {
				var newComments;
				spModal.open({
		title: 'Give me a name',
		label: 'Please type name here...',
		input: true,
		value: newComments
	}/*"Provide a Reason for Rejecting this Approval"*/).then(function(newComments) {
					c.data.comments = newComments;
					c.data.op = state;
					c.server.update().then(function() {
						if (!c.data.updateID) // update failed
							spUtil.addErrorMessage(c.data.actionPreventedMsg);
						else
							c.data.state = state;
					});
				});
			}
			else
			{
				c.data.op = state;
				c.server.update().then(function() {
					if (!c.data.updateID) // update failed
						spUtil.addErrorMessage(c.data.actionPreventedMsg);
					else
						c.data.state = state;
				});
			}
		}
	}
}

































Server Script
(function() {
	data.actionPreventedMsg = gs.getMessage("Update failed");
	var gr = $sp.getRecord();
	if (gr == null || !gr.isValid()) {
		data.isValid = false;
		return;
	}

	data.isValid = true;
	data.isMine = isApprovalMine(gr);

	var approverDisplay = gr.approver.getDisplayValue();
	if (!data.isMine && approverDisplay)
		data.approverDisplay = approverDisplay;

	if (approverDisplay) {
		data.approvedMsg = gs.getMessage("Approved by {0}", approverDisplay);
		data.rejectedMsg = gs.getMessage("Rejected by {0}", approverDisplay);
	} else {
		data.approvedMsg = gs.getMessage("Approved");
		data.rejectedMsg = gs.getMessage("Rejected");
	}
	if (input && input.op && data.isMine) {
		gr.state = input.op;
		if (gr.state == "rejected") {
			gr.comments = "Requested Item rejected by "+gs.getUserDisplayName()+" via Service Portal \nRejected with comments: "+ input.comments; //Custom code (DFCT0010123)
		}
		data.updateID = gr.update();
		if (GlideStringUtil.nil(data.updateID)) {
			// update failed so fetch again for correct values
			gr = $sp.getRecord();
		}
		data.op = "";
	}

	var fields = $sp.getFields(gr, 'state,sys_created_on');

	if (gr.sys_mod_count > 0)
		fields.push($sp.getField(gr, 'sys_updated_on'));

	data.fields = fields;
	data.state = gr.state.toString();
	data.sys_updated_on = gr.sys_updated_on.toString();
	data.sys_id = gr.getUniqueValue();
	data.table = gr.getTableName();
	data.label = getRecordBeingApproved(gr).getLabel();
	data.esignature = {
		username:  gs.getUserName(),
		userSysId: gs.getUserID(),
		e_sig_required: checkESig(gr)
	};
	function checkESig(approvalGR) {
		var esigRegistryGR = new GlideRecord("e_signature_registry");
		if (!esigRegistryGR.isValid())
			return false;

		var table = approvalGR.getValue("source_table");
		if (!table)
			table = approvalGR.sysapproval.sys_class_name;
		if (!table)
			return false;

		esigRegistryGR.addQuery("enabled", "true");
		esigRegistryGR.addQuery("table_name", table);
		esigRegistryGR.query();
		return esigRegistryGR.hasNext();
	}

	function getRecordBeingApproved(gr) {
		if (!gr.sysapproval.nil())
			return gr.sysapproval.getRefRecord();

		return gr.document_id.getRefRecord();
	}
})();
