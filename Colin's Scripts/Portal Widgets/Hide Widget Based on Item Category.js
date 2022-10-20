//Server script
//Begin Aptris RAC 3/8
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
data.libCatItem = libItem;
//end


//Client Controller
//Start Aptris RAC 3/8
c.data.libCatItem = $scope.data.libCatItem;
//End



//HTML
<div ng-if="c.data.libCatItem">
</div>
