//make variables read only
function onLoad() {
    try {
        //Get the 'Variables' section
        var ve = $('variable_map').up('table');
        //Disable all elements within with a class of 'cat_item_option'
        ve.select('.cat_item_option', '.slushselectmtm', '.questionsetreference').each(function (elmt) {
            elmt.disabled = true;
        });
        //Remove any reference or calendar icons
        ve.select('img[src*=reference_list.gifx]', 'img[src*=small_calendar.gifx]').each(function (img) {
            img.hide();
        });
        //Hide list collector icons
        ve.select('img[src*=arrow]').each(function (img) {
            img.up('table').hide();
        });
    } catch (e) {}
}
