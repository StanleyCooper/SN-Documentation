(function transformRow(source, target, map, log, isUpdate) {

	// Add your code here
	//Set the datacenter as the location populate dataCenterLocation to change the data center location set this to the sys_id once in Prod.
	var dataCenterLocation = "Fort Worth Data Center";
	target.setDisplayValue('location', dataCenterLocation);

	//devices to search for
	var devType = source.u_machine_type.toString().toUpperCase();

	//switches
	var switchCatalyst = "CATALYST";
	var switchMDS = 'CISCO MDS';

	//accesspoints
	var apSearch = 'AP8';

	//routers
	var rout1941 = '1941';
	var rout2811 = '2811';
	var rout3925 = '3925';
	var routASR = 'ASR';
	var routISR = 'ISR';
	var palo = 'PA';


	//check switches
	if(devType.indexOf(switchMDS) !== -1 || devType.indexOf(switchCatalyst) !== -1){
		gs.log('The device is a switch and the index of the string is ' + devType.indexOf(switchMDS));
		target.sys_class_name="cmdb_ci_ip_switch";
		target.device_type = 'Switch';
	}

	//check APs
	if(devType.indexOf(apSearch) !== -1){
		gs.log('The device is an AP and the index of the string is ' + devType.indexOf(apSearch));
		target.sys_class_name="cmdb_ci_netgear";
		target.device_type = 'AP';
	}

	//check routers;
	if(devType.indexOf(rout1941) !== -1 || devType.indexOf(rout2811) !== -1 || devType.indexOf(rout3925) !== -1 || devType.indexOf(routASR) !== -1 || devType.indexOf(routISR) !== -1){
		gs.log('The device is an Router and the index of the string is ' + devType.indexOf(apSearch));
		target.sys_class_name="cmdb_ci_ip_router";
		target.device_type = 'Router';

	}

	//check Firewall
	if(devType.indexOf(palo) !== -1){
		gs.log('The device is an Firewall and the index of the string is ' + devType.indexOf(palo));
		target.sys_class_name="cmdb_ci_ip_firewall";

	}


})(source, target, map, log, action==="update");
