// //check if inc is opened by user
// if (!gs.hasRole("itil") && gs.isInteractive()) {
//   var u = gs.getUserID();
//   var qc = current.addQuery("caller_id", u).addOrCondition("opened_by", u).addOrCondition("watch_list", "CONTAINS", u).addOrCondition("u_reported_by", u);
//   gs.print("query restricted to user: " + u);
// }
//check to see if user doesn't have the HR Management role
if(!gs.hasRole('aptris_fin_management')){

	//check for access for each group
	if(!gs.hasRole("aptris_fin_service_support_aspen")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=c88ba17cdb4a7300914d894d0b961969';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_birch")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=aa0082bcdb8a7300914d894d0b96193b';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_dogwood")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=5b254ab0dbca7300914d894d0b961993';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_fir")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=6c578634dbca7300914d894d0b9619d1';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_hickory")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=e13ca97cdb4a7300914d894d0b96192d';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_juniper")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=51ddb53cdb8a7300914d894d0b96193b';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_pine")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=87230eb0db42b300687046723996196b';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_redwood")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=33ab4238dbca7300914d894d0b961923';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_spruce")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=a284c2b0dbca7300914d894d0b9619d4';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_service_support_sycamore")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=cddef1bcdb02b30068704672399619a5';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_athletics")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=13d9213cdb4a7300914d894d0b961919';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_fin_ames_lab")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=839e31bcdb02b3006870467239961964';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if (!gs.hasRole("aptris_fin_management")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=83ea59fcdb0a7300914d894d0b961995';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}
}
