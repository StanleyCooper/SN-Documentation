count = 0;

var gr = new GlideRecord('resource_aggregate_monthly');
//gr.addEncodedQuery('u_quarter=NULL');
//gr.setLimit(100)
gr.query();
while (gr.next()) {
    count = count + 1;
    var quarter = gr.month_starts_on.toString().split('-')[1];

    if (quarter.indexOf('01') != -1 || quarter.indexOf('02') != -1 || quarter.indexOf('03') != -1) {
        gr.u_quarter = 'q_three';
    } else if (quarter.indexOf('04') != -1 || quarter.indexOf('05') != -1 || quarter.indexOf('06') != -1) {
        gr.u_quarter = 'q_four';
    } else if (quarter.indexOf('07') != -1 || quarter.indexOf('08') != -1 || quarter.indexOf('09') != -1) {
        gr.u_quarter = 'q_one';
    } else if (quarter.indexOf('10') != -1 || quarter.indexOf('11') != -1 || quarter.indexOf('12') != -1) {
        gr.u_quarter = 'q_two';
    }
    gr.update();
}
gs.log(count);
