//Lines 72 & 74 are commented out for testing. To enable hiding incidents unless the user viewing is a member of that group uncomment those lines.

var qc;
var u = gs.getUserID();

if (!gs.hasRole("itil")) {
	qc = current.addQuery("caller_id", u).addOrCondition("opened_by", u).addOrCondition("watch_list", "CONTAINS", u).addOrCondition("u_reported_by", u); //modify the current query so that if the user is listed in these fields, they can see the record
}
else if (current.getEncodedQuery().indexOf('sys_id=') != 0) {
	// the first control section is for the HR assignment groups
	// the array hrGroups contains two values for each entry; the role name and the assignment group (ag) name
	// for each row, the query is adjusted to hide the ag if you do not hold the role
	if(!gs.hasRole("aptris_hr_management")) {
		var hrGroups = [
		['aptris_hr_service_support_aspen','sn-hr-aspen-service-support'],
		['aptris_hr_service_support_birch','sn-hr-birch-service-support'],
		['aptris_hr_service_support_dogwood','sn-hr-dogwood-service-support'],
		['aptris_hr_service_support_fir','sn-hr-fir-service-support'],
		['aptris_hr_service_support_hickory','sn-hr-hickory-service-support'],
		['aptris_hr_service_support_juniper','sn-hr-juniper-service-support'],
		['aptris_hr_service_support_pine','sn-hr-pine-service-support'],
		['aptris_hr_service_support_redwood','sn-hr-redwood-service-support'],
		['aptris_hr_service_support_spruce','sn-hr-spruce-service-support'],
		['aptris_hr_service_support_sycamore','sn-hr-sycamore-service-support'],
		['aptris_hr_staffrecruiter','sn-hr-staffrecruiters'],
		['aptris_uhr_benefits','sn-isu-uhr-benefits-support'],
		['aptris_uhr_hr_classification','sn-isu-uhr-classcomp-support'],
		['aptris_uhr_erlr_support','sn-isu-uhr-erlr-support'],
		['aptris_uhr_fmla','sn-isu-uhr-fmlaleave-support'],
		['aptris_uhr_hr_info_management','sn-isu-uhr-informationmanagement-support'],
		['aptris_uhr_hr_service_center','sn-isu-uhr-servicecenter-support'],
		['aptris_uhr_talent_acquisition','sn-isu-uhr-talentacquisition-support'],
		['aptris_uhr_workers_comp','sn-isu-uhr-workerscomp-support'],
		['aptris_uhr_time_absence','sn-isu-uhr-time-absence-support'],
		['aptris_hr_ameslab','sn-hr-ameslab']
		];
		for (var i = 0; i<hrGroups.length; i++) {
			if(!gs.hasRole(hrGroups[i][0])) {
				current.addEncodedQuery('assignment_group.name!=' + hrGroups[i][1]);
			}
		}
	}
	if(!gs.hasRole("isu_dps_support")) {
		current.addEncodedQuery('assignment_group.name!=sn-dps-it-support');
		current.addEncodedQuery('assignment_group.name!=sn-dps-vehicle-support');
	}
	if(!gs.hasRole("isu_its_itsec_support")) {
		current.addEncodedQuery('assignment_group.name!=sn-its-itsec-support');
	}
	if(!gs.hasRole("isu_sthl_support")) {
		current.addEncodedQuery('assignment_group.name!=sn-isu-studenthealth-it-support');
	}
}

var myGroups = gs.getUser().getMyGroups();
var myGroupMembers = [];
var it = myGroups.iterator();

var gr = new GlideRecord("sys_user_grmember");
if (it.hasNext()){
    myGroup = it.next();
    var grps = gr.addQuery("group", myGroup);
}
while (it.hasNext()){
    myGroup = it.next();
    grps.addOrCondition("group", myGroup);
}
gr.query();
while (gr.next()) {
    myGroupMembers.push(gr.group.sys_id);
}

if (myGroupMembers.length > 0){
    //qc = qc + current.addQuery('u_watch_list_group',myGroupMembers[0]);
    for (var j=1; i < myGroupMembers.length; j++) {
        //qc.addOrCondition('u_watch_list_group', myGroupMembers[j]);
    }
}
