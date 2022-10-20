// HTML
<div class="panel panel-default b" ng-if="c.always_show || c.data.items.length">
 <!-- HEADER -->
  <div class="panel-heading">
    <h2 class="h4 panel-title">${My Tickets}</h2>
    <aside>
      <input type="text" ng-model="search" placeholder="Filter..">
    	<i class="fa fa-search"></i>
    </aside>
  </div>
 <!-- FILTER AND SORT -->
  <div class="sorters clearfix">
    <select class="form-control pull-left" ng-model="typeFilter" ng-options="typename as typename.state for typename in c.data.items | unique: 'state'">
      <option value="">View All Tickets</option>
    </select>
    <a class="pull-right" ng-click="sortBy('sys_updated_on.value')" href="javascript:void()">Updated <i class="fa" ng-show="propertyName === 'sys_updated_on.value'" ng-class="reverse ? 'fa-caret-up' : 'fa-caret-down'"></i></a>
    <a class="pull-right" ng-click="sortBy('state')" href="javascript:void()">State <i class="fa" ng-show="propertyName === 'state'" ng-class="reverse ? 'fa-caret-up' : 'fa-caret-down'"></i></a>
  </div>
  <!-- ALL TICKETS -->
  <section class="panel-body">
    <div dir-paginate="item in c.data.items | filter : {state: typeFilter.state} : true | filter: search | orderBy : propertyName : reverse | itemsPerPage: options.items_per_page" pagination-id="activity" ng-class="{'last':$last}">
      <!-- requests -->
      <div ng-if="item.type == 'request'" class="ticket">
        <aside class="item-header">
          <span class="fa fa-stack fa-req"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-briefcase fa-stack-1x fa-inverse"></i> </span>
          <span ng-if="!item.multi_item_request">{{item.children[0].number}}</span>
          {{item.multi_item_request}}
          <mark>
            <span>Updated</span>
           <time ng-if="!item.multi_item_request" am-time-ago="item.children[0].updated_display"></time>
            <time ng-if="item.multi_item_request" am-time-ago="item.updated_display"></time>
          </mark>
           <label class="label label-{{item.state_id}}">
            <span ng-if="item.multi_item_request">{{item.state}}</span>
            <span ng-if="!item.multi_item_request">{{item.children[0].state}}</span>
          </label>
        </aside>
        <div ng-repeat="child in item.children">
          <header>
            <small ng-if="child.opened_by"><span>Requested for you by </span>{{child.opened_by}}</small>
            <small ng-if="child.requested_for"><span>Requested for </span>{{child.requested_for}}</small>
            <a href="javascript:void()" ng-click="c.onClick(child.sys_id, item.table)">{{child.short_description}}</a>
            <span>
              <span class="child" ng-if="item.multi_item_request">{{child.number}}</span>
              <label class="label label-{{child.state_id}} child" ng-if="item.multi_item_request">{{child.state}}</label>
            </span>
            <footer>Created {{child.sys_created_on | amDateFormat:'MMM Do, YYYY'}}</footer>
          </header>
        </div>
      </div>
      <!-- incidents -->
      <div ng-if="item.type != 'request'" class="ticket">
        <aside class="item-header">
        <span class="fa fa-stack"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-child fa-stack-1x fa-inverse"></i> </span>
        <span>{{item.number}}</span>
        <mark><span>Updated</span><time am-time-ago="item.updated_display"></time><!--<time>{{item.sys_updated_on"}}</time>--></mark>
        <label class="label label-{{item.state_id}}">{{item.state}}</label>
      </aside>
        <header>
          <small ng-if="item.opened_by" class="text-muted"><span>Opened for you by </span>{{item.opened_by}}</small>
          <small ng-if="item.caller_id" class="text-muted"><span>Opened for </span>{{item.caller_id}}</small>
          <a href="javascript:void()" ng-click="c.onClick(item.sys_id,item.table)">{{item.short_description}}</a>
          <footer>Created {{item.sys_created_on | amDateFormat:'MMM Do, YYYY'}}</footer>
        </header>
      </div>
    </div>
  </section>
  <footer class="panel-footer text-center">
    <dir-pagination-controls pagination-id="activity"></dir-pagination-controls>
	</footer>
</div>

//css
.panel-heading {
  background-color: #A51C30;
  color: #F3F3F1;
  position: relative;
  aside {
    position: absolute;
    right: 15px;
    top: 8px;
    input {
      width: 75px;
      padding: 0 20px 0 6px;
      background: transparent;
      border: none;
      border-bottom: 1px solid #ccc;
      -moz-transition: width 0.4s ease-in-out;
      -webkit-transition: width 0.4s ease-in-out;
      transition: width 0.4s ease-in-out;
      &:focus {
       width: 235px;
      }
    }
    i {
     position: absolute;
      right: 15px;
      top: 3px;
      pointer-events:none;
    }
  }
}
.sorters {
  background: #BAC5C6;
  margin-bottom: 5px;
  a {
    padding: 3px 15px;
    margin-top: 5px;
    color: #1E1E1E;
  }
  select {
    width: auto;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 0;
    background: transparent;
    //background: #8996A0;
    margin-left: 5px;
    color: #1E1E1E;



  }
}
.panel-body {
  padding: 0;
}
.ticket {
  padding: 0 15px;
  border-bottom: 1px solid #eaeaea;
  .item-header {
    margin-bottom: 3px;
    margin-top:3px;
    margin-left: -5px;
    font-size: .85em;
    .fa {
      .fa-circle {
     /* color: #9d6818;  */
        color: #1E1E1E;
      }
      &.fa-req .fa-circle {
      /*  color: #107d8b; */
        color: #1E1E1E;
      }
    }
    mark {
      float: right;
    }
  }
  label {
    font-size: .8em;
    text-transform: uppercase;
    font-weight: 100;
    border-width: 1px;
    border-style: solid;
    color: #333;
    float: right;
    margin-top: 2px;
    margin-right: 10px;
    border-color: #dacd94;
    color: #333;
    &.label-4 {border-color: red; color: #333; }
    &.label-5 {border-color: pink; color: #333;}
    &.child {border: none; float: none; margin: 0;}
  }
  span.child {
    font-weight: 100;
    color: #333;
  }
  header {
    padding: 0 0 10px;
    small {
      display: block;
      font-size: .75em;
    }
    > span {
      font-size: .75em;
      margin-left: 20px;
    }
    footer {
      font-size: .75em;
    }
  }
}
.pagination {
  margin: 0;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #F3F3F1;
    opacity: 1; /* Firefox */
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #F3F3F1;
}
::-ms-input-placeholder { /* Microsoft Edge */
    color: #F3F3F1;
}
mark > span, mark > time {
  background-color: #FFDB6D;
  color: #1e1e1e;
}

.panel-footer {
 background-color: #BAC5C6;
}

.pagination > li > a {
 background-color: #f3f3f1;
  color: #1e1e1e;
}

.pagination > li > a:hover {
  background-color: darken(#f3f3f1,10%);
  color: #a51c30;
}

//server
(function() {

	options.maximum_entries = options.maximum_entries || 50;
	options.items_per_page = options.items_per_page || 5;
	data.items = [];

	var u = gs.getUser().getID();

	// INCIDENTS
	var inc = new GlideRecord('incident');
	var zinc = inc.addQuery('caller_id', u);
	zinc.addOrCondition('u_on_behalf_of', u);
	inc.orderByDesc('sys_updated_on');
	inc.query();
	while (inc.next()) {
		var a = {};
		$sp.getRecordValues(a, inc, 'short_description,sys_id,number,sys_created_on');
		a.updated_display = inc.sys_updated_on.getGlideObject().getNumericValue();
		a.sys_updated_on = inc.sys_updated_on.getDisplayValue();
		if (inc.short_description.nil())
			a.short_description = "(No description)";
		if(inc.opened_by != u)
			a.opened_by =  inc.opened_by.getDisplayValue();
		if(inc.caller_id != u)
			a.caller_id =  inc.caller_id.getDisplayValue();
		if(inc.getValue('assigned_to'))
			a.assigned_to_id = inc.getValue('assigned_to');

		a.state = inc.state.getDisplayValue();
		a.state_id = inc.getValue('state');
		a.table = inc.getTableName();
		a.assigned_to = inc.assigned_to.getDisplayValue();
		a.type = 'incident';
		a.sortOrder = inc.sys_updated_on.getGlideObject().getNumericValue();
		data.items.push(a);
	}

	// REQUESTS
	var req = new GlideRecord('sc_request');
	var zreq = req.addQuery('opened_by', u);
	zreq.addOrCondition('requested_for',u);
	req.orderByDesc('sys_updated_on');
	req.query();
	while (req.next()) {
		var ritm = new GlideRecord('sc_req_item');
		ritm.addQuery('request', req.getUniqueValue());
		ritm.query();
		if (ritm.getRowCount() == 0)
			continue;

		var b = {};
		$sp.getRecordValues(b, req, 'sys_id,number,requested_for,opened_by');
		b.children = [];
		while(ritm.next()) {
			var child = {};
			$sp.getRecordValues(child, ritm, 'sys_id,number,sys_created_on');
			if (ritm.getRowCount() > 1) {
				b.multi_item_request = 'Request ('+ritm.getRowCount()+' items)';
			}
			if(ritm.request.requested_for != u)
				child.requested_for = ritm.request.requested_for.getDisplayValue();

			if(ritm.opened_by != u)
				child.opened_by = ritm.opened_by.getDisplayValue();

			child.sys_updated_on = ritm.sys_updated_on.getDisplayValue();
			child.updated_display = ritm.sys_updated_on.getGlideObject().getNumericValue();


			child.short_description = ritm.cat_item.getDisplayValue() || ritm.getDisplayValue("short_description");
			child.state = ritm.state.getDisplayValue();
			child.state_id = ritm.getValue('state');
			b.children.push(child);
		}
		b.state = req.state.getDisplayValue();
		b.sys_updated_on = req.sys_updated_on.getDisplayValue();
		b.updated_display = req.sys_updated_on.getGlideObject().getNumericValue();

		b.state_id = req.getValue('state');
		b.table = 'sc_req_item';
		b.type = 'request';
		b.sortOrder = req.sys_updated_on.getGlideObject().getNumericValue();
		data.items.push(b);
	}

	data.items.sort(function(a, b) {
		return b.sortOrder - a.sortOrder;
	});
	data.items = data.items.slice(0,options.maximum_entries);
	data.count = data.items.length;

})()

//client
function ($location, $scope) {
	var c = this;

	c.onClick = function(sys_id, table) {
		$location.url('?sys_id='+sys_id+'&id=ticket&table='+table)
	}

	$scope.propertyName = 'sys_updated_on.value';
	$scope.reverse = false;
	$scope.sortBy = function(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
  };
}

//Fields=Glyph DisplayName

//Option Schema
[{"hint":"Number of records to show","name":"maximum_entries","label":"Maximum entries","type":"integer"},{"hint":"Number of items on each page","name":"items_per_page","label":"Items per page","type":"integer"}]

//Dependancies
Angular Moment JS - UI Script= angular.moment
"format amd";!function(){"use strict";function a(a){return angular.isUndefined(a)||null===a}function b(){try{return require("moment")}catch(a){throw new Error("Please install moment via npm. Please reference to: https://github.com/urish/angular-moment")}}function c(c,d){if("undefined"==typeof d){if("function"!=typeof require)throw new Error("Moment cannot be found by angular-moment! Please reference to: https://github.com/urish/angular-moment");d=b()}return c.module("angularMoment",[]).constant("angularMomentConfig",{preprocess:null,timezone:null,format:null,statefulFilters:!0}).constant("moment",d).constant("amTimeAgoConfig",{withoutSuffix:!1,serverTime:null,titleFormat:null,fullDateThreshold:null,fullDateFormat:null,fullDateThresholdUnit:"day"}).directive("amTimeAgo",["$window","moment","amMoment","amTimeAgoConfig",function(b,d,e,f){return function(g,h,i){function j(){var a;if(p)a=p;else if(f.serverTime){var b=(new Date).getTime(),c=b-w+f.serverTime;a=d(c)}else a=d();return a}function k(){q&&(b.clearTimeout(q),q=null)}function l(a){var c=j().diff(a,v),d=t&&c>=t;if(d?h.text(a.format(u)):h.text(a.from(j(),r)),s&&z&&h.attr("title",a.format(s)),!d){var e=Math.abs(j().diff(a,"minute")),f=3600;e<1?f=1:e<60?f=30:e<180&&(f=300),q=b.setTimeout(function(){l(a)},1e3*f)}}function m(a){y&&h.attr("datetime",a)}function n(){if(k(),o){var a=e.preprocessDate(o);l(a),m(a.toISOString())}}var o,p,q=null,r=f.withoutSuffix,s=f.titleFormat,t=f.fullDateThreshold,u=f.fullDateFormat,v=f.fullDateThresholdUnit,w=(new Date).getTime(),x=i.amTimeAgo,y="TIME"===h[0].nodeName.toUpperCase(),z=!h.attr("title");g.$watch(x,function(b){return a(b)||""===b?(k(),void(o&&(h.text(""),m(""),o=null))):(o=b,void n())}),c.isDefined(i.amFrom)&&g.$watch(i.amFrom,function(b){p=a(b)||""===b?null:d(b),n()}),c.isDefined(i.amWithoutSuffix)&&g.$watch(i.amWithoutSuffix,function(a){"boolean"==typeof a?(r=a,n()):r=f.withoutSuffix}),i.$observe("amFullDateThreshold",function(a){t=a,n()}),i.$observe("amFullDateFormat",function(a){u=a,n()}),i.$observe("amFullDateThresholdUnit",function(a){v=a,n()}),g.$on("$destroy",function(){k()}),g.$on("amMoment:localeChanged",function(){n()})}}]).service("amMoment",["moment","$rootScope","$log","angularMomentConfig",function(a,b,d,e){var f=null;this.changeLocale=function(d,e){var f=a.locale(d,e);return c.isDefined(d)&&b.$broadcast("amMoment:localeChanged"),f},this.changeTimezone=function(c){a.tz&&a.tz.setDefault?(a.tz.setDefault(c),b.$broadcast("amMoment:timezoneChanged")):d.warn("angular-moment: changeTimezone() works only with moment-timezone.js v0.3.0 or greater."),e.timezone=c,f=c},this.preprocessDate=function(b){return f!==e.timezone&&this.changeTimezone(e.timezone),e.preprocess?e.preprocess(b):a(!isNaN(parseFloat(b))&&isFinite(b)?parseInt(b,10):b)}}]).filter("amParse",["moment",function(a){return function(b,c){return a(b,c)}}]).filter("amFromUnix",["moment",function(a){return function(b){return a.unix(b)}}]).filter("amUtc",["moment",function(a){return function(b){return a.utc(b)}}]).filter("amUtcOffset",["amMoment",function(a){function b(b,c){return a.preprocessDate(b).utcOffset(c)}return b}]).filter("amLocal",["moment",function(a){return function(b){return a.isMoment(b)?b.local():null}}]).filter("amTimezone",["amMoment","angularMomentConfig","$log",function(a,b,c){function d(b,d){var e=a.preprocessDate(b);return d?e.tz?e.tz(d):(c.warn("angular-moment: named timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js ?"),e):e}return d}]).filter("amCalendar",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(b,d,e){if(a(b))return"";var f=c.preprocessDate(b);return f.isValid()?f.calendar(d,e):""}return e.$stateful=d.statefulFilters,e}]).filter("amDifference",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(d,e,f,g){if(a(d))return"";var h=c.preprocessDate(d),i=a(e)?b():c.preprocessDate(e);return h.isValid()&&i.isValid()?h.diff(i,f,g):""}return e.$stateful=d.statefulFilters,e}]).filter("amDateFormat",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(b,d){if(a(b))return"";var e=c.preprocessDate(b);return e.isValid()?e.format(d):""}return e.$stateful=d.statefulFilters,e}]).filter("amDurationFormat",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b.duration(c,d).humanize(e)}return d.$stateful=c.statefulFilters,d}]).filter("amTimeAgo",["moment","amMoment","angularMomentConfig",function(b,c,d){function e(d,e,f){var g,h;return a(d)?"":(d=c.preprocessDate(d),g=b(d),g.isValid()?(h=b(f),!a(f)&&h.isValid()?g.from(h,e):g.fromNow(e)):"")}return e.$stateful=d.statefulFilters,e}]).filter("amSubtract",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b(c).subtract(parseInt(d,10),e)}return d.$stateful=c.statefulFilters,d}]).filter("amAdd",["moment","angularMomentConfig",function(b,c){function d(c,d,e){return a(c)?"":b(c).add(parseInt(d,10),e)}return d.$stateful=c.statefulFilters,d}]).filter("amStartOf",["moment","angularMomentConfig",function(b,c){function d(c,d){return a(c)?"":b(c).startOf(d)}return d.$stateful=c.statefulFilters,d}]).filter("amEndOf",["moment","angularMomentConfig",function(b,c){function d(c,d){return a(c)?"":b(c).endOf(d)}return d.$stateful=c.statefulFilters,d}]),"angularMoment"}var d=window&&window.process&&window.process.type;"function"==typeof define&&define.amd?define(["angular","moment"],c):"undefined"!=typeof module&&module&&module.exports&&"function"==typeof require&&!d?module.exports=c(require("angular"),require("moment")):c(angular,("undefined"!=typeof global?global:window).moment)}();
//# sourceMappingURL=angular-moment.min.js.map

