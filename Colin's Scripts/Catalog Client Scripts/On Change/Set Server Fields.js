//ser server fields
function onChange(control, oldValue, newValue, isLoading) {
    try {
        g_form.clearValue('server_ip');
        g_form.clearValue('environment');
        g_form.getReference('server', function(server){
            g_form.setValue('server_ip', server.ip_address);
            g_form.setValue('environment', server.u_env_list);
        });
    } catch(error) {
        console.log(error);
    }
}
