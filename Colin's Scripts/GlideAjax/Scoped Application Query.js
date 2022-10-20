///////////////////////////////
//
//
//   client scripts
//
//
//////////////////////////////
function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {

		return;
	}

	var ga = new GlideAjax('getDepartmentInfo');
	ga.addParam('sysparm_name', 'getDept');
	ga.addParam('sysparm_deptid', g_form.getValue("department"));
	ga.getXML(updateDept);

}



function updateDept(response) {

	var answer = response.responseXML.documentElement.getAttribute("answer");
	answer = JSON.parse(answer);

	var dept = answer.name.toLowerCase();

	if(dept == 'it'){
		g_form.addInfoMessage('Department is IT');
	}
	else if (dept == 'sourcing' || dept == 'business development' || dept.indexOf('sale') != -1){
		g_form.addInfoMessage("Department isn't IT");
	}
	else{
		g_form.addInfoMessage('Department is none');
	}


}


////////////////////////////////
//
//
// Script Include
//
//
///////////////////////////////
var getDepartmentInfo = Class.create();
getDepartmentInfo.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
	getDept: function () {

		//get department ID sys_ID
		var deptid = this.getParameter('sysparm_deptid').toString();

		//build query
		var encodedQuery = 'sys_id=';
		encodedQuery = encodedQuery + deptid;

		//create result object
 		var resultObject = {};

		//query for the department
		var dept = new GlideRecord('cmn_department');
		dept.addEncodedQuery(encodedQuery);
		dept.query();
		if(dept.next()){

			//populate array
			resultObject.sys_id = dept.sys_id.toString();
			resultObject.name = dept.name.toString();

			//pass array as JSON
			var json = new global.JSON();
			var data = json.encode(resultObject);

			return data;
		}


	},

	type: 'getDepartmentInfo'

});
