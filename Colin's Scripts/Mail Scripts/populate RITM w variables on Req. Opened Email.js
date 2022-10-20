<mail_script>
template.print("<b><u>Summary of Requested Item:</u></b><br/>");

var item = new GlideRecord("sc_req_item");
item.addQuery("request", current.sys_id);
item.query();
while(item.next()) {
  template.print(item.number + ": " + item.quantity + " X " + item.cat_item.getDisplayValue() + "<br/>");
  template.print("<br/><b>Item Details:</b> <br/>");
  var keys = new Array();
  var set = new GlideappVariablePoolQuestionSet();
  set.setRequestID(item.sys_id);
  set.load();
  var vs = set.getFlatQuestions();
  for (var i=0; i < vs.size(); i++) {
      if (vs.getLabel() != "" && vs.getDisplayValue() != "" && vs.getDisplayValue()!='false' && vs.get(i).getDisplayValue()!= 'false' && vs.get(i).getDisplayValue()!= '') {
      template.print("<br/> <b>" + vs.get(i).getLabel() + "</b> = " + vs.get(i).getDisplayValue() + "");
    }
  }
}
</mail_script>
