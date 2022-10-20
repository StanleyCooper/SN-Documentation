//Client Script

function onChange(control, oldValue, newValue, isLoading)
{
	if(isLoading)

	{

		return;

	}

	//start the validation


	if(newValue != '')

	{
		var ga = new GlideAjax('ConfirmDate');
		ga.addParam('sysparm_name', 'chkCurrDate');
		ga.addParam('sysparm_date',g_form.getValue('loaner_pickup_date'));
		ga.getXML(NewParse);
	}
	function NewParse(response){
		var answer = response.responseXML.documentElement.getAttribute("answer");
		if(answer == 'false'){
			alert("Please select a date of today or later.");
			g_form.setValue('loaner_pickup_date', ''); // Setting the variable as empty
		}}}


//Script Include - client callable
var ConfirmDate= Class.create();
ConfirmDate.prototype = Object.extendsObject(AbstractAjaxProcessor, {
chkCurrDate : function() {

var start = this.getParameter('sysparm_date');
var currDay = gs.now();
if(start < currDay){
return false;
}
else
{ return true; } } });
