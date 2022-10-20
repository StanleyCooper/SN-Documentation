//Client Script


function($scope, $location, $timeout, $window, $document, $rootScope, spUtil,spAriaUtil) {
    var c = this;
    $scope.hideCategoryWidgetInXS = (c.options.hide_xs == 'true');
    if (c.data.categoryId) {
        if (!$scope.hideCategoryWidgetInXS)
            $scope.hideCategoryWidgetInXS = true;
    } else {
        if ($scope.hideCategoryWidgetInXS)
            $scope.hideCategoryWidgetInXS = false;
    }

    spUtil.getPreference('glide.ui.accessibility', function(value) {
        if (value == "true")
            $scope.tabindex = 0;
        else
            $scope.tabindex = -1;
    });

    $scope.displayChildren = function($event, category) {
        $event.stopPropagation();
        category.showChildren = !category.showChildren;
        if (category.showChildren) {
            spAriaUtil.sendLiveMessage(category.title + ' '+ c.data.messages.expanded);
        }
        else {
            spAriaUtil.sendLiveMessage(category.title + ' ' +c.data.messages.collapsed);
        }
    };

    $scope.toggleSubCategories =  function(val) {
        toggleSubCategories(c.data.categoriesList, val);
    };

    function toggleSubCategories(categories, val) {
        categories.forEach(function(category) {
            category.showChildren = val;
            if (category.subcategories && category.subcategories.length > 0) {
                toggleSubCategories(category.subcategories, val);
            }
        });
    }

    $scope.loadMore =  function() {
        c.data.getMore = true;
        c.data.loadAllMsg = c.data.pleaseWait;
        c.data.categoriesCount = c.data.categoriesCount;
        c.server.update();
    };

    $scope.categorySelected = function(category) {
            $timeout(function() {
                $location.search('sys_id', category.sys_id);
                $location.search('id', c.data.page ||'req_c');
            });
    };
    var listenerForBrowseCategories = $scope.$on("$sp.service_catelog.show.categories_widget", function() {
        $scope.hideCategoryWidgetInXS = false;
    });

    $scope.hideBrowseCategory = function () {
        $scope.hideCategoryWidgetInXS = true;
        $rootScope.$broadcast("$sp.service_catelog.show.items_widget");
    };

    $scope.$on("$destroy", function() {
        listenerForBrowseCategories();
    });


	var bc = [{label:'Request Services', url: '?id=req'}];

	if ($scope.data.categoryName)
		bc[bc.length] = {label: $scope.data.categoryName, url: '#'};

	$rootScope.$broadcast('sp.update.breadcrumbs', bc);

}]]

//css

.category-widget{padding-bottom: 20px; } .panel { position: relative; <!-- padding: 0 15px 15px; --> } .fa-shopping-cart{padding-top:2px; } .topList{padding: 15px 30px; } .catDescription{font-size: 13px;white-space: normal;font-weight: normal;/*font-style:italic;*/ } .item-col{padding-left: 20px;padding-right:30px;padding-top:4px; } .panel-heading i {cursor: pointer;position: absolute;padding: 10px;top: 0px;right: 0px;cursor: pointer; } .catTitle{clear:both; } .level0{font-size: 24px;font-weight: normal;padding-top: 15px;padding-bottom: 15px;border-bottom: 1px solid grey;/* font-weight: bold;*/ } ul li ul .level0 { /*It's nested this way when there's a 'partner', so we make the line above rather than below */border-top:1px solid grey;border-bottom: 0px solid grey;margin-top: 15px; } .level1{font-size:15px;padding-top:25px;/* border-top:1px solid grey;*/font-weight: bold; } .level2{font-size: 13px;padding-top:15px;text-indent: 0px; } .level3{padding-top:5px;text-indent: 40px; } .disabled-filter {color: #A0A0A0; } a {text-decoration: underline;color: rgb(187,0,0); } .list-group-item{position: static;clear:both;border:none;padding:0;white-space: normal; } .list-group-item.ng-enter {transition: all 1s; -webkit-transition: all 1s;background-color: #c0dcfa; } .list-group-item.ng-enter-active {background-color: #fff; } .hide-x-overflow {overflow-x: hidden; } .translated-html > p {margin: 0px;padding: 0px; } IMG {max-width: 320px;max-height: 240px; } IMG.img-sm {max-height: 40px;max-width: 40px; } .filter-box {margin-top: 10px; } .panel-footer {.number-shown-label {margin-top: 0;margin-bottom: 0;font-size: 16px;display: inline-block;}a {color: inherit;} }

//options schema

{"name":"hide_xs","default_value":false,"section":"Behavior","label":"Hide at XS","type":"boolean"},{"name":"omit_badges","section":"Behavior","label":"Omit badges (may impact performance for large items in categories)","type":"boolean"},{"name":"check_can_view","default_value":"true","section":"Behavior","label":"Check canView per item","type":"boolean"},{"hint":"Choose between a flattened and a nested category structure (Nested may impact performance for large items in categories)","name":"category_layout","section":"Presentation","label":"Category Layout","type":"choice","choices":[{"label":"Flat","value":"Flat"},{"label":"Nested","value":"Nested"}]},{"displayValue":"Page","name":"page","section":"Data","label":"page","type":"reference","value":"sp_page","ed":{"reference":"sp_page"}},{"hint":"Number of categories to load on page load","name":"number_of_categories_to_load","section":"Data","default_value":"15","label":"Number of categories to load","type":"integer"}]

