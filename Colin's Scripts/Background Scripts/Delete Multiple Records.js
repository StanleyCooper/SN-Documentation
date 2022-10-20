var count = 0;

var gr = new GlideRecord('sys_user');
gr.addEncodedQuery("sys_created_onON2021-02-25@javascript:gs.dateGenerate('2021-02-25','start')@javascript:gs.dateGenerate('2021-02-25','end')^user_name=NULL");
gr.query();
while (gr.next()) {
     //Delete each record in the query result set
    var count = count + 1;
    //gr.deleteRecord();
}

gs.log(count);
