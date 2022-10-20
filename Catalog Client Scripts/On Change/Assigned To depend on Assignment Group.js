function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}

	//Type appropriate comment here, and begin script below
	var assignGroup = g_form.getValue('u_assignment_group');
	//alert(rUser);

	//alert(name);
	var ga = new GlideAjax('BackfillAssignmentGroup');
	ga.addParam('sysparm_name','getAuth');
	ga.addParam('sysparm_u_assignGroup', assignGroup);
	ga.getXMLAnswer(updateAuth);

	function updateAuth(response) {

		var answer = JSON.parse(response);
		//var answer = response.responseXML.documentElement.getAttribute("answer");
		//g_form.addInfoMessage(answer); //JSON String

		//answer = answer.evalJSON(); //Transform the JSON string to an object
		g_form.addInfoMessage(answer.var1);

		try{

			g_form.addInfoMessage('Try Loop');
			var myListCollector = g_list.get('u_assigned_to');
			myListCollector.reset();
			myListCollector.setQuery(answer.var1);
		}
		//Revert to Service Catalog method
		catch(e){
			//Find and hide the filter header elements (optional)
			//Simple method for items with only one list collector
			//$('ep').select('.row')[0].hide();
			//Advanced method for items with more than one list collector (more prone to upgrade failure)
			//var el = $('container_' + g_form.getControl(collectorName).id).select('div.row')[0].hide();

			//Reset the filter query
				g_form.addErrorMessage('Catch loop');
			window[u_assigned_to + 'g_filter'].reset();
			window[u_assigned_to + 'g_filter'].setQuery(answer.var1);
			window[u_assigned_to + 'acRequest'](null);
		}



	}
}
