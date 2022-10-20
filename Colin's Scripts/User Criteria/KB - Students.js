studentCheck();
function studentCheck(){
    var user = new GlideRecord('sys_user');
    user.get(user_id);
    if (user.u_student == true) {
        answer = true;
    } else {
        answer = false;
    }
}
