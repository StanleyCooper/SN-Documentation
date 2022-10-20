/*

prod script

*/
//check to see if user doesn't have the HR Management role
if(!gs.hasRole('aptris_hr_management')){

	//check for access for each group
	if(!gs.hasRole("aptris_hr_service_support_aspen")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=30483c8cdbb9f30021c022d405961971'; //sn-hr-aspen-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_birch")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=d8dd30c81bf17700031da9ffbd4bcbae'; //sn-hr-birch-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_dogwood")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=3f32c100db3df30021c022d40596195e'; //sn-hr-dogwood-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_fir")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=fd2305c4db3df30021c022d4059619ae'; //sn-hr-fir-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_hickory")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=a8a381c81b357700031da9ffbd4bcbcf'; //sn-hr-hickory-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_juniper")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=16c209481b357700031da9ffbd4bcb30'; //sn-hr-juniper-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_pine")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=5428f80cdbb9f30021c022d405961964'; //sn-hr-pine-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_redwood")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=897b7c441bf17700031da9ffbd4bcb95'; //sn-hr-redwood-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_spruce")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=7c20c1cc1bf17700031da9ffbd4bcb02'; //sn-hr-spruce-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_sycamore")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=8974c508db3df30021c022d405961978'; //sn-hr-sycamore-service-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_staffrecruiter")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=7c38f0401bf17700031da9ffbd4bcb68'; //sn-hr-staffrecruiters
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_benefits")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=738f45cc1b757700031da9ffbd4bcb15'; //sn-isu-uhr-benefits-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_hr_classification")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=bfce050c1b757700031da9ffbd4bcbe7'; //sn-isu-uhr-classcomp-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_erlr_support")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=34acc1081b757700031da9ffbd4bcbca'; //sn-isu-uhr-erlr-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_fmla")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=abf2ff90db02770021c022d40596192e';//sn-isu-uhr-fmlaleave-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_hr_info_management")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=2f4e0104db7df30021c022d405961994'; //sn-isu-uhr-informationmanagement-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_hr_service_center")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=f71555c8db7df30021c022d4059619f0'; //sn-isu-uhr-servicecenter-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_talent_acquisition")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=84417bd81b8e3f40031da9ffbd4bcbe8'; //sn-isu-uhr-talentacquisition-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_workers_comp")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=85a31cdc1b8efb40031da9ffbd4bcb1f'; //sn-isu-uhr-workerscomp-support
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if (!gs.hasRole("aptris_hr_ameslab")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=e6541a83dbc6370009dd12303996191d'; //sn-hr-ameslab
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if (!gs.hasRole("aptris_hr_management")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=bef73404dbb9f30021c022d405961995'; //sn-hr-management
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if (!gs.hasRole("aptris_hr_management")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=4042543fdb023b0009dd123039961928'; //sn-isu-uhr-management
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

}




/*

VTB fix - DEV GROUPS

*/

if (current.getEncodedQuery().indexOf('sys_id=') != 0) {
		if(!gs.hasRole('aptris_hr_management')){

			//check for access for each group
			if(!gs.hasRole("aptris_hr_service_support_aspen")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=33287084dbb53700687046723996190b';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_birch")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=4fcdbc0cdbb53700914d894d0b961992';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_dogwood")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=af320500dbf53700914d894d0b9619b4';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_fir")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=39230140dbf5370068704672399619cd';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_hickory")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=c0a34540dbf537006870467239961953';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_juniper")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=86c28900dbf5370068704672399619d0';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_pine")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=88287808dbb53700914d894d0b961977';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_redwood")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=787bb0c8dbb53700914d894d0b9619d3';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_spruce")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=d310cd4cdbb5370068704672399619f7';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_service_support_sycamore")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=4574c180dbf53700914d894d0b96192a';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_hr_staffrecruiter")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=7e087408dbb53700914d894d0b9619c0';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_uhr_benefits")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=ef8f814cdbf537006870467239961979';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_uhr_hr_classification")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=a7ce8d88dbf53700914d894d0b9619ba';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_uhr_erlr_support")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=999c4d08dbf53700914d894d0b9619f9';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_uhr_fmla")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=e3e2b710db863300914d894d0b961991';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_uhr_hr_info_management")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=085e4588dbf53700914d894d0b961943';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_uhr_hr_service_center")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=40259100db393700914d894d0b961916';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_uhr_hr_talent_aquistion")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=1831f35cdbc633006870467239961982';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if(!gs.hasRole("aptris_uhr_workers_comp")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=78a318d4db06f7006870467239961923';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}

			if (!gs.hasRole("aptris_hr_management")) {
				var u = gs.getUserID();
				var str = 'assignment_group!=b6f7bc44dbb537006870467239961912';
				var qc = current.addEncodedQuery(str);
				gs.print("query restricted to user: " + u);
			}
		}
	}



  /*

  End Users see inc ***** DEV GROUPS

  */

  //check if inc is opened by user
if (!gs.hasRole("itil") && gs.isInteractive()) {
	var u = gs.getUserID();
	var qc = current.addQuery("caller_id", u).addOrCondition("opened_by", u).addOrCondition("watch_list", "CONTAINS", u).addOrCondition("u_reported_by", u);
	gs.print("query restricted to user: " + u);
}
//check to see if user doesn't have the HR Management role
else if(!gs.hasRole('aptris_hr_management')){

	//check for access for each group
	if(!gs.hasRole("aptris_hr_service_support_aspen")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=33287084dbb53700687046723996190b';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_birch")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=4fcdbc0cdbb53700914d894d0b961992';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_dogwood")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=af320500dbf53700914d894d0b9619b4';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_fir")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=39230140dbf5370068704672399619cd';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_hickory")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=c0a34540dbf537006870467239961953';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_juniper")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=86c28900dbf5370068704672399619d0';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_pine")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=88287808dbb53700914d894d0b961977';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_redwood")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=787bb0c8dbb53700914d894d0b9619d3';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_spruce")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=d310cd4cdbb5370068704672399619f7';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_service_support_sycamore")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=4574c180dbf53700914d894d0b96192a';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_hr_staffrecruiter")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=7e087408dbb53700914d894d0b9619c0';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_benefits")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=ef8f814cdbf537006870467239961979';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_hr_classification")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=a7ce8d88dbf53700914d894d0b9619ba';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_erlr_support")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=999c4d08dbf53700914d894d0b9619f9';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_fmla")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=e3e2b710db863300914d894d0b961991';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_hr_info_management")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=085e4588dbf53700914d894d0b961943';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_hr_service_center")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=40259100db393700914d894d0b961916';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_hr_talent_aquistion")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=1831f35cdbc633006870467239961982';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if(!gs.hasRole("aptris_uhr_workers_comp")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=78a318d4db06f7006870467239961923';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}

	if (!gs.hasRole("aptris_hr_management")) {
		var u = gs.getUserID();
		var str = 'assignment_group!=b6f7bc44dbb537006870467239961912';
		var qc = current.addEncodedQuery(str);
		gs.print("query restricted to user: " + u);
	}
}
