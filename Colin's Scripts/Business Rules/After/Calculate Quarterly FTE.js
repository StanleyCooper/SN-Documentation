(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    //get records to update

    //get fiscal year range
    var quarter = current.month_starts_on.toString().split('-')[1];
    var year = current.month_starts_on.toString().split('-')[0];

    var startFiscalYear;
    var endFiscalYear;

    if (quarter.indexOf('01') != -1 || quarter.indexOf('02') != -1 || quarter.indexOf('03') != -1 || quarter.indexOf('04') != -1 || quarter.indexOf('05') != -1 || quarter.indexOf('06') != -1) {
        startFiscalYear = parseInt(year, 10) - 1;
        endFiscalYear = parseInt(year, 10);
    } else if (quarter.indexOf('07') != -1 || quarter.indexOf('08') != -1 || quarter.indexOf('09') != -1 || quarter.indexOf('10') != -1 || quarter.indexOf('11') != -1 || quarter.indexOf('12') != -1) {
        startFiscalYear = parseInt(year, 10);
        endFiscalYear = parseInt(year, 10) + 1;
    }

    var quarterlyFTE = 0;

    //Query Records for Quarterly FTE Values
    var quarterlyFTEGR = new GlideRecord('resource_aggregate_monthly');
    quarterlyFTEGR.addEncodedQuery("u_quarter=" + current.u_quarter.toString() + "^task=" + current.task.sys_id + "^user=" + current.user.sys_id + "^month_starts_onBETWEENjavascript:gs.dateGenerate('" + startFiscalYear.toString() + "-06-01','start')@javascript:gs.dateGenerate('" + endFiscalYear.toString() + "-05-31','end')"); //Need to run script for each fiscal year
    quarterlyFTEGR.query();
    while (quarterlyFTEGR.next()) {
        var monthlyFTE = quarterlyFTEGR.u_fte;
        quarterlyFTE = quarterlyFTE + monthlyFTE;

    }

    quarterlyFTE = quarterlyFTE / 3;
    quarterlyFTE = quarterlyFTE.toFixed(2);

    //Update Quarterly FTE
    var quarterlyFTEGRUpdate = new GlideRecord('resource_aggregate_monthly');
    quarterlyFTEGRUpdate.addEncodedQuery("u_quarter=" + current.u_quarter.toString() + "^task=" + current.task.sys_id + "^user=" + current.user.sys_id + "^month_starts_onBETWEENjavascript:gs.dateGenerate('" + startFiscalYear.toString() + "-06-01','start')@javascript:gs.dateGenerate('" + endFiscalYear.toString() + "-05-31','end')"); //Need to run script for each fiscal year
    quarterlyFTEGRUpdate.query();
    while (quarterlyFTEGRUpdate.next()) {
        quarterlyFTEGRUpdate.setWorkflow(false);
        quarterlyFTEGRUpdate.u_quarterly_fte = quarterlyFTE;
        quarterlyFTEGRUpdate.update();

    }


})(current, previous);
