///////////////////
//
//    Client Script
//
////////////////////

function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }

   //Type appropriate comment here, and begin script below
	//Select the Field you want to get the information for
	var caller = g_form.getValue('v_yo_name');
	//Be sure to Modify the GlideAjax name below to match your Script Include name
	var ga = new GlideAjax('AptrisGetUser');
	//Be sure to Modify the function name below to match the one in your Script Include above
	ga.addParam('sysparm_name','getUser');
	//This is the Variable(s) above you will send to the GlideAjax call
	ga.addParam('sysparm_user_name',caller);
	//This will call the below Function to populate the data
	ga.getXML(theUser);
}

function theUser(response) {
	var answer = response.responseXML.documentElement.getAttribute("answer");
	//alert(answer);
	if (answer != '') {
		//This will set the value of the field
		g_form.setMandatory('v_yo_email', false);
		g_form.setReadOnly('v_yo_email', true);
		g_form.setValue('v_yo_email', answer);
	}
	else {
		//If the answer is blank, it will clear the field
		g_form.setReadOnly('v_yo_email',false);
		g_form.setMandatory('v_yo_email',true);
		g_form.setValue('v_yo_email', '');
	}

}


/////////////////
//
// Script include
//
////////////////

var AptrisGetUser = Class.create();
AptrisGetUser.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	getUser: function() {
		var theUser = this.getParameter('sysparm_user_name');
		var gr_user = new GlideRecord('sys_user');
		if (gr_user.get(theUser)){
			//This is the data you will return to your Catalog Client Script
			var useThis = gr_user.email;
			return useThis;
		}
	},
	type: 'AptrisGetUser'
});
