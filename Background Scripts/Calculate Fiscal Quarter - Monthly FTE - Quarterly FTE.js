count = 0;

var gr = new GlideRecord('resource_aggregate_monthly');
//gr.get('02f4603c1bc350107a9b2067ec4bcba0');
//gr.addEncodedQuery('u_quarter=NULL');
//gr.setLimit(100)
gr.query();
while (gr.next()) {

    //calculate quarter
    count = count + 1;
    var quarter = gr.month_starts_on.toString() + ' 11:00:00';
    var fiscalQuarter = new FinancialsForPPM;
    fiscalQuarter = fiscalQuarter.getFiscalPeriod(quarter);
    gr.u_fiscal_quarter = fiscalQuarter.parent_period;

    //calculate monthly FTE

    //set month GDT
    var monthGDT = new GlideDateTime();
    monthGDT.setDisplayValue(gr.month_starts_on);

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
    var gdt = new GlideDateTime(lastDay);
    var day_of_month = gdt.getDayOfWeekUTC();

    //calculate FTE based on 7 hour work day
    var fte = gr.hours / (business_days * 7);
    fte = fte.toFixed(2);

    gr.u_fte = fte;
    gr.update();

	//calculate quarterly FTE's
    //get fiscal year range
    var quarterFiscal = gr.month_starts_on.toString().split('-')[1];
    var yearFiscal = gr.month_starts_on.toString().split('-')[0];

    var startFiscalYear;
    var endFiscalYear;

    if (quarterFiscal.indexOf('01') != -1 || quarterFiscal.indexOf('02') != -1 || quarterFiscal.indexOf('03') != -1 || quarterFiscal.indexOf('04') != -1 || quarterFiscal.indexOf('05') != -1 || quarterFiscal.indexOf('06') != -1) {
        startFiscalYear = parseInt(yearFiscal, 10) - 1;
        endFiscalYear = parseInt(yearFiscal, 10);
    } else if (quarterFiscal.indexOf('07') != -1 || quarterFiscal.indexOf('08') != -1 || quarterFiscal.indexOf('09') != -1 || quarterFiscal.indexOf('10') != -1 || quarterFiscal.indexOf('11') != -1 || quarterFiscal.indexOf('12') != -1) {
        startFiscalYear = parseInt(yearFiscal, 10);
        endFiscalYear = parseInt(yearFiscal, 10) + 1;
    }



    var quarterlyFTE = 0;

    //Query Records for Quarterly FTE Values
    var quarterlyFTEGR = new GlideRecord('resource_aggregate_monthly');
    quarterlyFTEGR.addEncodedQuery("u_quarter=" + gr.u_quarter.toString() + "^task=" + gr.task.sys_id + "^user=" + gr.user.sys_id + "^month_starts_onBETWEENjavascript:gs.dateGenerate('" + startFiscalYear.toString() + "-06-01','start')@javascript:gs.dateGenerate('" + endFiscalYear.toString() + "-05-31','end')");
    quarterlyFTEGR.query();
    while (quarterlyFTEGR.next()) {
        var monthlyFTE = quarterlyFTEGR.u_fte;
        quarterlyFTE = quarterlyFTE + monthlyFTE;

    }

    quarterlyFTE = quarterlyFTE / 3;
    quarterlyFTE = quarterlyFTE.toFixed(2);

    //Update Quarterly FTE
    var quarterlyFTEGRUpdate = new GlideRecord('resource_aggregate_monthly');
    quarterlyFTEGRUpdate.addEncodedQuery("u_quarter=" + gr.u_quarter.toString() + "^task=" + gr.task.sys_id + "^user=" + gr.user.sys_id + "^month_starts_onBETWEENjavascript:gs.dateGenerate('" + startFiscalYear.toString() + "-06-01','start')@javascript:gs.dateGenerate('" + endFiscalYear.toString() + "-05-31','end')");
    quarterlyFTEGRUpdate.query();
    while (quarterlyFTEGRUpdate.next()) {
        quarterlyFTEGRUpdate.setWorkflow(false);
        quarterlyFTEGRUpdate.u_quarterly_fte = quarterlyFTE;
        quarterlyFTEGRUpdate.update();

    }
}
gs.log(count);
