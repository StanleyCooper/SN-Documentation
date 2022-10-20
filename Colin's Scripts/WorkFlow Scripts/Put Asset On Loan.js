var asset = current.variables.assigned_computer;
var user = current.variables.on_behalf_of;
var userBuilding = current.variables.loaner_location;
var userRoom = current.variables.loaner_room_number;

var assetUpdateGR = new GlideRecord('alm_hardware');
assetUpdateGR.addEncodedQuery('sys_id=' + asset);
assetUpdateGR.query();
if(assetUpdateGR.next()){
	assetUpdateGR.install_status = 1; //In use
	assetUpdateGR.substatus = ''; //would reccomend creating a substatus of On Loan
	assetUpdateGR.assigned_to = user;
	assetUpdateGR.location = userBuilding;
	assetUpdateGR.u_building = userRoom;
	assetUpdateGR.update();
}
