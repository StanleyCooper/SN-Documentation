//Script include - client callable
var AjaxDurCalc = Class.create();
AjaxDurCalc.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	durCalc: function() {

		return gs.dateDiff(this.getParameter('sysparm_strt'),this.getParameter('sysparm_end'), false);

	}

});

//onSubmit Client Script
function onSubmit() {
	//Type appropriate comment here, and begin script below
	var strt = g_form.getValue('loaner_pickup_date');
	var end = g_form.getValue('loaner_return_date');


	var ajax = new GlideAjax('AjaxDurCalc');
	ajax.addParam('sysparm_name','durCalc');
	ajax.addParam('sysparm_strt',strt);
	ajax.addParam('sysparm_end',end);
	ajax.getXMLWait();

	var answer = ajax.getAnswer();

	if(answer.toString().split(' ')[0] > 13){

		alert('Please select a date range that is less that two weeks.');
		return false;
	}
}
