//Server script - place where data.variables are being declared
//begin Aptris 3/11/19
var libItem = '';
var libURL = $sp.getParameter("sys_id");
console.log(libURL);
var libCatGR = new GlideRecord('sc_cat_item');
libCatGR.addEncodedQuery('sys_id='+ libURL);
libCatGR.query();
while(libCatGR.next()){
  if(libCatGR.category.title == 'Library Support Services'){
    console.log('Library Item');
    libItem = 'true';
  }
}
data.libcat = libItem;
//end

//Client script placed in onsubmit function

$scope.triggerOnSubmit = function(){

  //begin Aptris 3/6/19 Alert to user about submission
  var libcat = c.data.libcat;
  if(libcat){
    alert('Your request has been received by Library Support Services.');
  }
  //end

  $scope.data.sc_cat_item.item_action = "order";
  $scope.data.sc_cat_item.quantity = c.quantity;
  if (g_form)
    g_form.submit();
}
