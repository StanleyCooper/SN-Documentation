/*****************

on sys_widgets TABLE

******************/


function sections() {
	return {
		'Incident Date Filter' : {
			'table' : 'incident'
		},
		'Incident Opened Date Filter' : {
			'table' : 'incident',
			'field': 'opened_at'
		},
		'Problem Opened Date Filter' : {
			'table' : 'problem',
			'field': 'opened_at'
		}
	};
}

function render() {
	var table = renderer.getPreferences().get("table");
	var field = renderer.getPreferences().get("field");
	if(table) {
		var jr = new GlideJellyRunner();
		renderer.getRenderProperties().setDeferInlineScripts(false);
		jr.setRenderProperties(renderer.getRenderProperties());
		jr.setTwoPhase(true);
		jr.setVariable('jvar_uid', randInt(100000, 999999) + '' + randInt(100000, 999999));
		if(field)
			jr.setVariable('jvar_field',field);
		jr.setVariable('jvar_table',table);
		return jr.runFromTemplate('interactive_date_filter.xml');
	}
	else {
		// Default to NOOP
		return 'Invalid widget type';
	}
}

function getEditLink() {
	if (!gs.hasRole('admin'))
		return '';
	return "sys_ui_page.do?sysparm_query=name=" + renderer.getPreferences().get("name");
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***********

on sys_ui_macro TABLE

************/


<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
<j:if test="${RP.isPreview()}">
 <center>${gs.getMessage('No preview available')}</center>
</j:if>
<style>
	#GwtDateTimePicker.drag_section_part .drag_section_picker .drag_section_header .drag_section_movearea {
		line-height: 1.42857;
	}
	.interactive_date_filter {
		margin: 4px 0px;
	}
	.interactive_date_filter .select2-container {
	    min-width: 180px;
		margin: 0 10px;
	}
</style>
<!-- Its just an demo widget which we are building, so all code is in one file, but for proper code separate out this in separate macros -->
<g:evaluate var="jvar_fields" jelly="true">
	var fields = "";
	var td = new GlideTableDescriptor("${jvar_table}");
	var result = [];
	if("${jvar_field}" === "") {
		result = [{"id": "all",
			"text": "All"
		}];
	}
	var iterator = td.getSchemaList().iterator();
	while(iterator.hasNext()) {
		var current = iterator.next();
		var compElm = new GlideCompositeElement(current.getName(), '${jvar_table}');
		var ed = compElm.getTargetED();
		if(ed.isDateType()){
			if("${jvar_field}" !== "" &amp;&amp; "${jvar_field}" == current.getName()) {
				result = [{"id": current.getName(),
					"text": current.getLabel()
				}];
			}
			if("${jvar_field}" === "") {
				result.push({"id": current.getName(),
					"text": current.getLabel()
				});
			}
		}
	}
	fields = JSON.stringify(result);
	fields;
</g:evaluate>

<j:if test="${!RP.isPreview()}">
	<form id="${jvar_uid}" class="form-inline interactive_date_filter">
		<input type="hidden" id="interactive_date_filter_feilds" value="${jvar_fields}" />
		<div class="form-group">
			<div class="fields-select form-control" title="From date">
			</div>
			<label class="control-label fields-select-label" style="padding: 7px;font-weight: 800;display:none;">

			</label>
		</div>
		<span class="filter-block">
		    <div class="form-group">
			  <select id="filerTableSelect" class="form-control" title="${gs.getMessage('Operator')}">
				  <option value="ON">${gs.getMessage('on')}</option>
				  <option value="NOTON">${gs.getMessage('not on')}</option>
				  <option val = "&lt;" value="lt">${gs.getMessage('before')}</option>
				  <option val = "&lt;=" value="lteq">${gs.getMessage('at or before')}</option>
				  <option val = "&gt;" value="gt">${gs.getMessage('after')}</option>
				  <option val = "&gt;=" value="gteq">${gs.getMessage('at or after')}</option>
				  <option value="BETWEEN">${gs.getMessage('between')}</option>
				  <option value="ISEMPTY">${gs.getMessage('is empty')}</option>
				  <option value="ISNOTEMPTY">${gs.getMessage('is not empty')}</option>
				  <option value="ANYTHING">${gs.getMessage('is anything')}</option>
			  </select>
		    </div>
		    <div class="form-group" other-block="">
			  <div class="fromSelect form-control" title="${gs.getMessage('Select Date')}" >

			  </div>
		    </div>
			<div class="form-group" other-block="">
				<input id="${jvar_uid}-fromSelectDate" type="hidden" name="fromSelectDate" />
				<button type="button" onclick="new GwtDateTimePicker('${jvar_uid}-fromSelectDate', '$[gs.getDateFormat()]', false);" title="Choose date..." class="btn btn-default icon-calendar" style="margin-right: 1px; vertical-align: top;"></button>
			</div>
			<div class="form-group" between-block="" style="margin-left: 10px;display: none;">
				  <label class="control-label" style="padding: 7px;font-weight: 800;">${gs.getMessage('and')}</label>
			</div>
			<div class="form-group" between-block="" style="display: none;">
				<div class="toSelect form-control" title="${gs.getMessage('To date')}">
				</div>
				<input id="${jvar_uid}-toSelectDate" type="hidden" name="toSelectDate" />
				<button type="button" onclick="new GwtDateTimePicker('${jvar_uid}-toSelectDate', '$[gs.getDateFormat()]', false);" title="Choose date..." class="btn btn-default icon-calendar" style="margin-right: 1px; vertical-align: top;"></button>
			</div>
		</span>
	</form>