//server script

-<![CDATA[(function() {
	/* populate the 'data' object */
	//data categories list is the master list
	data.categoriesList = [];
	data.showMoreMsg = gs.getMessage("Show More");
	data.pleaseWait = gs.getMessage("Please wait... fetching categories");
	var cat = $sp.getParameter('sys_id');
	var categoryId = $sp.getParameter('sys_id') + "";
	var catalogID = $sp.getValue('sc_catalog') + "";
	var viewType = '';
	var checkCanView = false;
	var nestedLayout = (options.category_layout !== "Flat");
	var dynamicCategory = false;
	var catalog = new sn_sc.Catalog(catalogID);
	var msg = data.messages = {};
	msg.expanded = gs.getMessage("Expanded");
	msg.collapsed = gs.getMessage("Collapsed");

	if (!catalog.canView()) {
		return;
	}
	var baseHasParent = '';
	if (cat){
			var base = new GlideRecord('sc_category');
			base.get(categoryId.toString());
			baseHasParent = base.parent;
	}

	data.largeDataSet = gs.getProperty("glide.sc.largeSet.optimization.enable", "false");
	if (data.largeDataSet == 'true')
		nestedLayout = false;

	if (options.page) {
		var page = new GlideRecord('sp_page');
		if (page.get(options.page))
			data.page = page.id + '';
	}
	checkCanView = (options.check_can_view == 'true');

	var categoriesGr = new GlideRecord('sc_category');
	categoriesGr.addQuery("sc_catalog", catalogID);
	if (!dynamicCategory)
		categoriesGr.addQuery("sys_class_name", "sc_category");
	categoriesGr.addActiveQuery();
	categoriesGr.orderBy('order');
	categoriesGr.orderBy('title');
	//console.log('cat id: ' + cat);
	if(cat){
		categoriesGr.addQuery('sys_id', categoryId.toString());
	}
	else if (nestedLayout){
		categoriesGr.addNullQuery("parent");
	}


	categoriesGr.query();

	var loadCategories = options.number_of_categories_to_load || 15;
	if (input && input.getMore)
		loadCategories = loadCategories + parseInt(input.categoriesCount);
	var count = 0;


	//Find the topmost categories
	while (categoriesGr.next()) {
		  if(cat){
		data.categoryName = categoriesGr.title.toString();
	//console.log('cat name is: ' + data.categoryName);
	}
		var categoryJS = new sn_sc.CatCategory(categoriesGr.getUniqueValue() + '');
		//if (!categoryJS.canView())
		//	continue;

		// Check if the user can view the category (STRY0040866) -- Missed Set
		if (!$sp.canReadRecord("sc_category", categoriesGr.getUniqueValue()))
			continue;

		//Create category details object
		//console.log('beyond canView line 67');
		var categoryDetails = getCategory(categoryJS, 0, categoriesGr.getUniqueValue(), categoriesGr.parent);
		categoryDetails.sys_id = categoriesGr.getUniqueValue();

		//push to categoriesList
		data.categoriesList.push(categoryDetails);
		if (categoryDetails.totalCount > 0)
			count++;

		if(count >= loadCategories) {
			break;
		}
	}

	if (categoriesGr.hasNext())
		data.showMore = true;
	else
		data.showMore = false;

	data.categoriesCount = count;
	data.loadAllMsg = gs.getMessage("Showing {0} categories", [count + ""]);
	data.categoryId = categoryId;



	//gets the details
	function getCategory(categoryJS, level, sysID, parent) {
		var categoryDetails = {};
		var showChildren = false;
		if (!categoryJS) {
			return categoryDetails;
		}
		categoryDetails.title = categoryJS.getTitle();
		if(!cat || baseHasParent == ''){
			categoryDetails.level = level - 1;
		}
		else{
			categoryDetails.level = level;
		}

		categoryDetails.description = categoryJS.getDescription();
		categoryDetails.full_description = categoryJS.getFullDescription();
		categoryDetails.icon = categoryJS.getIconSRC();
		categoryDetails.header_icon = categoryJS.getHeaderIconSRC();
		categoryDetails.homepage_image = categoryJS.getHomepageImageSRC();
		categoryDetails.sys_id = sysID;
		categoryDetails.showChildren = (categoryDetails.sys_id === categoryId);
		categoryDetails.myTestDetail = 'my test detail 2';

		//Find items in category.  Order by cat item order, then by name
		categoryDetails.items = [];
		var itemList = new GlideRecord('sc_cat_item_category');
		itemList.addQuery('sc_category', sysID);
		itemList.addQuery('sc_cat_item.active', true);
		itemList.orderBy('sc_cat_item.order');
		itemList.orderBy('sc_cat_item.name');

		itemList.query();

		//check item details
		while(itemList.next()){

			// Check if the user can view the item (STRY0040866)
			if (!$sp.canReadRecord("sc_cat_item", itemList.sc_cat_item.sys_id.getDisplayValue()))
				continue;

			var item = {};

				item.name = itemList.sc_cat_item.name.toString();
			item.sys_id = itemList.sc_cat_item.sys_id.toString();
			//if(item.sys_id.canView()){
			categoryDetails.items.push(item);
			//console.log("item is: " + item.name + " category is: " + categoryDetails.title);
			//}

		}



		if (data.largeDataSet != 'true') {
			if (checkCanView)
				categoryDetails.count = categoryDetails.totalCount = categoryJS.getViewableItemsCount(true);
			else
				categoryDetails.count = categoryDetails.totalCount = categoryJS.getItemsCount(true);
		}
		else {
			categoryDetails.count = 1;
		}

		var subCategoryCounts = 0;
		if (nestedLayout) {
			var subcategories = categoryJS.getViewableSubCategories();

			if (subcategories.length == 0) {
				categoryDetails.subcategories = [];
			}
			else {
				categoryDetails.subcategories = [];
				subcategories.forEach(function(subCategory) {
					var subCatID = subCategory.sys_id;
					var subCategoryJS = new sn_sc.CatCategory(subCategory.sys_id + '');
					var category = getCategory(subCategoryJS, level + 1, subCatID);
					categoryDetails.totalCount = categoryDetails.totalCount + category.totalCount;
					categoryDetails.subcategories.push(category);
					categoryDetails.showChildren = categoryDetails.showChildren || category.showChildren;
				});
			}
		}
		else {
			categoryDetails.totalCount = categoryDetails.count;
		}
		return categoryDetails;
	}


})();]]

