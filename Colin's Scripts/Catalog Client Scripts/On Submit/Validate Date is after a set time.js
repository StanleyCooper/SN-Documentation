//Validate Date is after set time
function onSubmit() {
    var returnVal = false;
    //Type appropriate comment here, and begin script below
    //validate that the given field's date is at least or equal to the milleseconds to add.
    var field = 'project_deadline';
    var msToAdd = 1000 * 60 * 60 * 24 * 7;//ms * sec * minutes * hours * days//this is a week
    var errorMsg = 'This must be at least a week out.';
    /****************************************************/
    /*  You shouldn't have to modify anything below     */
    /****************************************************/
    var now = new Date();
    var givenDate = new Date(g_form.getValue(field));
    //forwhatever reason, at this point this returns 9/24 when you select 9/25
    //givenauthor: 'jace'
date:Mon Sep 24 2017 19:00:00 GMT-0500 (Central Daylight Time)[1506347252815]
    //when you select 9/25
    givenDate.setDate(projectDeadline.getDate() + 1);//so add a day
    givenDate.setHours(now.getHours());
    givenDate.setMinutes(now.getMinutes());
    givenDate.setSeconds(now.getSeconds());
    givenDate.setMilliseconds(now.getMilliseconds());
    //now returns;
    //givenauthor: 'jace'
date:Mon Sep 25 2017 08:47:32 GMT-0500 (Central Daylight Time)[1506347252815]
    var nextWeek = new Date();
        nextWeek.setTime(nextWeek.getTime() + msToAdd);
        //console.log('projectDeadline: ' + projectDeadline + '[' + projectDeadline.getTime() + ']');
        //console.log('weekAhead     : ' + weekAhead      + '[' + weekAhead.getTime()      + ']');
        var givenDateGreaterOrEqualToNextWeek = givenDate.getTime() >= nextWeek.getTime();
        //console.log('givenDateGreaterOrEqualToNextWeek: ' + givenDateGreaterOrEqualToNextWeek);
      if (givenDateGreaterOrEqualToNextWeek) {
          returnVal = true;
    } else {
      g_form.hideFieldMsg(field, true);
      g_form.showFieldMsg(field, errorMsg, 'error');
    }
    return returnVal;
}
