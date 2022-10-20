(function executeRule(current, previous /*null when async*/ ) {

//var quarter = new FinancialsForPPM().getFiscalPeriod(current.month_starts_on);
//quarter = quarter.parent_period.name.toString().split(' ')[1];

var quarter = current.month_starts_on.toString().split('-')[1];


if (quarter.indexOf('01') != -1 || quarter.indexOf('02') != -1 || quarter.indexOf('03') != -1) {
    current.u_quarter = 'q_three';
} else if (quarter.indexOf('04') != -1 || quarter.indexOf('05') != -1 || quarter.indexOf('06') != -1) {
    current.u_quarter = 'q_four';
} else if (quarter.indexOf('07') != -1 || quarter.indexOf('08') != -1 || quarter.indexOf('09') != -1) {
    current.u_quarter = 'q_one';
} else if (quarter.indexOf('10') != -1 || quarter.indexOf('11') != -1 || quarter.indexOf('12') != -1) {
    current.u_quarter = 'q_two';
}
current.update();


})(current, previous);