//html

<div class="panel panel-{{::options.color}} category-widget clearfix">
  <div class="panel-heading">
    <span class="request-title">Request Services</span>
  </div>
  <ul class="list-group category-list topList" role="list" aria-label="${Categories}">
    <li role="listitem"
        class="list-group-item text-overflow-ellipsis topItem"
        ng-if="category.totalCount > 0" ng-include="'category-template.html'"
        ng-repeat="category in data.categoriesList track by category.sys_id">
    </li>

  </ul>

  <div class="panel-footer text-center" ng-if="data.showMore">
    <a href="javascript:void(0)" role="button" class="text-center" ng-click="loadMore()" >{{::data.showMoreMsg}}</a>
    <div class="text-muted text-center">
      {{data.loadAllMsg}}
    </div>
  </div>
</div>

<script type="text/ng-template" id="category-template.html">
      <div
                ng-enabled="category.totalCount > 0"
          tabindex="0" class="group-item group-item-{{::options.color}}">

      <span class="block text-overflow-ellipsis category catTitle level{{::category.level}}"
          sn-focus="category.sys_id == data.categoryId"
          ng-class=""
          title="{{::category.title}}">
          {{::category.title}}

        <div class="catDescription">{{::category.description}}</div>
  		</span>

    </div>
    <div class="col-sm-6 col-lg-6 item-col" ng-repeat="item in category.items"><a href="?id=req_it&sys_id={{::item.sys_id}}">

          {{::item.name}}</a></div>
      <ul class="list-group sub-category-list list-bg-{{::options.color}}" role="list" aria-label="{{category.title}} ${subcategories}" ng-class="{true: 'no-indent', false: ''}[category.level > 2]">
      <li role="listitem"
              class="list-group-item text-overflow-ellipsis"
          ng-include="'category-template.html'"
          ng-repeat="category in category.subcategories track by category.sys_id"
          ng-if="category.totalCount > 0">

      </li>
      </ul>
</script>
