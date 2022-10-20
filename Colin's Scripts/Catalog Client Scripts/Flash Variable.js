//flash variable
function flashVar(v) {
    g_form.nameMap.map(function (rec) {
        if (rec.prettyName === v) {
            g_form.flash("ni.VE" + rec.realName, "#FFFACD", 0)
        }
    });
}
flashVar('server_decom_prepinfo');