https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.16/angular-filter.js = js file url https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.16/angular-filter.js

Angular paginiation = ui script = dirPagination.js
/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    angular.module(moduleName, [])
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])
        .directive('dirPaginateNoCompile', noCompileDirective)
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])
        .service('paginationService', paginationService)
        .provider('paginationTemplate', paginationTemplateProvider)
        .run(['$templateCache',dirPaginationControlsTemplateInstaller]);

    function dirPaginateDirective($compile, $parse, paginationService) {

        return  {
            terminal: true,
            multiElement: true,
            priority: 100,
            compile: dirPaginationCompileFn
        };

        function dirPaginationCompileFn(tElement, tAttrs){

            var expression = tAttrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/v1.4.x/src/ng/directive/ngRepeat.js#L339
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage\s*:\s*(.*\(\s*\w*\)|([^\)]*?(?=\s+as\s+))|[^\)]*)/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            addNoCompileAttributes(tElement);

            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.
            var rawId = tAttrs.paginationId || DEFAULT_ID;
            paginationService.registerInstance(rawId);

            return function dirPaginationLinkFn(scope, element, attrs){

                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;

                // (TODO: this seems sound, but I'm reverting as many bug reports followed it's introduction in 0.11.0.
                // Needs more investigation.)
                // In case rawId != paginationId we deregister using rawId for the sake of general cleanliness
                // before registering using paginationId
                // paginationService.deregisterInstance(rawId);
                paginationService.registerInstance(paginationId);

                var repeatExpression = getRepeatExpression(expression, paginationId);
                addNgRepeatToElement(element, attrs, repeatExpression);

                removeTemporaryAttributes(element);
                var compiled =  $compile(element);

                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function() {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 <= result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    paginationService.setAsyncModeFalse(paginationId);
                    scope.$watchCollection(function() {
                        return collectionGetter(scope);
                    }, function(collection) {
                        if (collection) {
                            var collectionLength = (collection instanceof Array) ? collection.length : Object.keys(collection).length;
                            paginationService.setCollectionLength(paginationId, collectionLength);
                        }
                    });
                }

                // Delegate to the link function returned by the new compilation of the ng-repeat
                compiled(scope);

                // (TODO: Reverting this due to many bug reports in v 0.11.0. Needs investigation as the
                // principle is sound)
                // When the scope is destroyed, we make sure to remove the reference to it in paginationService
                // so that it can be properly garbage collected
                // scope.$on('$destroy', function destroyDirPagination() {
                //     paginationService.deregisterInstance(paginationId);
                // });
            };
        }

        /**
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.
         *
         * @param expression
         * @param paginationId
         * @returns {*}
         */
        function getRepeatExpression(expression, paginationId) {
            var repeatExpression,
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);

            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:\s*[^|\s]*)/, "$1 : '" + paginationId + "'");
            } else {
                repeatExpression = expression;
            }

            return repeatExpression;
        }

        /**
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the
         * appropriate multi-element ng-repeat to the first and last element in the range.
         * @param element
         * @param attrs
         * @param repeatExpression
         */
        function addNgRepeatToElement(element, attrs, repeatExpression) {
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)
                attrs.$set('ngRepeatStart', repeatExpression);
                element.eq(element.length - 1).attr('ng-repeat-end', true);
            } else {
                attrs.$set('ngRepeat', repeatExpression);
            }
        }

        /**
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.
         * @param tElement
         */
        function addNoCompileAttributes(tElement) {
            angular.forEach(tElement, function(el) {
                if (el.nodeType === 1) {
                    angular.element(el).attr('dir-paginate-no-compile', true);
                }
            });
        }

        /**
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.
         * @param element
         */
        function removeTemporaryAttributes(element) {
            angular.forEach(element, function(el) {
                if (el.nodeType === 1) {
                    angular.element(el).removeAttr('dir-paginate-no-compile');
                }
            });
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');
        }

        /**
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.
         *
         * @param scope
         * @param attrs
         * @param paginationId
         * @returns {*}
         */
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {
            var currentPageGetter;
            if (attrs.currentPage) {
                currentPageGetter = $parse(attrs.currentPage);
            } else {
                // If the current-page attribute was not set, we'll make our own.
                // Replace any non-alphanumeric characters which might confuse
                // the $parse service and give unexpected results.
                // See https://github.com/michaelbromley/angularUtils/issues/233
                var defaultCurrentPage = (paginationId + '__currentPage').replace(/\W/g, '_');
                scope[defaultCurrentPage] = 1;
                currentPageGetter = $parse(defaultCurrentPage);
            }
            return currentPageGetter;
        }
    }

    /**
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */
    function noCompileDirective() {
        return {
            priority: 5000,
            terminal: true
        };
    }

    function dirPaginationControlsTemplateInstaller($templateCache) {
        $templateCache.put('angularUtils.directives.dirPagination.template', '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>');
    }

    function dirPaginationControlsDirective(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        var DDO = {
            restrict: 'AE',
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?',
                autoHide: '=?'
            },
            link: dirPaginationControlsLinkFn
        };

        // We need to check the paginationTemplate service to see whether a template path or
        // string has been specified, and add the `template` or `templateUrl` property to
        // the DDO as appropriate. The order of priority to decide which template to use is
        // (highest priority first):
        // 1. paginationTemplate.getString()
        // 2. attrs.templateUrl
        // 3. paginationTemplate.getPath()
        var templateString = paginationTemplate.getString();
        if (templateString !== undefined) {
            DDO.template = templateString;
        } else {
            DDO.templateUrl = function(elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            };
        }
        return DDO;

        function dirPaginationControlsLinkFn(scope, element, attrs) {

            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.
            var rawId = attrs.paginationId ||  DEFAULT_ID;
            var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;

            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                if (window.console) {
                    console.warn('Pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive, which was not found at link time.');
                }
            }

            if (!scope.maxSize) { scope.maxSize = 9; }
            scope.autoHide = scope.autoHide === undefined ? true : scope.autoHide;
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };
            scope.range = {
                lower: 1,
                upper: 1,
                total: 1
            };

            scope.$watch('maxSize', function(val) {
                if (val) {
                    paginationRange = Math.max(scope.maxSize, 5);
                    generatePagination();
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }
            }, function(length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getItemsPerPage(paginationId));
                }
            }, function(current, previous) {
                if (current != previous && typeof previous !== 'undefined') {
                    goToPage(scope.pagination.current);
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return paginationService.getCurrentPage(paginationId);
                }
            }, function(currentPage, previousPage) {
                if (currentPage != previousPage) {
                    goToPage(currentPage);
                }
            });

            scope.setCurrent = function(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    num = parseInt(num, 10);
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            /**
             * Custom "track by" function which allows for duplicate "..." entries on long lists,
             * yet fixes the problem of wrongly-highlighted links which happens when using
             * "track by $index" - see https://github.com/michaelbromley/angularUtils/issues/153
             * @param id
             * @param index
             * @returns {string}
             */
            scope.tracker = function(id, index) {
                return id + '_' + index;
            };

            function goToPage(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    var oldPageNumber = scope.pagination.current;

                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;
                    updateRangeValues();

                    // if a callback has been set, then call it with the page number as the first argument
                    // and the previous page number as a second argument
                    if (scope.onPageChange) {
                        scope.onPageChange({
                            newPageNumber : num,
                            oldPageNumber : oldPageNumber
                        });
                    }
                }
            }

            function generatePagination() {
                if (paginationService.isRegistered(paginationId)) {
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;
                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;
                    scope.pagination.last = scope.pages[scope.pages.length - 1];
                    if (scope.pagination.last < scope.pagination.current) {
                        scope.setCurrent(scope.pagination.last);
                    } else {
                        updateRangeValues();
                    }
                }
            }

            /**
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
             */
            function updateRangeValues() {
                if (paginationService.isRegistered(paginationId)) {
                    var currentPage = paginationService.getCurrentPage(paginationId),
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),
                        totalItems = paginationService.getCollectionLength(paginationId);

                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                    scope.range.total = totalItems;
                }
            }
            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    /**
     * This filter slices the collection into pages based on the current page number and number of items per page.
     * @param paginationService
     * @returns {Function}
     */
    function itemsPerPageFilter(paginationService) {

        return function(collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (angular.isObject(collection)) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                if (collection instanceof Array) {
                    // the array just needs to be sliced
                    return collection.slice(start, end);
                } else {
                    // in the case of an object, we need to get an array of keys, slice that, then map back to
                    // the original object.
                    var slicedObject = {};
                    angular.forEach(keys(collection).slice(start, end), function(key) {
                        slicedObject[key] = collection[key];
                    });
                    return slicedObject;
                }
            } else {
                return collection;
            }
        };
    }

    /**
     * Shim for the Object.keys() method which does not exist in IE < 9
     * @param obj
     * @returns {Array}
     */
    function keys(obj) {
        if (!Object.keys) {
            var objKeys = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    objKeys.push(i);
                }
            }
            return objKeys;
        } else {
            return Object.keys(obj);
        }
    }

    /**
     * This service allows the various parts of the module to communicate and stay in sync.
     */
    function paginationService() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function(instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.deregisterInstance = function(instanceId) {
            delete instances[instanceId];
        };

        this.isRegistered = function(instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function() {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function(instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function(instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function(instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function(instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.setAsyncModeFalse = function(instanceId) {
            instances[instanceId].asyncMode = false;
        };

        this.isAsyncMode = function(instanceId) {
            return instances[instanceId].asyncMode;
        };
    }

    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'angularUtils.directives.dirPagination.template';
        var templateString;

        /**
         * Set a templateUrl to be used by all instances of <dir-pagination-controls>
         * @param {String} path
         */
        this.setPath = function(path) {
            templatePath = path;
        };

        /**
         * Set a string of HTML to be used as a template by all instances
         * of <dir-pagination-controls>. If both a path *and* a string have been set,
         * the string takes precedence.
         * @param {String} str
         */
        this.setString = function(str) {
            templateString = str;
        };

        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                },
                getString: function() {
                    return templateString;
                }
            };
        };
    }
})();


//angular ng-template = dirPagination
<ul class="pagination" ng-if="1 < pages.length || !autoHide">
    <li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }">
        <a href="" ng-click="setCurrent(1)">&laquo;</a>
    </li>
    <li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }">
        <a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a>
    </li>
    <li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }">
        <a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a>
    </li>

    <li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }">
        <a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a>
    </li>
    <li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }">
        <a href="" ng-click="setCurrent(pagination.last)">&raquo;</a>
    </li>
</ul>
