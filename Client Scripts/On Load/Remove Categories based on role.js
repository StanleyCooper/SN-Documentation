function onLoad() {

	var isHRUser = g_user.hasRole('aptris_hr_user');
	var isITIL = g_user.hasRole('itil');
	if(!g_user.hasRole('admin')){
		if (!isHRUser && isITIL){
			g_form.removeOption('category', 'hr');
			g_form.removeOption('close_code', 'referred_university_counsel');
			g_form.removeOption('close_code', 'referred_equal_opportunity');
			g_form.removeOption('close_code', 'referred_ombuds');
			g_form.removeOption('close_code', 'referred_payroll');
			g_form.removeOption('close_code', 'referred_finance_isd');
			g_form.removeOption('close_code', 'referred_graduate_college');
			g_form.removeOption('close_code', 'referred_board_of_regents');
			g_form.removeOption('close_code', 'referred_other');
			g_form.removeOption('close_code', 'resolved_no_action');
			g_form.removeOption('close_code', 'resolved_employee_action');
			g_form.removeOption('close_code', 'resolved_policy_procedure');
			g_form.removeOption('close_code', 'resolved_wdt_employee_action');
			g_form.removeOption('close_code', 'resolved_wdt_requisition');
			g_form.removeOption('close_code', 'resolved_wdt_system');
			g_form.removeOption('close_code', 'resolved_board_of_regents');
			g_form.removeOption('close_code', 'resolved_other');
		}
		if (isHRUser && isITIL){
			g_form.removeOption('category', 'software');
			g_form.removeOption('category', 'network');
			g_form.removeOption('category', 'inquiry');
			g_form.removeOption('category', 'hardware');
			g_form.removeOption('close_code', 'Password Reset');
			g_form.removeOption('close_code', 'Locked Account');
			g_form.removeOption('close_code', 'Access Issues');
			g_form.removeOption('close_code', 'Help/Training');
			g_form.removeOption('close_code', 'System Issue: Provided Work-around');
			g_form.removeOption('close_code', 'System Issue: Solved');
			g_form.removeOption('close_code', 'System Issue: Waiting for Change');
			g_form.removeOption('close_code', 'System Update');
			g_form.removeOption('close_code', 'Replaced Parts');
			g_form.removeOption('close_code', 'Proxy Access Issue');
			g_form.removeOption('close_code', 'Vendor Shutdown');
			g_form.removeOption('close_code', 'Refund');
			g_form.removeOption('close_code', 'Other');
		}
	}
}
