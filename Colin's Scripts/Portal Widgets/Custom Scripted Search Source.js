//template
<div>
  <!--<a href="?id=form&sys_id={{item.sys_id}}&table={{item.table}}" class="h4 text-primary m-b-sm block">-->
  <a href="{{item.url}}" class="h4 text-primary m-b-sm block">
    <span ng-bind-html="highlight(item.primary, data.q)"></span>
  </a>
  <!--<span class="text-muted" ng-repeat="f in item.fields">-->
  <span class="text-muted">{{item.userdescription}}</span>
</div>

//data fetch script

(function(query) {
    var results = [];
    /* Calculate your results here. */

    var gr = new GlideRecord("u_cmdb_ci_service_catalog_cards");
	//this query is what the search source searches. Query is the term entered by the user
    gr.addEncodedQuery("u_user_descriptionLIKE" + query + "^ORu_functionLIKE" + query + "^ORnameLIKE" + query + "^u_active=true");
    gr.query();
    while (gr.next()) {
        var item = {};
		//this is the url for the catalog card link
        item.url = '?id=service_catalog_cards&sys_id=' + gr.u_associated_item + '&sysparm_category=' + gr.u_service_catalog_category.split(',')[0] + '&sysparm_catcardid=' + gr.sys_id;
        item.table = 'u_cmdb_ci_service_catalog_cards';
        //primary field to be displayed
        item.primary = gr.getDisplayValue('name');
        item.sys_id = gr.sys_id.toString();
        item.userdescription = gr.u_user_description.toString();
        results.push(item);
    }


    return results;
})(query);
