//javascript:gs.getUserID(); use this on the default variable to load user

function onChange(control, oldValue, newValue, isLoading) {
	var userObject = g_form.getReference('requester',setUserInfo);
}

function setUserInfo(userObject){
	g_form.setValue('requester_s_email', userObject.email);
}
