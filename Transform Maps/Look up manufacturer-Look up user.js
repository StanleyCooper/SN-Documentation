(function transformRow(source, target, map, log, isUpdate) {


	var manufact = source.u_manufacturer;
	var modelId = source.u_model;

	//look if manufacturer exists
	var manuGR = new GlideRecord ('core_company');
	manuGR.addEncodedQuery('name=' + manufact);
	manuGR.query();
	if(manuGR.next()){
		target.manufacturer = manuGR.sys_id;
	}
	else{
		var newManu = new GlideRecord ('core_company');
		newManu.initialize();
		newManu.name = source.u_manufacturer;

		target.manufacturer = newManu.name;

		newManu.insert();
	}

	var assignedTo = source.u_domain_user;

	//look up assigned to
	var assignedGR = new GlideRecord('sys_user');
	assignedGR.addEncodedQuery('user_nameSTARTSWITH' + assignedTo);
	assignedGR.query();
	if(assignedGR.next()){

		target.assigned_to = assignedGR.sys_id;

	}


	})(source, target, map, log, action==="update");
