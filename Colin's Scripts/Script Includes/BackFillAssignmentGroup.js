var BackfillAssignmentGroup = Class.create();
BackfillAssignmentGroup.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getAuth: function() {


		var userArray = [];

		//gs.addInfoMessage('GetUserDataR25CatalogClientScripts ran');
		var userGrp  = this.getParameter('sysparm_u_assignGroup');
		//gs.addInfoMessage(user);
		//group=d3565a90db5c4f00e0b370e21f9619a1
		var encodedQuery = 'group=' + userGrp;
		var gr = new GlideRecord('sys_user_grmember');
		gr.addEncodedQuery(encodedQuery);
		gr.query();
		while (gr.next()) {

			//gs.addInfoMessage('Group Found ' + gr.group);
			userArray.push(gr.user.sys_id.toString());


		}

		//gs.addInfoMessage(hosts);
		//gs.addInfoMessage('User array is ' + userArray);
		var strQuery = 'sys_idIN' + userArray;
		//gs.addInfoMessage(strQuery);
		var obj = {};

			obj.var1 = strQuery;



			/*var json = new JSON();
			var data = json.encode(obj);//JSON formatted string*/

			return JSON.stringify(obj);

		},

		type: 'BackfillAssignmentGroup'
	});
	
