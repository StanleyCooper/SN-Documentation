var classroomQuery = current.variables.classroom_check_query;

if(classroomQuery == 'cdw.classroomcheck.weekone'){
	current.short_description = 'Classroom Check for Wasserstein Basement, 1st Floor, 2nd Floor.';
	current.description = 'Classroom Check for Wasserstein Basement, 1st Floor, 2nd Floor.';
}

if(classroomQuery == 'cdw.classroomcheck.weektwo'){
	current.short_description = 'Classroom Check for Wasserstein 3rd Floor, 4th Floor.';
	current.description = 'Classroom Check for Wasserstein 3rd Floor, 4th Floor.';
}

if(classroomQuery == 'cdw.classroomcheck.weekthree'){
	current.short_description = 'Classroom Check for Wasserstein 5th Floor, Hauser.';
	current.description = 'Classroom Check for Wasserstein 5th Floor, Hauser.';
}

if(classroomQuery == 'cdw.classroomcheck.weekfour'){
	current.short_description = 'Classroom Check for Pound, Langdell, Areeda, Austin.';
	current.description = 'Classroom Check for Pound, Langdell, Areeda, Austin.';
}

var rooms = [{
	//building,
	//room
}];

var query = gs.getProperty(classroomQuery);

var roomGR = new GlideRecord('sys_user');
roomGR.addEncodedQuery(query);
roomGR.query();
while(roomGR.next()){
	rooms.push({
		//building: roomGR.location.name.toString(),
		room: roomGR.name.toString()
	});
}

for(var i = 1; i < rooms.length; i++){
	var classroomINCGR = new GlideRecord('sc_task');
	classroomINCGR.initialize();
// 	classroomINCGR.setWorkflow(false);
// 	classroomINCGR.autoSysFields(false);
	//classroomINCGR.caller_id = ;
	classroomINCGR.request = current.request;
	classroomINCGR.request_item = current.sys_id;
	classroomINCGR.requested_for = rooms[i].room;
	classroomINCGR.assignment_group = gs.getProperty('cdw.classroomcheck.supportgroup');
	classroomINCGR.short_description = rooms[i].room + ' - Classroom Technology Check';
	classroomINCGR.description = rooms[i].room + ' - Classroom Technology Check';
	classroomINCGR.insert();

}
