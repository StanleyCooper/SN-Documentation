var gr = new GlideRecord("sys_user");
gr.query();
while (gr.next()) {

    var role = new GlideRecord('sys_user_has_role')
    role.addQuery('user', gr.sys_id);
    role.addQuery('role', '<sys_id of the role>');
    role.query();
    if (!role.next()){

        role.initialize();
        role.user = gr.sys_id;
        role.role = "<sys_id of the role>";
        role.insert();
    }
}
