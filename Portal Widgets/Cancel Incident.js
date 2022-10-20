///////////////////////////
//
//
//    HTML
//
//
////////////////////////////

<div class="panel b" ng-if="data.showWidget">
 <div class="panel-heading bg-primary">Actions</div>
 <div class="panel-body">
   <button type="button" class="btn btn-info btn-block" ng-click="c.openModalResolve()" ng-if="data.showResolve">Cancel</button>
   <div ng-if="data.response1" class="alert alert-info">{{::data.response1}}</div>
 </div>
</div>

<script type="text/ng-template" id="modalTemplateResolve">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h4 class="panel-title">Provide a reason for canceling this incident</h4>
  		</div>
      <div class="panel-body wrapper-xl">
      <form name="modalTemplateResolve" ng-submit="c.uiAction('cancel')">
        <div class="form-group">
          <textarea required sp-autosize="true" ng-required="true" ng-model="data.resolveComments" id="resolveComments" placeholder="Comments required" class="form-control ng-pristine ng-valid ng-scope ng-empty ng-touched" aria-invalid="false" style="overflow: hidden; word-wrap: break-word; resize: horizontal;"></textarea>
        </div>
        <input class="btn btn-primary" type="submit" />
      </form>
    </div>
  </div>
</script>

///////////////////////////
//
//
//    Server
//
//
////////////////////////////

(function() {

 // Get table & sys_id
 data.table = input.table || $sp.getParameter("table");
 data.sys_id = input.sys_id || $sp.getParameter("sys_id");

 // Valid GlideRecord
 gr = new GlideRecord(data.table);
 if (!gr.isValid())
   return;

 // Valid sys_id
 if (!gr.get(data.sys_id))
   return;

  //Button Visibility
  if(data.table == 'incident' && gr.active == true && gr.incident_state != 8 && gr.caller_id == gs.getUserID()){
    data.showWidget = true;
    data.showResolve = true;
  }
  else {
    data.showWidget = false;
    data.showResolve = false;
  }

 //input
 if (input && input.action) {
   var action = input.action;

   //Incident table
   if (data.table == 'incident') {
     if (action == 'cancel' && input.resolveComments !='') {
       gr.setValue('incident_state', 8);
       gr.setValue('state', 8);
       gr.setValue('resolved_by', gs.getUserID());
       gr.setValue('close_notes',"Closed by caller with comment: "+ input.resolveComments);
       gr.update();
       //data.response1 = gs.getMessage('Incident '+gr.number+' was resolved');
     }
   }
 }
})();


///////////////////////////
//
//
//    Client
//
//
////////////////////////////


function($uibModal, $scope, spUtil) {
	var c = this;

	$scope.$on('record.updated', function(name, data) {
		c.data.resolveComments = '';
		spUtil.update($scope);
	})

	c.uiAction = function(action) {
		c.data.action = action;
		c.server.update().then(function() {
			c.data.action = undefined;
		})
		c.modalInstance.close();
	}
	c.openModalResolve = function() {
		c.modalInstance = $uibModal.open({
			templateUrl: 'modalTemplateResolve',
			scope: $scope
		});
	}

	c.closeModal = function() {
		c.modalInstance.close();
	}
}
