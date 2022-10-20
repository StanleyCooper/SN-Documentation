var importset_arr = [],
    sysuser_arr = [],
    inactive_arr = [],
    arrUtil = new ArrayUtil();


var importSet = import_set.number;

// Fill the importset_arr array with all User Sys_IDs from the Import Set that just completed.

var importSetRow = new GlideRecord('sys_import_set_row');
importSetRow.addQuery('sys_import_set.number', importSet);
importSetRow.query();
while (importSetRow.next()) {

    importset_arr.push(importSetRow.sys_target_sys_id.toString());

}

// Fill the sysuser_arr array with the sys_ids of all Active Employees and Contractors that are currently
// in the User (sys_user) table.
var user = new GlideRecord('sys_user');
user.addEncodedQuery('u_user_type=^active=true^name!=Richard Cheek');
user.query();
while (user.next()) {
    sysuser_arr.push(user.sys_id.toString());
}

// Compare the sysuser_arr with the importset_arr and return an array of users (sys_ids) that exist in
// the sysuser_arr but are not in the importset_arr. This result represents active employees and
// contractors who are in ServiceNow but do not have an Active Directory account.
inactive_arr = arrUtil.diff(sysuser_arr, importset_arr);


// For each user in the inactive_arr array, inactivate their ServiceNow users account (active=false)
for (var i = 0; i < inactive_arr.length; i++) {
    user = new GlideRecord('sys_user');
    if (user.get(inactive_arr[i])) {
        user.active = false;
        //user.u_comments = 'Deactivated during LDAP update ' + importSet + '. User not found in AD.';
        user.update();
    }
}


gs.log('LDAP User Import complete. ImportSet Number: ' + importSet + '\nAD User count: ' + importset_arr.length + '\nSys_User Count: ' + sysuser_arr.length + '\nInactive Count: ' + inactive_arr.length);
