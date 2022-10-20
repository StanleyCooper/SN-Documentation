//validated numbers only
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue == '') {
        return;
    }
    var regexp = /^[0-9]*$/;
    g_form.hideFieldMsg(control, true);
    if (!regexp.test(newValue)) {
        g_form.showFieldMsg(control, 'Only numbers allowed', 'error');
        control.value = '';
    }
}
