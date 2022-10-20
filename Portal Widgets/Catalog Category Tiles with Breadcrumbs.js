//HTML


<div ng-if='!data.displayTitle'>
	<h2 class="font-thin m-t-none">Service Catalog Categories</h2>
</div>
<br>
<div ng-if='data.displayTitle'>
	<h2 class="font-thin m-t-none">{{::data.title}}</h2>
</div>
<div class="row" >
  <div class="col-sm-6 col-md-4 " ng-repeat="item in data.items | orderBy: 'name' | limitTo: data.limit">

    <div class="panel panel-default">
      <a href="{{::item.url}}" class="panel-body block" onclick='window.GlideWebAnalytics.trackEvent("Service Catalog", "Popular Items", "Item Clicked");'>
        <div class="overflow-100">
          <h2 class="h4 m-t-none m-b-xs text-overflow-ellipsis" title="{{::item.name}}">{{::item.name}}</h2>
          <img ng-src="{{::item.picture}}" ng-if="::item.picture" class="m-r-sm m-b-sm item-image pull-left" alt="{{::item.name}}" role="presentation" />
          <div class="text-muted item-short-desc" aria-hidden="{{::item.name !== null}}" role="presentation">{{::item.short_description}}</div>
        </div>
      </a>
      <div class="panel-footer">
        <a href="{{item.url}}" class="pull-left text-muted" tabindex="-1" onclick='window.GlideWebAnalytics.trackEvent("Service Catalog", "Popular Items", "Item Clicked");'>${View Details}</a> <span ng-if="data.showPrices && item.hasPrice" class="pull-right item-price font-bold">{{::item.price}}</span> &nbsp;
      </div>
    </div>

  </div>
</div>


//css
.col-md-4 {
    width: 25%;
}


//client

api.controller=function($scope, $timeout, $rootScope) {
  /* widget controller */
  var c = this;

		// Breadcrumbs

	var bc = [{label:'Service Catalog', url: '?id=tb_sc_category'}]; //this is the first thing after home

	if($scope.data.urlSysId !== null){

		for (var i = 0; i < $scope.data.categories.length; i++) {

			bc[bc.length] = {label: $scope.data.categories[i].label, url: $scope.data.categories[i].url};

		}
	}

	$timeout(function() {
	$scope.$emit('sp.update.breadcrumbs', bc);
	});

};



//server script

data.showPrices = $sp.showCatalogPrices();
data.limit = 1000;
var items = [];

//var allowedItems = $sp.getAllowedItems();
var topItemGR = new GlideRecord('sc_category');

data.displayTitle = false;

var urlSysId = $sp.getParameter('sys_id');
data.urlSysId = urlSysId;

if ($sp.getParameter('sys_id') !== null) {

    topItemGR.addEncodedQuery('parent=' + $sp.getParameter('sys_id') + '^active=true^sc_catalog=e0d08b13c3330100c8b837659bba8fb4');
    data.displayTitle = true;
    var catTitleGR = new GlideRecord('sc_category');
    catTitleGR.get($sp.getParameter('sys_id').toString());
    data.title = catTitleGR.getDisplayValue();

    var itemsExist = false;
    var itemsExistGR = new GlideRecord('sc_cat_item');
    itemsExistGR.addEncodedQuery('active=true^category=' + $sp.getParameter('sys_id').toString());
    itemsExistGR.query();
    while (itemsExistGR.next()) {
        itemsExist = true;
        var item = {};
        item.name = itemsExistGR.getDisplayValue();
        item.short_description = itemsExistGR.short_description.getDisplayValue();
        item.picture = itemsExistGR.picture.getDisplayValue();
        // item.price = topItemGR.price.getDisplayValue();
        // item.hasPrice = topItemGR.cat_item.price != 0;
        item.sys_id = itemsExistGR.sys_id.getDisplayValue();
				item.url = '?id=sc_cat_item&sys_id=' + itemsExistGR.sys_id.getDisplayValue();
        items.push(item);
    }

		//breadcrumbs
		data.categories = [];
		var catID = urlSysId;

		var category = {
			label: catTitleGR.title.toString(),
			url: '?id=tb_sc_category&sys_id=' + catTitleGR.sys_id.toString()
		}

		data.categories.unshift(category);



		while(isParent(catID)){
			category = getParent(catID);
			data.categories.unshift(category);
			catID = category.parentSysId;
		}



} else {
    topItemGR.addEncodedQuery('parent=NULL^active=true^sc_catalog=e0d08b13c3330100c8b837659bba8fb4');
}

if (!itemsExist) {
    topItemGR.orderBy('title');
    topItemGR.query();
    while (topItemGR.next() && items.length < data.limit) {

        var item = {};
        item.name = topItemGR.title.getDisplayValue();
        item.short_description = topItemGR.description.getDisplayValue();
        item.picture = topItemGR.homepage_image.getDisplayValue();
        // item.price = topItemGR.price.getDisplayValue();
        // item.hasPrice = topItemGR.cat_item.price != 0;
        item.sys_id = topItemGR.sys_id.getDisplayValue();
				item.url = '?id=tb_sc_category&sys_id=' + topItemGR.sys_id.getDisplayValue();
        items.push(item);
    }
}

data.items = items;


function getParent(catID){
	var catGR = new GlideRecord('sc_category');
	catGR.get(catID);
	var parent = {
		label: catGR.parent.title.toString(),
		url: '?id=tb_sc_category&sys_id=' + catGR.parent.sys_id.toString(),
		parentSysId: catGR.parent.sys_id.toString()
	};
	return parent;
}


function isParent(catID){
	var parGR = new GlideRecord('sc_category');
	parGR.get(catID);
	if(parGR.parent != ''){
		return true;
	}
	else{
		return false;
	}
}
