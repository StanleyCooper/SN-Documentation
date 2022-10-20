(function transformRow(source, target, map, log, isUpdate) {

	// Add your code here
	//Set the datacenter as the location populate dataCenterLocation to change the data center location set this to the sys_id once in Prod.
	var dataCenterLocation = "Fort Worth Data Center";
	target.setDisplayValue('location', dataCenterLocation);

	//devices to search for
	var devType = source.u_machine_type.toString().toUpperCase();


	//VMWare
	var vmVCenter = "VCENTER";
	var vmESX = 'ESX';

	//Arista
	var aristaNetworks = 'ARISTA';

	//Avaya
	var avayaCommunications = 'AVAYA';

	//Cisco
	var ciscoCatalyst = 'CATALYST';
	var ciscoC3560 = 'C3560';

	//DIGIBOARD
	var digiBoard = 'DIGIBOARD';

	//MATUSHITA
	var matsushita = 'MATSUSHITA';

	//APC NetBotz
	var netBotz = 'NETBOTZ';

	//Palo Alto
	var paloAlto = 'PALO';
	var pa500 = 'PA-500';

	//vormetric
	var vormetric = 'VORMETRIC';

	//Company SYS_ID in ServiceNow
	var vmSysId = '34459634dbafa3004c0064904b961963';
	var arista = '0cc5fab4dbefa3004c0064904b96195d';
	var avaya = 'f00e6ab0dbefa3004c0064904b961965';
	var cisco = '18e68e60db67a3004c0064904b961992';//found
	var digi = '770e6ab0dbefa3004c0064904b961968';//found
	var matsush = '4a1ee2f0dbefa3004c0064904b9619d0';
	var netb = 'af1ee2f0dbefa3004c0064904b96192f';//found
	var pal = '3d111ee4db67a3004c0064904b961955'; //found
	var vormet = '6eeef6f4dbefa3004c0064904b96196d'; //found


	//check ESX Server
	if(devType.indexOf(vmESX) !== -1){

		target.sys_class_name="cmdb_ci_esx_server";
		target.manufacturer = vmSysId;

	}

	//check vCenter
	if(devType.indexOf(vmVCenter) !== -1){

		target.sys_class_name="cmdb_ci_vcenter";
		target.manufacturer = vmSysId;

	}

	//check arista
	if(devType.indexOf(aristaNetworks) !== -1){

		target.sys_class_name="cmdb_ci";
		target.manufacturer = arista;

	}


	//check avaya
	if(devType.indexOf(avayaCommunications) !== -1){

		target.sys_class_name="cmdb_ci";
		target.manufacturer = avaya;

	}

	//check cisco
	if(devType.indexOf(ciscoCatalyst) !== -1 || devType.indexOf(ciscoC3560)){

		target.sys_class_name="cmdb_ci_ip_switch";
		target.manufacturer = cisco;
		target.model_id = source.u_machine_type;

	}

	//check digiBoard
	if(devType.indexOf(digiBoard) !== -1){

		target.sys_class_name="cmdb_ci";
		target.manufacturer = digi;

	}

		//check matsushita
		if(devType.indexOf(matsushita) !== -1){

			target.sys_class_name="cmdb_ci";
			target.manufacturer = matsush;

		}

		//check netBotz
		if(devType.indexOf(netBotz) !== -1){

			target.sys_class_name="cmdb_ci";
			target.manufacturer = netb;
			target.model_id = source.u_machine_type;

		}


		//check paloAlto
		if(devType.indexOf(paloAlto) !== -1 || devType.indexOf(pa500) !== -1){

			target.sys_class_name="cmdb_ci_ip_firewall";
			target.manufacturer = pal;
			target.model_id = source.u_machine_type;

		}

		//check arista
		if(devType.indexOf(vormetric) !== -1){

			target.sys_class_name="cmdb_ci";
			target.manufacturer = vormet;

		}





})(source, target, map, log, action==="update");
