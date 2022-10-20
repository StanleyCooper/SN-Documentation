/*******

HTML

*******/

<!-- BCM SERVICE CATEGORY WIDGET -->
<div class="bcm-service-categories" role="navigation" role="tablist">
	<h2>Request A Service</h2>
	<!-- NAV TABS -->
	<ul class="nav nav-tabs" id="category-tabs">
      <li role="presentation" role="tab" ng-repeat="item in c.data.categories" ng-class='{active:$first}'><a ng-click="changeTab($event)" ng-href="#{{::item.cat_code}}" id="{{::item.cat_tab}}-tab" title="{{item.description}}" aria-controls="{{::item.cat_tab}}" data-toggle="tab">{{item.title}}</a></li>
	</ul>
	<!-- TAB PANES -->
	<div class="tab-content">
		<div role="tabpanel" ng-class="{active:$first}" class="row tab-pane" id="{{::item.cat_code}}" aria-labelledby="{{::item.cat_tab}}-tab" ng-repeat="item in c.data.categories">
			<div class="col-md-12" >
				<ul class="bcm-links-list">
					<li ng-repeat="f in item.items">
						<div class="list-block">
							<span class="article-name">{{f.name}}</span>
							<span class="views">{{f.short_description}}</span>
							<a href="{{::f.url}}" class="btn bcm-cta">request</a>
						</div>
					</li>
              </ul>
          </div>
      </div>
  </div>
</div>


/*******

CSS

*******/

/* BCM SERVICE CATEGORY STYLES */
.bcm-service-categories {
	h2 {
		margin: 1em 0;
		font-family: "Montserrat", sans-serif;
		font-size: 1.7em;
		font-weight: 300;
	}
	.nav-tabs {
		border: 0;
      	& > li {
          margin-bottom: 0; // bootstrap override;
        }
		& > li > a {
		border: 0; // override bootstrap
		border-bottom: 2px solid $bcm-lightgrey;
		padding: 18px 27px;
		margin-bottom: 1px;
		background-color: #fafafa;
		color: $bcm-medgrey;
		font-size: 12px;
		text-transform: uppercase;
		&:hover {
			color: $bcm-darkgrey;
			}
		}
		& > li.active > a {
			border-bottom: 2px solid $primary;
			color: $primary;
		}
	}

	.tab-content {
		background-color: #fafafa;
		padding: 20px;
		border-top: 1px $bcm-lightgrey;
		/* LIST STYLES */
		.bcm-links-list {
		  font-family: "Montserrat", sans-serif;
		  font-size: 1em;
		  color: $bcm-darkgrey;
		  list-style: none;
		  margin: 0 0 56px 0;
		  padding: 0;
		  .list-block {
		    position: relative;
		    display: block;
		    margin-left: 2em;
		  }
		  li {
		    position: relative;
		    float: none;
		    padding: 18px 0;
		    margin: 0 !important;
		    border-bottom: 1px solid $bcm-lightgrey;
		    .article-name {
		      display: block;
		      font-weight: 500;
		      max-width: 78%;
		      @media screen and (max-width: $screen-xs-max) {
		        max-width: 71%;
		      }
		    }
		    .views {
		      display: block;
		      font-weight: 300;
		      max-width: 78%;
		      @media screen and (max-width: $screen-xs-max) {
		        max-width: 71%;
		      }
		    }
		    .btn {
		      display: block;
		    }
		    .bcm-cta {
		      position: absolute;
		      top: 50%;
		      right: 0;
		      @include translate(0, -50%);
		      transition: 100ms all ease-in-out;
		      -webkit-transition: 175ms all ease-in-out;
		      text-transform: uppercase;
		      padding: 0.4375em 0.875em;
		      border-radius: 2px;
		      color: #fff;
		      background-color: $primary;
		      &:hover {
		        text-decoration: none;
		        color: #FFF;
		        background-color: darken($primary, 20%);
		      }
		    }
		  }
		}
	}
}

/*******


Client script


*******/

function($scope) {
  /* widget controller */
  var c = this;

	$scope.changeTab = function($event){
		$event.preventDefault();
	}

}


/*******

Server script

*******/

//Aptris - RAC 7/16 Updated line 35 to order by 'order' instead of 'name'
(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */


	// populate the 'data' object
	data.categories = [];

	//Get all categories in the SP Catalog
	var sc = new GlideRecord('sc_category');
	sc.addQuery('sys_class_name', 'sc_category');
	sc.addActiveQuery();
	sc.orderBy('title');
	data.sc_catalog = $sp.getValue('sc_catalog');
	if (data.sc_catalog)
		sc.addQuery('sc_catalog', data.sc_catalog);
	
	sc.query();

	while(sc.next()) {
		var cat = {};

		cat.title = sc.title.getDisplayValue();
		cat.description = sc.description.getDisplayValue();
		cat.sys_id = sc.getUniqueValue();
		cat.cat_tab = sc.getUniqueValue();
		cat.cat_code = sc.getUniqueValue().toString();
		cat.items = [];

		//Query for catalog items within the category
		var ci = new GlideRecord('sc_cat_item');
		ci.addQuery('category', sc.sys_id);
		ci.addActiveQuery();
		//changed from name to order
		ci.orderBy("order"); //Sort order. To customize at Catalog item level, use sc.orderBy("order");
		ci.query();
		cat.count = ci.getRowCount();

		while(ci.next()) {
			var catItem = {};
			catItem.name = ci.name.getDisplayValue();
			catItem.short_description = ci.getValue('short_description');
			catItem.url = "?id=bcm_cat_item&sys_id=" + ci.getUniqueValue();
			catItem.category = ci.category.getDisplayValue();
			if($sp.canReadRecord("sc_cat_item", ci.getUniqueValue()))
				cat.items.push(catItem);
		}
		if(cat.count != 0) { //If the category has active items
			data.categories.push(cat);
		}
		//var itemsArray = JSON.stringify(cat.items);
		//gs.log("DEBUG: itemsArray " + itemsArray);
		//return items;
		//data.categories.push(cat);
	}

	//var dataArray = JSON.stringify(data.categories);
	//gs.log("DEBUG: data.categories array " + dataArray);

})();
