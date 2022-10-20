//Query for the record
var rec = new GlideRecord('sys_number'); //update to table name
rec.get('973c8e8a9d022000da615b13b3a22f32');//update to record sys_id
//Push the record into the current update set
var um = new GlideUpdateManager2();
um.saveRecord(rec);


//push attachment
//Query for the record
var rec = new GlideRecord('sys_attachment');
rec.get('973c8e8a9d022000da615b13b3a22f32');//update to attachment sys_id
addAttachmentToUpdateSet(rec);

function addAttachmentToUpdateSet(attachmentGR) {
   var um = new GlideUpdateManager2();
   um.saveRecord(attachmentGR);

   var attdoc = new GlideRecord('sys_attachment_doc');
   attdoc.addQuery('sys_attachment', attachmentGR.sys_id);
   attdoc.orderBy('position');
   attdoc.query();
   while(attdoc.next()){
      um.saveRecord(attdoc);
   }
}



// add whole table
var count = 0;
var gr = new GlideRecord('u_cmdb_ci_service_catalog_cards');
gr.query();
while (gr.next()){
     gs.log(gr. name + ' sys_id ' + gr.sys_id);
     var um = new GlideUpdateManager2();
     um.saveRecord(gr);
     count++;
}
gs.log(count);
