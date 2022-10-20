function onChange(control, oldValue, newValue, isLoading){
	if (isLoading || newValue == '') {

		return;

	}
	if(newValue != ''){
		var reqDate = new Date(newValue);
		var today = new Date();

		if(reqDate.getTime() <= today.getTime()) {
		alert('The due date must be after Today');
		g_form.setValue('u_due_date','');
		}
	}
}
