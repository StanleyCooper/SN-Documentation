/*

Client Controller

*/


spScUtil.orderNow($scope.data.sc_cat_item.sys_id, $scope.data.sc_cat_item.quantity, getVarData($scope.data.sc_cat_item._fields), $scope.data._generatedItemGUID, additionalParms).then(function(response) {
var a = response.data.result;

$scope.$emit("$$uiNotification", a.$$uiNotification);
$scope.$emit("$sp.sc_cat_item.submitted", a);
if (c.options.auto_redirect == 'false') {
	$rootScope.$broadcast("$sp.service_catalog.cart.submitted", true);
	spUtil.addInfoMessage($scope.m.requestSubmitted);
	return;
}
else if (!$scope._atf)
//Start Aptris RAC added a function called c.getRITM which declares two variables ritm and request. The request sys_id is passed in and then processed in the server side script. The response is received and then appended to the URL $location.serach function.
c.getRITM = function(request){
	c.data.op = 'ritm';
	c.data.request = request;

	c.server.update().then(function(response){
	//c.data.myRitm = response.ritm;

	//alert(c.data.ritm.toString());
	$location.search('id=ticket&is_new_order=true&table=sc_req_item&sys_id=' + c.data.ritm.toString());
});

};
c.getRITM(a.sys_id);
//$location.search('id=sc_request&is_new_order=true&table=sc_request&sys_id=' + a.sys_id);
//end

});
}

/*

Server Script

*/

//start Aptris RAC pass in the request ID and query for where the requested item has the request sys id and return the RITM's sys ID
if(input && input.op){
	console.log('input.op loop');
	console.log('input.request is  ' + input.request.toString());
	var ritmGr = new GlideRecord('sc_req_item');
	ritmGr.addQuery('request',input.request.toString());
	ritmGr.query();
	if(ritmGr.next()){

			data.ritm = ritmGr.sys_id.toString();
			console.log('Ritm sys id is' + ritmGr.sys_id);
		}
}
else {
	if (input)
		data.sys_id = input.sys_id;
	else if (options.sys_id)
		data.sys_id = options.sys_id;
	else
		data.sys_id = $sp.getParameter("sys_id") || $sp.getParameter('sl_sys_id');
}
//end
