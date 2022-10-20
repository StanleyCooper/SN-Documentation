var gr = new GlideRecord('incident');
gr.addEncodedQuery('u_location_ofISNOTEMPTY');
gr.query();
var str, length;
while(gr.next()) {
    str = gr.getValue('u_location_of');
    if(str) {
        length = str.length;
        if(str.slice(-1) == "\n") {
            gs.print("\nOld value : \n" + str + " \nSet to new value: \n" + str.substring(0, str.length - 1) + "--------------\n");
            gr.setValue('u_location_of', str.substring(0, str.length - 1));
            //gr.update();
        }
    }
}
