//Script Include

var CDWPmProjectStatusReport = Class.create();
CDWPmProjectStatusReport.prototype = {
    initialize: function() {
    },

	getObjectivesByQuery: function(projectSysId, queryString) {
        //gs.info("Into getTasksByQuery: " + projectSysId + " - " + queryString);
        var fields_array = [ gs.getMessage("Short Description"), gs.getMessage("Planned Start Date"),
                        gs.getMessage("Actual Start Date"), gs.getMessage("State"), gs.getMessage("Variance"), gs.getMessage("Planned End Date"), gs.getMessage("Percent Complete")];
        var tasks = [];
        var gr = new GlideRecord("u_objectives");
        gr.addEncodedQuery(queryString);
        gr.orderBy("u_objective_number");
        gr.query();
        //gs.info("getTasksByQuery Count: " + gr.getRowCount() + " - " + gr.getEncodedQuery());
        while(gr.next()) {
            var variance = this.getVariance(gr.getValue("start_date"), gr.getValue("work_start"));
            tasks.push({
                short_description: gr.getValue("short_description"),
                start_date: gr.getDisplayValue("start_date"),
                work_start: gr.getDisplayValue("work_start"),
                variance: variance.value,
                variance_show_icon: variance.show_icon,
                state:  gr.getDisplayValue("state"),
                end_date: gr.getDisplayValue("end_date"),
                percent_complete: gr.getDisplayValue("percent_complete"),
				objective_number: gr.getDisplayValue('u_objective_number'),
				objective_name: gr.getDisplayValue('u_objective_name'),
				kpi: gr.getDisplayValue('u_kpi')

            });
        }
        var response = {
            fields_array: fields_array,
            tasks: tasks
        };
        //gs.info("getTasksByQuery: " + (new JSON()).encode(response));
        return response;
    },



    type: 'CDWPmProjectStatusReport'
};


//HTML

<div class="panel panel-{{::c.options.color}} b panel-override">
  <div class="panel-heading">
    <div class="panel-title">Objectives</div>
  </div>
  <div class="panel-body">
	<div class="row">
	    <div class="col-md-12">
          <span class="overflow-override">
				<table class="table table-striped table-responsive" ng-if="data.objectives.tasks.length">
					<thead>
					 <tr>
					   <th><span class="text-bold">Objective Number</span></th>
           			   <th><span class="text-bold">Objective Name</span></th>
            		   <th><span class="text-bold">KPI</span></th>
            		   <th><span class="text-bold">State</span></th>
            		   <th><span class="text-bold">Percent Complete</span></th>
					 </tr>
					</thead>
					<tbody>
						<tr ng-repeat="task in data.objectives.tasks">
							<td>{{task.objective_number}}</td>
							<td>{{task.objective_name}}</td>
							<td>{{task.kpi}}</td>
             				<td>{{task.state}}</td>
							<td>{{task.percent_complete}}</td>
						</tr>
					</tbody>
				</table>
				<div class="no-data" ng-if="!data.objectives.tasks.length">
			     	No Project Objectives
			    </div>
          </span>
       </div>
    </div>
  </div>
</div>


//css
.nav-tabs li a {
	border-bottom: 3px solid transparent !important;
	background: transparent;
	border:none;
	margin-left: 20px;
	color: $gray;
	padding: 10px 15px;
	margin:0px;
	position: relative !important;
    bottom: -1px !important;
}
.nav-tabs > li > a:hover {
  border-bottom: 3px solid $gray-light !important;
  color: $gray;
  background: transparent;
  border:none;
}
.nav-tabs > li > a:active {
  border-bottom: 3px solid $brand-primary !important;
  color: $brand-primary;
  opacity : 0.5;
  background: transparent;
  border:none;
}
.nav-tabs  > li.active > a, .nav-tabs  > li.active > a:hover, .nav-tabs  > li.active > a:focus {
	color: $brand-primary;
	background-color: $list-group-bg;
	cursor:default;
	border-bottom: 3px solid $brand-primary !important;
	border:none;
	margin:0px;
	padding: 10px 15px;
}

span.overflow-override .table th a {
    color: $gray;
}

.fa {
    font-size: 18px;
}

.fa-exclamation-circle {
  color: $brand-danger;
}
.no-data {
  text-align: center;
  padding: 30px;
  font-size: 16px;
  -webkit-box-shadow: 0 1px 1px rgba($gray-base,.05);
  box-shadow: 0 1px 1px rgba($gray-base,.05);
  margin-bottom: 20px;
}
.icon-warning-circle {
  font-size: 16px;
  padding-right: 3px;
  color: $brand-danger;
}


//Server script
(function() {
    var projectId = $sp.getParameter("sysparm_sys_id");

    var statusReport = new CDWPmProjectStatusReport();
    var pendingQuery = "parent=" + projectId;
    data.objectives = statusReport.getObjectivesByQuery(projectId, pendingQuery);

})();

//Client Controller
function($scope) {
  // widget controller
  var c = this;

}
