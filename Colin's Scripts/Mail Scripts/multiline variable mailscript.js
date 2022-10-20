(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
/* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
/* Optional GlideRecord */ event) {

	// Add your code here
	//mrvs is the mult-row variable set's internal name here
	var variableArray = JSON.parse(current.variables.people_moving_item);
	for(var i=0; i < variableArray.length; i++) {

		var count = i + 1;

		template.print('User ' + count.toString() + '<br>');

		var userName;
		var gr = new GlideRecord("sys_user");
		gr.addEncodedQuery('sys_id=' + variableArray[i].name_item);
		gr.query();
		if (gr.next()) {
			userName = gr.name;
		}

		var fromBuildingGR = new GlideRecord('cmn_location');
		fromBuildingGR.get('sys_id',variableArray[i].moving_from_building_item);

		var fromRoomGR = new GlideRecord('cmn_building');
		fromRoomGR.get('sys_id',variableArray[i].moving_from_room_item);

		var toBuildingGR =  new GlideRecord('cmn_location');
		toBuildingGR.get('sys_id',variableArray[i].moving_to_building_item);

		var toRoomGR = new GlideRecord('cmn_building');
		toRoomGR.get('sys_id',variableArray[i].moving_to_room_item);

		template.print("Name:" + userName + '<br>');
		template.print("Phone:" + variableArray[i].phone_item + '<br>');
		template.print("Moving FROM Building: " + fromBuildingGR.name + ' Room: ' + fromRoomGR.name + '<br>');
		template.print("Moving TO Building: " + toBuildingGR.name + ' Room: ' + toRoomGR.name + '<br><br>');
	}


})(current, template, email, email_action, event);
