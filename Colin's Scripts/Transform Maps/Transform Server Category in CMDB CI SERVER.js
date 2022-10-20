(function transformRow(source, target, map, log, isUpdate) {

	// Add your code here
	//import these CI's into the cmdb_ci_server table. Limitations are that any fields availble on the child table cannot be populated without separate data imports onto those tables.
	var devType = source.u_server_type.toString().toUpperCase();

	if (devType == "WINDOWS SERVER"){
		target.sys_class_name="cmdb_ci_win_server";
	}

	else if (devType == "UNIX SERVER"){
		target.sys_class_name="cmdb_ci_unix_server";

	}
	else if (devType == "LINUX SERVER"){
		target.sys_class_name="cmdb_ci_linux_server";

	}
	else if (devType == "AIX SERVER"){
		target.sys_class_name="cmdb_ci_aix_server";

	}

})(source, target, map, log, action==="update");
