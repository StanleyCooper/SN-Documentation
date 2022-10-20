//Client Script - on onChange
function onChange(control, oldValue, newValue, isLoading) {
   	//Type appropriate comment here, and begin script below
	var ga = new GlideAjax('POUser');
	ga.addParam('sysparm_name', 'getUserInfo');
	ga.addParam('sysparm_user_id', g_form.getValue('requestor_name'));
	ga.getXML(updateFields);

   //Type appropriate comment here, and begin script below

}

function updateFields(response) {
	var answer = response.responseXML.documentElement.getAttribute("answer");
	var aObj = JSON.parse(answer);

	g_form.setValue('requestor_s_email', aObj.po_title);
	g_form.setValue('requestor_s_phone', aObj.po_phone);
	g_form.setValue('department', aObj.po_dept.sys_id, aObj.po_dept.display_value);

}

//Script Include
var POUser = Class.create();
POUser.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getUserInfo : function() {

		var userId = this.getParameter('sysparm_user_id');
		var u = new GlideRecord('sys_user');
		gs.log('userId=' + userId);
		var uObj = {};
		if (u.get(userId)) {
			gs.log('user='+user.name+' title=' + u.title + ' phone=' + u.phone + ' u.dept='+u.department.getDisplayValue());
			uObj = {
					"po_title" : u.getValue('email'),
					"po_phone" : u.getValue('phone'),
					"po_dept" : {
						"sys_id" : u.getValue('department'),
						"display_value" : u.department.getDisplayValue()
					}
			};
		}

		var answer = JSON.stringify(uObj);
		gs.log('answer=' + answer);
		return answer;
	},
	type: 'POUser'
});
