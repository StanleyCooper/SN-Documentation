facStaffCheck();
function facStaffCheck(){
    var user = new GlideRecord('sys_user');
    user.get(user_id);
    if (user.u_hmsprimaryrole.toString() == 'FACULTY' || user.u_hmsprimaryrole.toString() == 'STAFF') {
        answer = true;
    } else {
        answer = false;
    }
}
