
<client_script><![CDATA[function($scope) {
    var c = this;

    //get requested for variable
    $scope.$watch(function() {
        return $scope.page.g_form.getValue('who_is_this_sar_request_for');
    }, function(value) {
        c.data.message = value;
        c.server.update();
    })


}]]></client_script>




<script><![CDATA[(function() {

    var requestedFor = input.message;

    data.sarRequests = getSarRequest();
	console.log(data.sarRequests);

    function getSarRequest() {

		var sar = [];

        var userGR = new GlideRecord('u_sar_assignments');
        userGR.addEncodedQuery('u_sar_person=' + requestedFor);
        userGR.query();
        while (userGR.next()) {

			var sarRec = {};
			sarRec.action = userGR.u_action.getDisplayValue().toString();
			sarRec.profile = userGR.u_sar_profile.getDisplayValue().toString();
			sar.push(sarRec);

        }

		return sar;

    }

})();]]></script>


<template><![CDATA[ <div ng-if="c.data.sarRequests.length > 0">
   <h1>SAR User Data</h1>
   <table style="width:100%">
  <tr>
    <th>SAR Profile</th>
    <th>Action</th>
  </tr>
  <tr ng-repeat="sar in c.data.sarRequests">
    <td>{{::sar.profile}}</td>
    <td>{{::sar.action}}</td>
  </tr>
</table>
</div>

]]></template>
