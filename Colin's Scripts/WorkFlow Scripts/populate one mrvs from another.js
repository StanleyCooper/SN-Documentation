var variableArray = JSON.parse(current.variables.people_moving_item);
for(var i=0; i < variableArray.length; i++) {

	var newRow = current.variables.people_moving_ritm.addRow();
	//set the value using row.<var_name> = value
	newRow.name = variableArray[i].name_item;
	newRow.phone = variableArray[i].phone_item;
	newRow.moving_from_building_room = variableArray[i].moving_from_building_item;
	newRow.moving_from_room = variableArray[i].moving_from_room_item;
	newRow.moving_to_building_room = variableArray[i].moving_to_building_item;
	newRow.moving_to_room = variableArray[i].moving_to_room_item;

}
