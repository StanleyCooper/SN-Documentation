/************************

plan is to clear the cmdb_ci_win_server table then on next import it will not bring in the "new" servers

*************************/
if (source.u_systemrole == "Workstation"){
	runIt();
	gs.log('Workstation found ' + source.u_name + ' with a manufacturer of ' + source.u_manufacturer + ' and is assigned to ' + source.u_username , 'Aptris SCCM');
	}

else {
	ignore = true;
	gs.log('Server found ' + source.u_name + ' with a manufacturer of ' + source.u_manufacturer + ' and is assigned to ' + source.u_username + ' and the source is ' + source.u_systemrole , 'Aptris SCCM');
	}

function runIt() {
	setMakeAndModel();
	determineClass();
	//setAssignedTo();
	setCorrelationID();
	}

// function setMakeAndModel() {
	//	  var mm = MakeAndModelJS.fromNames(source.u_manufacturer, source.u_model, "hardware");
	//    target.model_id = mm.getModelNameSysID();
	//    target.manufacturer = mm.getManufacturerSysID();
	// }   --See below

	function setMakeAndModel() {
		var manuf = source.u_manufacturer.toLowerCase();
		var mm = null;
		if (manuf !='lenovo') {
			mm = MakeAndModelJS.fromNames(source.u_manufacturer, source.u_model, "hardware");
		} else {
			// Lenovo stores Model Number as Version in SCCM
			mm = MakeAndModelJS.fromNames(source.u_manufacturer, source.u_versionnumber, "hardware");
		}
		target.manufacturer = mm.getManufacturerSysID();
		target.model_id = mm.getModelNameSysID();
	}

	function determineClass() {
		// Determine the class of the target CI
		if (source.u_systemrole == "Workstation")
			target.sys_class_name = "cmdb_ci_computer";
		else
			target.sys_class_name = "cmdb_ci_win_server";
	}

	function setAssignedTo() {
		var userName = source.u_username;
		if (JSUtil.nil(userName))
			return;

		var x = userName.indexOf("\\");
		if (x > -1)
			userName = userName.substring(x + 1);

		var nameField = gs.getProperty('glide.discovery.assigned_user_match_field', "user_name");
		target.assigned_to = GlideUser.getSysId(nameField, userName);
	}

	/* This function fixes the fact that when transforming a integer to a string field, it includes the commas
 	*  Also, this is the old style of setting the resource_id. The onAfter script sets it in the Object Source table.
 	*/
	function setCorrelationID() {
		target.correlation_id = source.u_resourceid + '';
	}

	
