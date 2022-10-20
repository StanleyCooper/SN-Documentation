var gr = new GlideRecord('sys_user');
gr.initialize();
gr.user_name = 'Admin Jae';
gr.name = 'Admin Jae';
gr.email = 'jae.delaney@cdw.com';
gr.manager = '93ee1d27dba167803e2af2713996196e' //Anne Rookey
gr.user_password.setDisplayValue('Harvard2020!');
gr.password_needs_reset = true;
gr.insert();

var recAdmin = new GlideRecord('sys_user_grmember');
recAdmin.initialize();
recAdmin.user = gr.sys_id;
recAdmin.group = 'b3a68e646fb34100990d57ee2c3ee4f9'; //Admins Group
recAdmin.insert();

var recIT = new GlideRecord('sys_user_grmember');
recIT.initialize();
recIT.user = gr.sys_id;
recIT.group = '1ac6aa086f956100d531cd364b3ee4ea'; //SN IT Service managemment
recIT.insert();

var gr1 = new GlideRecord('sys_user');
gr1.initialize();
gr1.user_name = 'Admin Sam';
gr1.name = 'Admin Sam';
gr1.email = 'sam.mackenzie@cdw.com';
gr1.manager = '93ee1d27dba167803e2af2713996196e' //Anne Rookey
gr1.user_password.setDisplayValue('Harvard2020!');
gr1.password_needs_reset = true;
gr1.insert();

var recAdmin1 = new GlideRecord('sys_user_grmember');
recAdmin1.initialize();
recAdmin1.user = gr1.sys_id;
recAdmin1.group = 'b3a68e646fb34100990d57ee2c3ee4f9'; //Admins Group
recAdmin1.insert();

var recIT1 = new GlideRecord('sys_user_grmember');
recIT1.initialize();
recIT1.user = gr1.sys_id;
recIT1.group = '1ac6aa086f956100d531cd364b3ee4ea'; //SN IT Service managemment
recIT1.insert();


////// Testing PW RESET PROCESS

var gr = new GlideRecord('sys_user');
gr.initialize();
gr.user_name = 'JS54';
gr.u_samaccountname = 'JS54';
gr.first_name = 'Jane';
gr.last_name = 'Smith';
gr.u_hmspersonkey = '646464'
gr.u_hmsdatasource = 'GUEST';
//gr.manager = '93ee1d27dba167803e2af2713996196e' //Anne Rookey
gr.user_password.setDisplayValue('Harvard2020!');
gr.password_needs_reset = true;
gr.insert();
