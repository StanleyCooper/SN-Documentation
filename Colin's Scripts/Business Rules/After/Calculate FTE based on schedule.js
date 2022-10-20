(function executeRule(current, previous /*null when async*/ ) {


    //set month GDT
    var monthGDT = new GlideDateTime();
    monthGDT.setDisplayValue(current.month_starts_on);

    var month = monthGDT.getMonth();
    var year = monthGDT.getYearLocalTime();

    //Get First Day of Month
    var firstOfMonth = gs.beginningOfThisMonth(monthGDT);

    //Get first and last date of month
    var firstDay = new Date(year, month, 1).toISOString().replace(/T/, ' ').replace(/\..+/, '').toString();
    var lastDay = new Date(year, month + 1, 0).toISOString().replace(/T/, ' ').replace(/\..+/, '').toString();

    //set to GDT
    firstDay = new GlideDateTime(firstDay);
    lastDay = new GlideDateTime(lastDay);

    //calculate business duration
    var dc = new DurationCalculator();
    dc.setSchedule('faa5134bdbfd3a002382f7951d9619bf'); // Schedule sys_id and system time zone
    var dur = dc.calcScheduleDuration(firstDay, lastDay);

    var business_days = dur / (60 * 60 * 7);
    gs.addInfoMessage(business_days + 'business days')
    var gdt = new GlideDateTime(lastDay);
    var day_of_month = gdt.getDayOfWeekUTC();

    if (day_of_month < 6) {
        business_days += 1;
    }

    //calculate FTE based on 7 hour work day
    var fte = current.hours / (business_days * 7);
    fte = fte.toFixed(2);

    current.u_fte = fte;
    current.update();


})(current, previous);
