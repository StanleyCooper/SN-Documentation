/////////////////////////////
//
//
//   onLoad Client script
//
//  This is in a scoped app, remove the prefix to glide ajax name in line 22 and global in line 64
//
//
////////////////////////////

function onLoad() {

	//Use the 'getParameterValue' function below to get the parameter values from the URL
	//https://wesleyanedudev.service-now.com/sp?id=sc_cat_item&sys_id=87fadfa1db32e340b81b1be3159619b0&sysparm_category=619d9ff0db8fe700b81b1be3159619b0&sysparm_resource=TestResource&sysparm_caller=aloder
	var resource = getParameterValue('sysparm_resource');
	var caller = getParameterValue('sysparm_caller');
	if (resource) {
		g_form.setValue('how_accessed', resource);
	}

	if(caller){
		var ga = new GlideAjax('x_wesun_library_su.AptrisGetUser');
		ga.addParam('sysparm_name','getUser');
		ga.addParam('sysparm_user_name',caller);
		ga.getXML(theUser);
	}
}

function getParameterValue(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(top.location);
	if (results == null) {
		return "";
	} else {
		return unescape(results[1]);
	}
}

function theUser(response) {
	var answer = response.responseXML.documentElement.getAttribute("answer");
	//alert(answer);
	if (answer != '') {
		//This will set the value of the field
		g_form.setValue('caller', answer);
	}


}



/////////////////////////////
//
//
//   Script Inlcude
//
//
/////////////////////////////


var AptrisGetUser = Class.create();
AptrisGetUser.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
	getUser: function() {

		var encodedQuery = 'user_name=';
		var theUser = this.getParameter('sysparm_user_name');
		encodedQuery = encodedQuery + theUser;
		var gr_user = new GlideRecord('sys_user');
		gr_user.addEncodedQuery(encodedQuery);
		gr_user.query();
		if (gr_user.next()){
			//This is the data you will return to your Catalog Client Script
			var useThis = gr_user.sys_id;
			return useThis;
		}
	},
	type: 'AptrisGetUser'
});
