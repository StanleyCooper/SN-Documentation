var fields = g_form.getEditableFields();
alert(fields);
for (var x = 0; x < fields.length; x++) {
    g_form.setReadOnly(fields[x], true);
}
