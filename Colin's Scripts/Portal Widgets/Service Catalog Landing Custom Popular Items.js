//html

<div ng-if='data.loggedIn'>
  <h3><p>Service Catalog</p></h3>
<p></p>
<p>Please expand the request categories on the left, or type keywords in the search bar above, to request the services you need.</p>
<p>Don&rsquo;t find what you&rsquo;re looking for? <a title="Please contact the Service Desk for assistance." href="/stat?id=sc_cat_item&amp;sys_id=c6fcca5e1b4d0c100d1133f8cd4bcb8f">Please contact the Service Desk for assistance.</a></p>
</div>

<div ng-if='!data.loggedIn'>
  <h3><p>Service Catalog</p></h3>
<p></p>
<p>To request something, please click the Login button in the upper right corner of the screen.</p>
<p>Don&rsquo;t find what you&rsquo;re looking for? <a title="Please contact the Service Desk for assistance." href="/stat?id=sc_cat_item&amp;sys_id=c6fcca5e1b4d0c100d1133f8cd4bcb8f">Please contact the Service Desk for assistance.</a></p>
</div>

<h3>
  Top Requests
</h3>

<div class="col-sm-6 col-md-4" ng-repeat="item in c.data.items | orderBy: 'name'">
<div class="panel panel-{{::options.color}} b">
  <!--<a target="{{::item.target}}" ng-href="{{::getItemHREF(item)}}" ng-click="onClick($event, item)" class="panel-body block card-padding" sn-focus="{{::item.highlight}}">-->
  <a target="{{::item.target}}" ng-href="{{item.url}}" ng-click="onClick($event, item)" class="panel-body block card-padding" sn-focus="{{::item.highlight}}">
  <a ng-href="{{item.url}}" ng-click="onClick($event, item)" class="panel-body block" sn-focus="{{::item.highlight}}">
    <div class="overflow-100">
      <!--<h2 class="h4 m-t-none m-b-xs text-overflow-ellipsis" title="{{::item.name}}" style="padding-bottom:1px">{{::item.name}}<span ng-if="item.content_type == 'external'" aria-label="${External Link}"> ➚</span></h2>-->
      <h4 class="card-text m-t-none m-b-xs" title="{{::item.name}}" style="padding-bottom:1px">{{::item.name}}<span ng-if="item.content_type == 'external'" aria-label="${External Link}"> ➚</span></h4>
      <img ng-src="{{::item.picture}}?t=small" ng-if="item.picture" alt="{{::item.name}}" class="m-r-sm m-b-sm item-image pull-left" />
      <div class="text-muted item-short-desc break-word">{{::item.short_description}}</div>
    </div>
  </a>
  <div aria-hidden="true" class="panel-footer">
    <a aria-hidden="true" ng-if="item.sys_class_name != 'sc_cat_item_content' || item.content_type == 'kb' || item.content_type == 'literal'" ng-click="onClick($event, item)" ng-href="{{getItemHREF(item)}}" class="pull-left text-muted" tabindex="-1">${View Details}</a>
    <a aria-hidden="true" ng-if="item.sys_class_name == 'sc_cat_item_content' && item.content_type == 'external'" ng-click="onClick($event, item)" ng-href="{{getItemHREF(item)}}" target="_blank" class="pull-left text-muted" tabindex="-1">${View Details}</a>
    <span ng-if="data.showPrices && item.hasPrice" class="pull-right item-price font-bold">{{::item.price}}</span> &nbsp;
  </div>
</div>
</div>

//css

.toggle {
  color: $dropdown-link-disabled-color;
  i:not(.active):hover {
	  color: $list-group-link-heading-color;
  }
}

.fa.active {
  color: $primary;
}

.item-table {
  background-color: #fff;
   tr {
     th {
       padding: 16px 10px;
     }
     td {
       padding: 16px 10px;
       border: none;
     }
   }
}

.btn-loadmore {
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: 20px;
}

.card-text{
    font-size: 16px !important;
  font-weight: normal;
}

.card-padding{
  padding-top: 0px;
}

//client

function() {
  /* widget controller */
  var c = this;
}


//server

(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
	data.loggedIn = gs.isLoggedIn();

	data.items = getPopularItems();

	function getPopularItems(){

		var items = [];
	//build array of top requests
	var topRequestsGR = new GlideRecord('u_cmdb_ci_service_catalog_cards');
	topRequestsGR.addEncodedQuery('u_top_request_orderISNOTEMPTY');
	topRequestsGR.orderBy('u_top_request_order');
	topRequestsGR.query();
	while(topRequestsGR.next()){

		var item = {};

		item.name = topRequestsGR.name.toString();
		item.short_description = topRequestsGR.u_user_description.toString();
		item.url = '/stat?id=service_catalog_cards&sys_id=' + topRequestsGR.u_associated_item.sys_id.toString() + '&sysparm_category=' + topRequestsGR.u_service_catalog_category.split(',')[0].toString() + '&sysparm_catcardid=' + topRequestsGR.sys_id.toString();
		item.sys_id = topRequestsGR.sys_id;
		items.push(item);

		}

		return items;

	}


 })();
