function onSubmit() {

	if(g_form.getValue('its_software_request_selection_install') == 'none' && g_form.getValue('its_software_request_selection_quote') == 'none' && g_form.getValue('its_software_request_selection_quote_other') == ''){
		alert('You must select to have software installed or request a quote for new software prior to submission.');
		return false;
	}
	else{
		return true;
	}
}
