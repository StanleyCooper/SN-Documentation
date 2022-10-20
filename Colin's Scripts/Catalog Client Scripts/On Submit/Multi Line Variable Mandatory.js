function onSubmit() {
	if(g_form.getValue('internal_name_of_variable_set') == '[]'){
		g_form.addErrorMessage('You must enter at least 1');
		return false;
	}
}
