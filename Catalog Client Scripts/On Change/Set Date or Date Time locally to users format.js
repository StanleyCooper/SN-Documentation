//This is not really documented ,but here ya go;

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading || newValue === '') {
		return;
	}

	var today = new Date();
	g_form.setValue('date_raised_with_vendor', formatDate(today, g_user_date_format));
	g_form.setValue('date_time_raised_with_vendor', formatDate(today, g_user_date_time_format));
}

// Where is 'formatDate' defined?
// Well, let me show you;
// It is only available on UI16, and may need to be ported over but until then it's loaded from `calendar.js`
// https://hi.service-now.com/scripts/calendar.js