</j:if>
<script>
	(function() {
			var optionValues = {
			"ON_NOT_ON": [{
				"text": "${gs.getMessage('Today')}",
				"id": "Today@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Yesterday')}",
				"id": "Yesterday@javascript:gs.daysAgoStart(1)@javascript:gs.daysAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Tomorrow')}",
				"id": "Tomorrow@javascript:gs.daysAgoStart(-1)@javascript:gs.daysAgoEnd(-1)"
			}, {
				"text": "${gs.getMessage('This week')}",
				"id": "This week@javascript:gs.beginningOfThisWeek()@javascript:gs.endOfThisWeek()"
			}, {
				"text": "${gs.getMessage('Last week')}",
				"id": "Last week@javascript:gs.beginningOfLastWeek()@javascript:gs.endOfLastWeek()"
			}, {
				"text": "${gs.getMessage('Next week')}",
				"id": "Next week@javascript:gs.beginningOfNextWeek()@javascript:gs.endOfNextWeek()"
			}, {
				"text": "${gs.getMessage('This month')}",
				"id": "This month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last month')}",
				"id": "Last month@javascript:gs.beginningOfLastMonth()@javascript:gs.endOfLastMonth()"
			}, {
				"text": "${gs.getMessage('Next month')}",
				"id": "Next month@javascript:gs.beginningOfNextMonth()@javascript:gs.endOfNextMonth()"
			}, {
				"text": "${gs.getMessage('Last 3 months')}",
				"id": "Last 3 months@javascript:gs.monthsAgoStart(3)@javascript:gs.endOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last 6 months')}",
				"id": "Last 6 months@javascript:gs.monthsAgoStart(6)@javascript:gs.endOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last 9 months')}",
				"id": "Last 9 months@javascript:gs.monthsAgoStart(9)@javascript:gs.endOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last 12 months')}",
				"id": "Last 12 months@javascript:gs.monthsAgoStart(12)@javascript:gs.endOfThisMonth()"
			}, {
				"text": "${gs.getMessage('This quarter')}",
				"id": "This quarter@javascript:gs.beginningOfThisQuarter()@javascript:gs.endOfThisQuarter()"
			}, {
				"text": "${gs.getMessage('Last quarter')}",
				"id": "Last quarter@javascript:gs.quartersAgoStart(1)@javascript:gs.quartersAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 2 quarters')}",
				"id": "Last 2 quarters@javascript:gs.quartersAgoStart(1)@javascript:gs.endOfThisQuarter()"
			}, {
				"text": "${gs.getMessage('Next quarter')}",
				"id": "Next quarter@javascript:gs.quartersAgoStart(-1)@javascript:gs.quartersAgoEnd(-1)"
			}, {
				"text": "${gs.getMessage('Next 2 quarters')}",
				"id": "Next 2 quarters@javascript:gs.quartersAgoStart(-1)@javascript:gs.quartersAgoEnd(-2)"
			}, {
				"text": "${gs.getMessage('This year')}",
				"id": "This year@javascript:gs.beginningOfThisYear()@javascript:gs.endOfThisYear()"
			}, {
				"text": "${gs.getMessage('Next year')}",
				"id": "Next year@javascript:gs.beginningOfNextYear()@javascript:gs.endOfNextYear()"
			}, {
				"text": "${gs.getMessage('Last year')}",
				"id": "Last year@javascript:gs.beginningOfLastYear()@javascript:gs.endOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 2 years')}",
				"id": "Last 2 years@javascript:gs.beginningOfLastYear()@javascript:gs.endOfThisYear()"
			}, {
				"text": "${gs.getMessage('Last 7 days')}",
				"id": "Last 7 days@javascript:gs.daysAgoStart(7)@javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last 30 days')}",
				"id": "Last 30 days@javascript:gs.daysAgoStart(30)@javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last 60 days')}",
				"id": "Last 60 days@javascript:gs.daysAgoStart(60)@javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last 90 days')}",
				"id": "Last 90 days@javascript:gs.daysAgoStart(90)@javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last 120 days')}",
				"id": "Last 120 days@javascript:gs.daysAgoStart(120)@javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Current hour')}",
				"id": "Current hour@javascript:gs.hoursAgoStart(0)@javascript:gs.hoursAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last hour')}",
				"id": "Last hour@javascript:gs.hoursAgoStart(1)@javascript:gs.hoursAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 2 hours')}",
				"id": "Last 2 hours@javascript:gs.hoursAgo(2)@javascript:gs.hoursAgo(0)"
			}, {
				"text": "${gs.getMessage('Current minute')}",
				"id": "Current minute@javascript:gs.minutesAgoStart(0)@javascript:gs.minutesAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last minute')}",
				"id": "Last minute@javascript:gs.minutesAgoStart(1)@javascript:gs.minutesAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 15 minutes')}",
				"id": "Last 15 minutes@javascript:gs.minutesAgoStart(15)@javascript:gs.minutesAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last 30 minutes')}",
				"id": "Last 30 minutes@javascript:gs.minutesAgoStart(30)@javascript:gs.minutesAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last 45 minutes')}",
				"id": "Last 45 minutes@javascript:gs.minutesAgoStart(45)@javascript:gs.minutesAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('One year ago')}",
				"id": "One year ago@javascript:gs.monthsAgo(12)@javascript:gs.endOfThisMonth()"
			}],
			"BEFORE": [{
				"text": "${gs.getMessage('Today')}",
				"id": "javascript:gs.daysAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Yesterday')}",
				"id": "javascript:gs.daysAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Tomorrow')}",
				"id": "javascript:gs.daysAgoStart(-1)"
			}, {
				"text": "${gs.getMessage('This week')}",
				"id": "javascript:gs.beginningOfThisWeek()"
			}, {
				"text": "${gs.getMessage('Last week')}",
				"id": "javascript:gs.beginningOfLastWeek()"
			}, {
				"text": "${gs.getMessage('Next week')}",
				"id": "javascript:gs.beginningOfNextWeek()"
			}, {
				"text": "${gs.getMessage('This month')}",
				"id": "javascript:gs.beginningOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last month')}",
				"id": "javascript:gs.beginningOfLastMonth()"
			}, {
				"text": "${gs.getMessage('Next month')}",
				"id": "javascript:gs.beginningOfNextMonth()"
			}, {
				"text": "${gs.getMessage('Last 3 months')}",
				"id": "javascript:gs.monthsAgoStart(3)"
			}, {
				"text": "${gs.getMessage('Last 6 months')}",
				"id": "javascript:gs.monthsAgoStart(6)"
			}, {
				"text": "${gs.getMessage('Last 9 months')}",
				"id": "javascript:gs.monthsAgoStart(9)"
			}, {
				"text": "${gs.getMessage('Last 12 months')}",
				"id": "javascript:gs.monthsAgoStart(12)"
			}, {
				"text": "${gs.getMessage('This quarter')}",
				"id": "javascript:gs.beginningOfThisQuarter()"
			}, {
				"text": "${gs.getMessage('Last quarter')}",
				"id": "javascript:gs.quartersAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Next quarter')}",
				"id": "javascript:gs.quartersAgoStart(-1)"
			}, {
				"text": "${gs.getMessage('This year')}",
				"id": "javascript:gs.beginningOfThisYear()"
			}, {
				"text": "${gs.getMessage('Next year')}",
				"id": "javascript:gs.beginningOfNextYear()"
			}, {
				"text": "${gs.getMessage('Last year')}",
				"id": "javascript:gs.beginningOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 7 days')}",
				"id": "javascript:gs.daysAgoStart(7)"
			}, {
				"text": "${gs.getMessage('Last 30 days')}",
				"id": "javascript:gs.daysAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 60 days')}",
				"id": "javascript:gs.daysAgoStart(60)"
			}, {
				"text": "${gs.getMessage('Last 90 days')}",
				"id": "javascript:gs.daysAgoStart(90)"
			}, {
				"text": "${gs.getMessage('Last 120 days')}",
				"id": "javascript:gs.daysAgoStart(120)"
			}, {
				"text": "${gs.getMessage('Current hour')}",
				"id": "javascript:gs.hoursAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Last hour')}",
				"id": "javascript:gs.hoursAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 2 hours')}",
				"id": "javascript:gs.hoursAgo(2)"
			}, {
				"text": "${gs.getMessage('Current minute')}",
				"id": "javascript:gs.minutesAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Last minute')}",
				"id": "javascript:gs.minutesAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 15 minutes')}",
				"id": "javascript:gs.minutesAgoStart(15)"
			}, {
				"text": "${gs.getMessage('Last 30 minutes')}",
				"id": "javascript:gs.minutesAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 45 minutes')}",
				"id": "javascript:gs.minutesAgoStart(45)"
			}, {
				"text": "${gs.getMessage('One year ago')}",
				"id": "javascript:gs.monthsAgo(12)"
			}],
			"AT_OR_BEFORE": [{
				"text": "${gs.getMessage('Today')}",
				"id": "javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Yesterday')}",
				"id": "javascript:gs.daysAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Tomorrow')}",
				"id": "javascript:gs.daysAgoEnd(-1)"
			}, {
				"text": "${gs.getMessage('This week')}",
				"id": "javascript:gs.endOfThisWeek()"
			}, {
				"text": "${gs.getMessage('Last week')}",
				"id": "javascript:gs.endOfLastWeek()"
			}, {
				"text": "${gs.getMessage('Next week')}",
				"id": "javascript:gs.endOfNextWeek()"
			}, {
				"text": "${gs.getMessage('This month')}",
				"id": "javascript:gs.endOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last month')}",
				"id": "javascript:gs.endOfLastMonth()"
			}, {
				"text": "${gs.getMessage('Next month')}",
				"id": "javascript:gs.endOfNextMonth()"
			}, {
				"text": "${gs.getMessage('Last 3 months')}",
				"id": "javascript:gs.monthsAgoStart(3)"
			}, {
				"text": "${gs.getMessage('Last 6 months')}",
				"id": "javascript:gs.monthsAgoStart(6)"
			}, {
				"text": "${gs.getMessage('Last 9 months')}",
				"id": "javascript:gs.monthsAgoStart(9)"
			}, {
				"text": "${gs.getMessage('Last 12 months')}",
				"id": "javascript:gs.monthsAgoStart(12)"
			}, {
				"text": "${gs.getMessage('This quarter')}",
				"id": "javascript:gs.endOfThisQuarter()"
			}, {
				"text": "${gs.getMessage('Last quarter')}",
				"id": "javascript:gs.quartersAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 2 quarters')}",
				"id": "javascript:gs.quartersAgoEnd(2)"
			}, {
				"text": "${gs.getMessage('Next quarter')}",
				"id": "javascript:gs.quartersAgoEnd(-1)"
			}, {
				"text": "${gs.getMessage('Next 2 quarters')}",
				"id": "javascript:gs.quartersAgoEnd(-2)"
			}, {
				"text": "${gs.getMessage('This year')}",
				"id": "javascript:gs.endOfThisYear()"
			}, {
				"text": "${gs.getMessage('Next year')}",
				"id": "javascript:gs.endOfNextYear()"
			}, {
				"text": "${gs.getMessage('Last year')}",
				"id": "javascript:gs.endOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 2 years')}",
				"id": "javascript:gs.beginningOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 7 days')}",
				"id": "javascript:gs.daysAgoStart(7)"
			}, {
				"text": "${gs.getMessage('Last 30 days')}",
				"id": "javascript:gs.daysAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 60 days')}",
				"id": "javascript:gs.daysAgoStart(60)"
			}, {
				"text": "${gs.getMessage('Last 90 days')}",
				"id": "javascript:gs.daysAgoStart(90)"
			}, {
				"text": "${gs.getMessage('Last 120 days')}",
				"id": "javascript:gs.daysAgoStart(120)"
			}, {
				"text": "${gs.getMessage('Current hour')}",
				"id": "javascript:gs.hoursAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last hour')}",
				"id": "javascript:gs.hoursAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 2 hours')}",
				"id": "javascript:gs.hoursAgo(2)"
			}, {
				"text": "${gs.getMessage('Current minute')}",
				"id": "javascript:gs.minutesAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last minute')}",
				"id": "javascript:gs.minutesAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 15 minutes')}",
				"id": "javascript:gs.minutesAgoStart(15)"
			}, {
				"text": "${gs.getMessage('Last 30 minutes')}",
				"id": "javascript:gs.minutesAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 45 minutes')}",
				"id": "javascript:gs.minutesAgoStart(45)"
			}, {
				"text": "${gs.getMessage('One year ago')}",
				"id": "javascript:gs.monthsAgo(12)"
			}],
			"AFTER": [{
				"text": "${gs.getMessage('Today')}",
				"id": "javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Yesterday')}",
				"id": "javascript:gs.daysAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Tomorrow')}",
				"id": "javascript:gs.daysAgoEnd(-1)"
			}, {
				"text": "${gs.getMessage('This week')}",
				"id": "javascript:gs.endOfThisWeek()"
			}, {
				"text": "${gs.getMessage('Last week')}",
				"id": "javascript:gs.endOfLastWeek()"
			}, {
				"text": "${gs.getMessage('Next week')}",
				"id": "javascript:gs.endOfNextWeek()"
			}, {
				"text": "${gs.getMessage('This month')}",
				"id": "javascript:gs.endOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last month')}",
				"id": "javascript:gs.endOfLastMonth()"
			}, {
				"text": "${gs.getMessage('Next month')}",
				"id": "javascript:gs.endOfNextMonth()"
			}, {
				"text": "${gs.getMessage('Last 3 months')}",
				"id": "javascript:gs.monthsAgoStart(3)"
			}, {
				"text": "${gs.getMessage('Last 6 months')}",
				"id": "javascript:gs.monthsAgoStart(6)"
			}, {
				"text": "${gs.getMessage('Last 9 months')}",
				"id": "javascript:gs.monthsAgoStart(9)"
			}, {
				"text": "${gs.getMessage('Last 12 months')}",
				"id": "javascript:gs.monthsAgoStart(12)"
			}, {
				"text": "${gs.getMessage('This quarter')}",
				"id": "javascript:gs.endOfThisQuarter()"
			}, {
				"text": "${gs.getMessage('Last quarter')}",
				"id": "javascript:gs.quartersAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 2 quarters')}",
				"id": "javascript:gs.quartersAgoEnd(2)"
			}, {
				"text": "${gs.getMessage('Next quarter')}",
				"id": "javascript:gs.quartersAgoEnd(-1)"
			}, {
				"text": "${gs.getMessage('Next 2 quarters')}",
				"id": "javascript:gs.quartersAgoEnd(-2)"
			}, {
				"text": "${gs.getMessage('This year')}",
				"id": "javascript:gs.endOfThisYear()"
			}, {
				"text": "${gs.getMessage('Next year')}",
				"id": "javascript:gs.endOfNextYear()"
			}, {
				"text": "${gs.getMessage('Last year')}",
				"id": "javascript:gs.endOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 2 years')}",
				"id": "javascript:gs.beginningOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 7 days')}",
				"id": "javascript:gs.daysAgoStart(7)"
			}, {
				"text": "${gs.getMessage('Last 30 days')}",
				"id": "javascript:gs.daysAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 60 days')}",
				"id": "javascript:gs.daysAgoStart(60)"
			}, {
				"text": "${gs.getMessage('Last 90 days')}",
				"id": "javascript:gs.daysAgoStart(90)"
			}, {
				"text": "${gs.getMessage('Last 120 days')}",
				"id": "javascript:gs.daysAgoStart(120)"
			}, {
				"text": "${gs.getMessage('Current hour')}",
				"id": "javascript:gs.hoursAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last hour')}",
				"id": "javascript:gs.hoursAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 2 hours')}",
				"id": "javascript:gs.hoursAgo(2)"
			}, {
				"text": "${gs.getMessage('Current minute')}",
				"id": "javascript:gs.minutesAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last minute')}",
				"id": "javascript:gs.minutesAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 15 minutes')}",
				"id": "javascript:gs.minutesAgoStart(15)"
			}, {
				"text": "${gs.getMessage('Last 30 minutes')}",
				"id": "javascript:gs.minutesAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 45 minutes')}",
				"id": "javascript:gs.minutesAgoStart(45)"
			}, {
				"text": "${gs.getMessage('One year ago')}",
				"id": "javascript:gs.monthsAgo(12)"
			}],
			"AT_OR_AFTER": [{
				"text": "${gs.getMessage('Today')}",
				"id": "javascript:gs.daysAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Yesterday')}",
				"id": "javascript:gs.daysAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Tomorrow')}",
				"id": "javascript:gs.daysAgoStart(-1)"
			}, {
				"text": "${gs.getMessage('This week')}",
				"id": "javascript:gs.beginningOfThisWeek()"
			}, {
				"text": "${gs.getMessage('Last week')}",
				"id": "javascript:gs.beginningOfLastWeek()"
			}, {
				"text": "${gs.getMessage('Next week')}",
				"id": "javascript:gs.beginningOfNextWeek()"
			}, {
				"text": "${gs.getMessage('This month')}",
				"id": "javascript:gs.beginningOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last month')}",
				"id": "javascript:gs.beginningOfLastMonth()"
			}, {
				"text": "${gs.getMessage('Next month')}",
				"id": "javascript:gs.beginningOfNextMonth()"
			}, {
				"text": "${gs.getMessage('Last 3 months')}",
				"id": "javascript:gs.monthsAgoStart(3)"
			}, {
				"text": "${gs.getMessage('Last 6 months')}",
				"id": "javascript:gs.monthsAgoStart(6)"
			}, {
				"text": "${gs.getMessage('Last 9 months')}",
				"id": "javascript:gs.monthsAgoStart(9)"
			}, {
				"text": "${gs.getMessage('Last 12 months')}",
				"id": "javascript:gs.monthsAgoStart(12)"
			}, {
				"text": "${gs.getMessage('This quarter')}",
				"id": "javascript:gs.beginningOfThisQuarter()"
			}, {
				"text": "${gs.getMessage('Last quarter')}",
				"id": "javascript:gs.quartersAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Next quarter')}",
				"id": "javascript:gs.quartersAgoStart(-1)"
			}, {
				"text": "${gs.getMessage('This year')}",
				"id": "javascript:gs.beginningOfThisYear()"
			}, {
				"text": "${gs.getMessage('Next year')}",
				"id": "javascript:gs.beginningOfNextYear()"
			}, {
				"text": "${gs.getMessage('Last year')}",
				"id": "javascript:gs.beginningOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 7 days')}",
				"id": "javascript:gs.daysAgoStart(7)"
			}, {
				"text": "${gs.getMessage('Last 30 days')}",
				"id": "javascript:gs.daysAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 60 days')}",
				"id": "javascript:gs.daysAgoStart(60)"
			}, {
				"text": "${gs.getMessage('Last 90 days')}",
				"id": "javascript:gs.daysAgoStart(90)"
			}, {
				"text": "${gs.getMessage('Last 120 days')}",
				"id": "javascript:gs.daysAgoStart(120)"
			}, {
				"text": "${gs.getMessage('Current hour')}",
				"id": "javascript:gs.hoursAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Last hour')}",
				"id": "javascript:gs.hoursAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 2 hours')}",
				"id": "javascript:gs.hoursAgo(2)"
			}, {
				"text": "${gs.getMessage('Current minute')}",
				"id": "javascript:gs.minutesAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Last minute')}",
				"id": "javascript:gs.minutesAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 15 minutes')}",
				"id": "javascript:gs.minutesAgoStart(15)"
			}, {
				"text": "${gs.getMessage('Last 30 minutes')}",
				"id": "javascript:gs.minutesAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 45 minutes')}",
				"id": "javascript:gs.minutesAgoStart(45)"
			}, {
				"text": "${gs.getMessage('One year ago')}",
				"id": "javascript:gs.monthsAgo(12)"
			}],
			"BETWEEN_FROM": [{
				"text": "${gs.getMessage('Today')}",
				"id": "javascript:gs.daysAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Yesterday')}",
				"id": "javascript:gs.daysAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Tomorrow')}",
				"id": "javascript:gs.daysAgoStart(-1)"
			}, {
				"text": "${gs.getMessage('This week')}",
				"id": "javascript:gs.beginningOfThisWeek()"
			}, {
				"text": "${gs.getMessage('Last week')}",
				"id": "javascript:gs.beginningOfLastWeek()"
			}, {
				"text": "${gs.getMessage('Next week')}",
				"id": "javascript:gs.beginningOfNextWeek()"
			}, {
				"text": "${gs.getMessage('This month')}",
				"id": "javascript:gs.beginningOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last month')}",
				"id": "javascript:gs.beginningOfLastMonth()"
			}, {
				"text": "${gs.getMessage('Next month')}",
				"id": "javascript:gs.beginningOfNextMonth()"
			}, {
				"text": "${gs.getMessage('Last 3 months')}",
				"id": "javascript:gs.monthsAgoStart(3)"
			}, {
				"text": "${gs.getMessage('Last 6 months')}",
				"id": "javascript:gs.monthsAgoStart(6)"
			}, {
				"text": "${gs.getMessage('Last 9 months')}",
				"id": "javascript:gs.monthsAgoStart(9)"
			}, {
				"text": "${gs.getMessage('Last 12 months')}",
				"id": "javascript:gs.monthsAgoStart(12)"
			}, {
				"text": "${gs.getMessage('This quarter')}",
				"id": "javascript:gs.beginningOfThisQuarter()"
			}, {
				"text": "${gs.getMessage('Last quarter')}",
				"id": "javascript:gs.quartersAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Next quarter')}",
				"id": "javascript:gs.quartersAgoStart(-1)"
			}, {
				"text": "${gs.getMessage('This year')}",
				"id": "javascript:gs.beginningOfThisYear()"
			}, {
				"text": "${gs.getMessage('Next year')}",
				"id": "javascript:gs.beginningOfNextYear()"
			}, {
				"text": "${gs.getMessage('Last year')}",
				"id": "javascript:gs.beginningOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 7 days')}",
				"id": "javascript:gs.daysAgoStart(7)"
			}, {
				"text": "${gs.getMessage('Last 30 days')}",
				"id": "javascript:gs.daysAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 60 days')}",
				"id": "javascript:gs.daysAgoStart(60)"
			}, {
				"text": "${gs.getMessage('Last 90 days')}",
				"id": "javascript:gs.daysAgoStart(90)"
			}, {
				"text": "${gs.getMessage('Last 120 days')}",
				"id": "javascript:gs.daysAgoStart(120)"
			}, {
				"text": "${gs.getMessage('Current hour')}",
				"id": "javascript:gs.hoursAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Last hour')}",
				"id": "javascript:gs.hoursAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 2 hours')}",
				"id": "javascript:gs.hoursAgo(2)"
			}, {
				"text": "${gs.getMessage('Current minute')}",
				"id": "javascript:gs.minutesAgoStart(0)"
			}, {
				"text": "${gs.getMessage('Last minute')}",
				"id": "javascript:gs.minutesAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 15 minutes')}",
				"id": "javascript:gs.minutesAgoStart(15)"
			}, {
				"text": "${gs.getMessage('Last 30 minutes')}",
				"id": "javascript:gs.minutesAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 45 minutes')}",
				"id": "javascript:gs.minutesAgoStart(45)"
			}, {
				"text": "${gs.getMessage('One year ago')}",
				"id": "javascript:gs.monthsAgo(12)"
			}],
			"BETWEEN_TO": [{
				"text": "${gs.getMessage('Today')}",
				"id": "javascript:gs.daysAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Yesterday')}",
				"id": "javascript:gs.daysAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Tomorrow')}",
				"id": "javascript:gs.daysAgoEnd(-1)"
			}, {
				"text": "${gs.getMessage('This week')}",
				"id": "javascript:gs.endOfThisWeek()"
			}, {
				"text": "${gs.getMessage('Last week')}",
				"id": "javascript:gs.endOfLastWeek()"
			}, {
				"text": "${gs.getMessage('Next week')}",
				"id": "javascript:gs.endOfNextWeek()"
			}, {
				"text": "${gs.getMessage('This month')}",
				"id": "javascript:gs.endOfThisMonth()"
			}, {
				"text": "${gs.getMessage('Last month')}",
				"id": "javascript:gs.endOfLastMonth()"
			}, {
				"text": "${gs.getMessage('Next month')}",
				"id": "javascript:gs.endOfNextMonth()"
			}, {
				"text": "${gs.getMessage('Last 3 months')}",
				"id": "javascript:gs.monthsAgoStart(3)"
			}, {
				"text": "${gs.getMessage('Last 6 months')}",
				"id": "javascript:gs.monthsAgoStart(6)"
			}, {
				"text": "${gs.getMessage('Last 9 months')}",
				"id": "javascript:gs.monthsAgoStart(9)"
			}, {
				"text": "${gs.getMessage('Last 12 months')}",
				"id": "javascript:gs.monthsAgoStart(12)"
			}, {
				"text": "${gs.getMessage('This quarter')}",
				"id": "javascript:gs.endOfThisQuarter()"
			}, {
				"text": "${gs.getMessage('Last quarter')}",
				"id": "javascript:gs.quartersAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 2 quarters')}",
				"id": "javascript:gs.quartersAgoEnd(2)"
			}, {
				"text": "${gs.getMessage('Next quarter')}",
				"id": "javascript:gs.quartersAgoEnd(-1)"
			}, {
				"text": "${gs.getMessage('Next 2 quarters')}",
				"id": "javascript:gs.quartersAgoEnd(-2)"
			}, {
				"text": "${gs.getMessage('This year')}",
				"id": "javascript:gs.endOfThisYear()"
			}, {
				"text": "${gs.getMessage('Next year')}",
				"id": "javascript:gs.endOfNextYear()"
			}, {
				"text": "${gs.getMessage('Last year')}",
				"id": "javascript:gs.endOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 2 years')}",
				"id": "javascript:gs.beginningOfLastYear()"
			}, {
				"text": "${gs.getMessage('Last 7 days')}",
				"id": "javascript:gs.daysAgoStart(7)"
			}, {
				"text": "${gs.getMessage('Last 30 days')}",
				"id": "javascript:gs.daysAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 60 days')}",
				"id": "javascript:gs.daysAgoStart(60)"
			}, {
				"text": "${gs.getMessage('Last 90 days')}",
				"id": "javascript:gs.daysAgoStart(90)"
			}, {
				"text": "${gs.getMessage('Last 120 days')}",
				"id": "javascript:gs.daysAgoStart(120)"
			}, {
				"text": "${gs.getMessage('Current hour')}",
				"id": "javascript:gs.hoursAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last hour')}",
				"id": "javascript:gs.hoursAgoEnd(1)"
			}, {
				"text": "${gs.getMessage('Last 2 hours')}",
				"id": "javascript:gs.hoursAgo(2)"
			}, {
				"text": "${gs.getMessage('Current minute')}",
				"id": "javascript:gs.minutesAgoEnd(0)"
			}, {
				"text": "${gs.getMessage('Last minute')}",
				"id": "javascript:gs.minutesAgoStart(1)"
			}, {
				"text": "${gs.getMessage('Last 15 minutes')}",
				"id": "javascript:gs.minutesAgoStart(15)"
			}, {
				"text": "${gs.getMessage('Last 30 minutes')}",
				"id": "javascript:gs.minutesAgoStart(30)"
			}, {
				"text": "${gs.getMessage('Last 45 minutes')}",
				"id": "javascript:gs.minutesAgoStart(45)"
			}, {
				"text": "${gs.getMessage('One year ago')}",
				"id": "javascript:gs.monthsAgo(12)"
			}]
		};
		var uuid = "${jvar_uid}";
		var fields = JSON.parse($j("#" + uuid + " #interactive_date_filter_feilds").val());
		var fieldsSelect = $j("#" + uuid + " .fields-select");
		var canvasId = fieldsSelect.closest("[data-uuid]")? fieldsSelect.closest("[data-uuid]").attr("data-uuid") : "";
		var fromSelectBox = $j("#" + uuid + " .fromSelect");
		var toSelectBox = $j("#" + uuid + " .toSelect");
		var operatorSelectBox = $j("#" + uuid + " #filerTableSelect");
		var dashboardMessageHandler = new DashboardMessageHandler("select_custom_interactive-" + canvasId);
		var isInCanvas = typeof window.SNC !== "undefined" ? ( typeof window.SNC.canvas !== "undefined"  ? ( typeof window.SNC.canvas.isGridCanvasActive !== "undefined" ? ( typeof window.SNC.canvas.interactiveFilters !== "undefined") : false ): false ) : false ;
		if(isInCanvas) {
			SNC.canvas.eventbus.subscribe(canvasId , function(data) {
				if(data.action === "destroy")
					dashboardMessageHandler.removeFilter();
			})
		}
		operatorSelectBox.select2();
		fromSelectBox.select2({data: optionValues["ON_NOT_ON"]});
		toSelectBox.select2({data: optionValues["BETWEEN_TO"]});
		if(fields.length > 1) {
			fieldsSelect.select2({data: fields});
			fieldsSelect.select2("val", "all");
		} else {
			fieldsSelect.hide();
			fieldsSelect = $j("#" + uuid + " .fields-select-label");
			fieldsSelect.show();
			fieldsSelect.html(fields[0].text);
		}

		function handleChangeSelection() {
			if(fieldsSelect.val() === 'all') {
				$j("#" + uuid + " .filter-block").hide();
				dashboardMessageHandler.removeFilter();
			} else {
				$j("#" + uuid + " .filter-block").show();
				// To publish  filter
				var value = operatorSelectBox.val();
				var fieldSelected = fieldsSelect.val();
				if(fieldSelected === "") {
					fieldSelected = fields[0].id;
				}
				if(value === "ISEMPTY" || value === "ISNOTEMPTY" || value === "ANYTHING") {
					dashboardMessageHandler.publishFilter("${jvar_table}",fieldSelected + value);
				} else if(fromSelectBox.val() !== "") {
					if(value === "BETWEEN") {
						if(toSelectBox.val() !== "")
							dashboardMessageHandler.publishFilter("${jvar_table}",fieldSelected + value +fromSelectBox.val() + "@" + toSelectBox.val());
					} else if(value === "ON" || value === "NOTON") {
						dashboardMessageHandler.publishFilter("${jvar_table}",fieldSelected + value + fromSelectBox.val());
					} else if(value === "lt") {
						dashboardMessageHandler.publishFilter("${jvar_table}",fieldSelected + $j("#" + uuid + " #filerTableSelect > option[value='" + value + "']").attr("val") + fromSelectBox.val());
					} else if(value === "lteq") {
						dashboardMessageHandler.publishFilter("${jvar_table}",fieldSelected + $j("#" + uuid + " #filerTableSelect > option[value='" + value + "']").attr("val") + fromSelectBox.val());
					} else if(value === "gt") {
						dashboardMessageHandler.publishFilter("${jvar_table}",fieldSelected + $j("#" + uuid + " #filerTableSelect > option[value='" + value + "']").attr("val") + fromSelectBox.val());
					} else if(value === "gteq") {
						dashboardMessageHandler.publishFilter("${jvar_table}",fieldSelected + $j("#" + uuid + " #filerTableSelect > option[value='" + value + "']").attr("val") + fromSelectBox.val());
					}
				}
			}
		}
		fieldsSelect.change(handleChangeSelection);
		fromSelectBox.change(handleChangeSelection);
		toSelectBox.change(handleChangeSelection);
		$j("#" + uuid + "-toSelectDate")[0].onchange = function() {
			var optionDate = {"text": this.value, "id": "javascript:gs.dateGenerate('" + this.value + "','23:59:59')"};
			optionValues["BETWEEN_TO"].push(optionDate);
			toSelectBox.select2("val", optionValues["BETWEEN_TO"]);
			toSelectBox.select2("val", optionDate.id);
			handleChangeSelection();
		};
		// Chane handler for date calender widget
		$j("#" + uuid + "-fromSelectDate")[0].onchange = function() {
			var optionDate;
			var value = operatorSelectBox.val();
			var data;
			if(value === "BETWEEN") {
					optionDate = {"text": this.value, "id": "javascript:gs.dateGenerate('" + this.value + "','00:00:00')"};
					data = optionValues["BETWEEN_FROM"];
				} else if(value === "ON" || value === "NOTON") {
					optionDate = {"text": this.value, "id": this.value + "@javascript:gs.dateGenerate('" + this.value + "','start')@javascript:gs.dateGenerate('" + this.value + "','end"};
					data = optionValues["ON_NOT_ON"];
				} else if(value === "lt") {
					optionDate = {"text": this.value, "id": "javascript:gs.dateGenerate('" + this.value + "','00:00:00')"};
					data = optionValues["BEFORE"];
				} else if(value === "lteq") {
					optionDate = {"text": this.value, "id": "javascript:gs.dateGenerate('" + this.value + "','23:59:59')"};
					data = optionValues["AT_OR_BEFORE"];
				} else if(value === "gt") {
					optionDate = {"text": this.value, "id": "javascript:gs.dateGenerate('" + this.value + "','23:59:59')"};
					data = optionValues["AFTER"];
				} else if(value === "gteq") {
					optionDate = {"text": this.value, "id": "javascript:gs.dateGenerate('" + this.value + "','00:00:00')"};
					data = optionValues["AT_OR_AFTER"];
				}
			if(optionDate){
				data.push(optionDate);
				fromSelectBox.select2("val", data);
				fromSelectBox.select2("val", optionDate.id);
			}
			handleChangeSelection();
		};
		// Chane handler for operators
		operatorSelectBox.change(function() {
			var value = operatorSelectBox.val();
			if(value === "BETWEEN") {
				fromSelectBox.select2({data: optionValues["BETWEEN_FROM"]});
				toSelectBox.select2({data: optionValues["BETWEEN_TO"]});
				toSelectBox.val("");
				$j("#" + uuid + " [between-block]").show();
				$j("#" + uuid + " [other-block]").show();
			} else if(value === "ISEMPTY" || value === "ISNOTEMPTY" || value === "ANYTHING") {
				$j("#" + uuid + " [other-block]").hide();
				$j("#" + uuid + " [between-block]").hide();
				} else {
					$j("#" + uuid + " [between-block]").hide();
					$j("#" + uuid + " [other-block]").show();
					if(value === "ON" || value === "NOTON") {
						fromSelectBox.select2({data: []});
						setTimeout(
							function() {
								fromSelectBox.select2({data: optionValues["ON_NOT_ON"]});
							}, 100);
					} else if(value === "lt") {
						fromSelectBox.select2({data: optionValues["BEFORE"]});
					} else if(value === "lteq") {
						fromSelectBox.select2({data: optionValues["AT_OR_BEFORE"]});
					} else if(value === "gt") {
						fromSelectBox.select2({data: optionValues["AFTER"]});
					} else if(value === "gteq") {
						fromSelectBox.select2({data: optionValues["AT_OR_AFTER"]});
					}
			}
			fromSelectBox.val("");
			dashboardMessageHandler.removeFilter();
			handleChangeSelection();
		});
		setTimeout(handleChangeSelection,1000);
	})();
	</script>
</j:jelly>
