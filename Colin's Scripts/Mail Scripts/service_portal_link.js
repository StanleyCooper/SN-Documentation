(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
/* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
/* Optional GlideRecord */ event) {
   var url = '<a href="' + gs.getProperty('glide.servlet.uri') + 'sp?id=ticket&table=' + current.sys_class_name + '&sys_id=' + current.sys_id + '">View in Service Portal</a>';
   template.print(url);
})(current, template, email, email_action, event);
