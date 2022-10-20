/**************

HTML

**************/

<!---- Make the first three collapsable into headers instead --->
<div ng-if="data.service" class="panel panel-{{options.color}} b">
<div class="panel-heading">
   <h3 class="panel-title">{{::data.serviceName}}</h3>
</div>
<div class='panel-body'>
<div id="accordion" role="tablist" aria-multiselectable="true">
   <div ng-if='data.serviceFunction'>
      <div class="card">
         <h5 class="card-header" role="tab" id="headingOne">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="d-block">
            <i class="fa fa-chevron-down pull-right"></i>What does it do?
            </a>
         </h5>
         <div id="collapseOne" role="tabpanel" aria-labelledby="headingOne">
            <div class="card-body">
               <div ng-bind-html='data.serviceFunction'>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div ng-if='data.serviceEligibility'>
      <div class="card">
         <h5 class="card-header" role="tab" id="headingTwo">
            <a class="collapsed d-block" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <i class="fa fa-chevron-down pull-right"></i> Who is eligible?
            </a>
         </h5>
         <div id="collapseTwo" role="tabpanel" aria-labelledby="headingTwo">
            <div class="card-body">
               <div ng-bind-html='data.serviceEligibility'>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div ng-if='data.serviceFulfillment'>
      <div class="card">
         <h5 class="card-header" role="tab" id="headingThree">
            <a class="collapsed d-block" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <i class="fa fa-chevron-down pull-right"></i> How do I get it?
            </a>
         </h5>
         <div id="collapseThree" role="tabpanel" aria-labelledby="headingThree">
            <div class="card-body">
               <div ng-bind-html='data.serviceFulfillment'>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div ng-if='data.serviceCost'>
      <div class="card">
         <h5 class="card-header" role="tab" id="headingFour">
            <a class="collapsed d-block" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            <i class="fa fa-chevron-down pull-right"></i> What does this cost?
            </a>
         </h5>
         <div id="collapseFour" class="collapse" role="tabpanel" aria-labelledby="headingFour">
            <div class="card-body">
               <div ng-bind-html='data.serviceCost'>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div ng-if='data.serviceSupport'>
      <div class="card">
         <h5 class="card-header" role="tab" id="headingFive">
            <a class="collapsed d-block" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            <i class="fa fa-chevron-down pull-right"></i> Support
            </a>
         </h5>
         <div id="collapseFive" class="collapse" role="tabpanel" aria-labelledby="headingFive">
            <div class="card-body">
               <div ng-bind-html='data.serviceSupport'>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div ng-if='data.serviceLearnMore'>
      <div class="card">
         <h5 class="card-header" role="tab" id="headingSix">
            <a class="collapsed d-block" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
            <i class="fa fa-chevron-down pull-right"></i> Learn More
            </a>
         </h5>
         <div id="collapseSix" class="collapse" role="tabpanel" aria-labelledby="headingSix">
            <div class="card-body">
               <div ng-bind-html='data.serviceLearnMore'>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<br>
<div class='btn-group'>
   <!---- make this a button! left --->
   <a ng-if="data.serviceFulfillmentLink != false" ng-href="{{data.serviceFulfillmentLink}}" class="btn btn-primary">Get this service</a>
   <a ng-href="{{data.serviceLearnMoreLink}}" class="btn btn-default">Learn more</a>
</div>
<div>
   <a href='/stat?id=sc_cat_item&sys_id=ed852b726f486a00989e2fa0be3ee4ea' class='btn btn-default right-button'>
   Don't see what you're looking for?</a>
</div>


/**************

CSS

***************/

.bs-callout {
  margin: 10px 0 !important;
  padding: 20px !important;
  border-left-style: solid;
  border-left-width: 10px;
}

.bs-callout-outage {
  background-color: $service-outage-color;
  border-color: $service-outage-border-color;
}

.bs-callout-degradation {
  background-color: $service-degredation-color;
  border-color: $service-degredation-border-color;
}

.bs-callout-planned {
  background-color: $planned-maintenance-color;
  border-color: $planned-maintenance-border-color;
}

.bs-callout-success {
  background-color: $no-issue-color;
  border-color: $no-issue-border-color;
}

.tooltip-inner {
    width: 150px;
}

.panel-body{
  padding: 15px 55px;
}

.panel-title{
  padding: 0 40px;
}
.btn-group{
  float: left;
}

.btn{
  margin-bottom: 10px;
}

 @media screen and (min-width: 992px) {
  .right-button {
    float: right;
  }
}

/************

Client Script

*************/

function ($scope, spUtil) {
  function get() {
    spUtil.update($scope);
  }
}


/***********

Server Script

************/

var itemSysID = $sp.getParameter('sys_id').toString();
var itemCategory = $sp.getParameter('sysparm_category').toString();

var svcCard = new GlideRecord('u_cmdb_ci_service_catalog_cards');
svcCard.addEncodedQuery('u_service_catalog_category=' + itemCategory + '^u_associated_item='+ itemSysID);
svcCard.query();
if(svcCard.next()){
	data.service = svcCard.sys_id;
	data.serviceName = svcCard.getDisplayValue();
	data.serviceFunction = svcCard.u_function.toString();
	data.serviceEligibility = svcCard.u_eligibility.toString();
	data.serviceFulfillment = svcCard.u_fulfillment.toString();
	data.serviceCost = svcCard.u_cost.toString();
	data.serviceSupport = svcCard.u_support.toString();
	data.serviceLearnMore = svcCard.u_learn_more.toString();
	data.serviceLearnMoreLink = svcCard.u_learn_more_link.toString();
}

var scCatGR = new GlideRecord('sc_cat_item_content');
scCatGR.get(itemSysID);
if(scCatGR.sys_class_name.toString() =='sc_cat_item_content'){

	if(scCatGR.content_type =='external'){
		data.serviceFulfillmentLink = scCatGR.url.toString();
	}
	else if(scCatGR.content_type == 'kb'){
		data.serviceFulfillmentLink = '/stat?id=kb_article&sys_id=' + scCatGR.kb_article.toString();
	}
	else{
		data.serviceFulfillmentLink = false;
	}

}
else{
	data.serviceFulfillmentLink = '/stat?id=sc_cat_item&sys_id=' + itemSysID + '&sysparm_category=' + itemCategory;
}
