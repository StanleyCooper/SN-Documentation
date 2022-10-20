var gdt = new GlideDateTime();
var query;

if(gdt.getDayOfMonth() <=7){
	query = gs.getProperty('cdw.classroomcheck.weekone');
	gs.log('Its first Monday!');
}
if(gdt.getDayOfMonth() > 7 && gdt.getDayOfMonth() <=14){
	query = gs.getProperty('cdw.classroomcheck.weektwo');
	gs.log('Its second Monday!');
}
if(gdt.getDayOfMonth() > 14 && gdt.getDayOfMonth() <=21){
	query = gs.getProperty('cdw.classroomcheck.weekthree');
	gs.log('Its third Monday!');
}
if(gdt.getDayOfMonth() > 21 && gdt.getDayOfMonth() <=28){
	query = gs.getProperty('cdw.classroomcheck.weekfour');
	gs.log('Its fourth Monday!');
}

//build an array of rooms Week 1
var rooms = [{
	//building,
	//room
}];

if(query.length > 0){
	var roomGR = new GlideRecord('cmn_building');
	//Building is Wasserstein Hall and Floors 0,1,2
	roomGR.addEncodedQuery(query);
	roomGR.query();
	while(roomGR.next()){
		rooms.push({
			building: roomGR.location.name.toString(),
			room: roomGR.name.toString()
		});
	}

	for(var i = 1; i < rooms.length; i++){
		gs.log(i + ' ' + rooms[i].building + ' ' + rooms[i].room);
		var classroomINCGR = new GlideRecord('incident');
		classroomINCGR.initialize();
		//classroomINCGR.caller_id = ;
		classroomINCGR.category = 'hardware';
		classroomINCGR.subcategory = 'AV';
		classroomINCGR.impact = 3;
		classroomINCGR.assignment_group = gs.getProperty('cdw.classroomcheck.supportgroup');
		classroomINCGR.short_description = 'Basic Classroom Check for ' + rooms[i].building + ' ' + rooms[i].room + '.';
		classroomINCGR.insert();
	}
}

//

var gdt = new GlideDateTime();
var queryOne = '';
var queryTwo = '';

if(gdt.getDayOfMonth() <=7){
	queryOne = 'cdw.classroomcheck.weekone';
	queryTwo = 'cdw.classroomcheck.weekthree';
}
if(gdt.getDayOfMonth() > 7 && gdt.getDayOfMonth() <=14){
	queryOne = 'cdw.classroomcheck.weektwo';
	queryTwo = 'cdw.classroomcheck.weekfour';
}
if(gdt.getDayOfMonth() > 14 && gdt.getDayOfMonth() <=21){
	queryOne = 'cdw.classroomcheck.weekthree';
	queryTwo = 'cdw.classroomcheck.weekone';
}
if(gdt.getDayOfMonth() > 21 && gdt.getDayOfMonth() <=28){
	queryOne = 'cdw.classroomcheck.weekfour';
	queryTwo = 'cdw.classroomcheck.weektwo';
}

if(queryOne != ''){
	var cartId = GlideGuid.generate(null);
	var cart = new Cart(cartId);
	var item = cart.addItem(gs.getProperty('cdw.classroomcheck.item'));
	cart.setVariable(item, 'classroom_check_query', queryOne);
	var rc = cart.placeOrder();
	gs.info(rc.number);
}


if(queryTwo != ''){
	var cartId = GlideGuid.generate(null);
	var cart = new Cart(cartId);
	var item = cart.addItem(gs.getProperty('cdw.classroomcheck.item'));
	cart.setVariable(item, 'classroom_check_query', queryTwo);
	var rc = cart.placeOrder();
	gs.info(rc.number);
}
