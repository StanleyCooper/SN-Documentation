(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
/* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
/* Optional GlideRecord */ event) {

	template.print("Summary of Requested item:\n");

  var item = new GlideRecord("sc_req_item");
  item.addQuery("sys_id", current.sys_id);
  item.query();
  while(item.next()) {

      template.print(item.number + ":  " + item.cat_item.getDisplayValue() + "\n");
      template.print("    Item Options:" +'<br/>');

      var keys = new Array();
      var set = new GlideappVariablePoolQuestionSet();
      set.setRequestID(item.sys_id);
      set.load();
      var vs = set.getFlatQuestions();

     for (var i=0; i < vs.size(); i++) {
        if(vs.get(i).getLabel() != '' && vs.get(i).getDisplayValue() != '') {
           template.space(4);
           template.print('     ' +  vs.get(i).getLabel() + " = <span style='color:black'>" + vs.get(i).getDisplayValue() + '<br/>' + "</span>\n");
        }
      }
  }
})(current, template, email, email_action, event);
