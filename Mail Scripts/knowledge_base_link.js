//button
(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {

    var kbLink = gs.getProperty('glide.servlet.uri') + 'sp?id=kb_view2&kb_id=248a11fbdbee80d08750389f9d9619c6';

    var url = '<table width="100%" cellspacing="0" cellpadding="0"><tr><td><table cellspacing="0" cellpadding="0"><tr><td style="border-radius: 2px;" bgcolor="#FF1E0F"><center><a href="' + kbLink + '"target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">Visit our Knowledgebase</a></center></td></tr></table></td></tr></table>';

    template.print(url);
})(current, template, email, email_action, event);

//block
(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {

    var kbLink = gs.getProperty('glide.servlet.uri') + 'sp?id=kb_view2&kb_id=248a11fbdbee80d08750389f9d9619c6';

    //var url = '<table align="center" width="100%" cellspacing="0" cellpadding="0"><tr><td><table cellspacing="0" cellpadding="0"><tr><td style="border-radius: 2px;" bgcolor="#FF1E0F"><center><a href="' + kbLink + '"target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">Visit our Knowledgebase</a></center></td></tr></table></td></tr></table>';
	var url = '<table width="100%" style="margin: 0 auto;"> <tr> <td style="width:600px"> <h2 style="color: #FF1E0F; font-family: Helvetica, Arial, sans-serif; text-decoration: none; text-decoration: none;">Have Questions?</h2> <div style=" font-family: Helvetica, Arial, sans-serif; color: black; text-decoration: none; text-decoration: none;"> Find answers, guides and more in our Knowledge Base. </div> </td> </tr> <tr> <td style="font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: black; text-decoration: none; text-decoration: none; padding: 20px; width: 100%; display: inline-block; border-bottom-style: solid; border-bottom-color: #808080; border-bottom-width: 7px;"> <div style="margin: 5px;"> <table align="center" style="margin: 0 auto;"> <tr> <td> <table cellspacing="0" cellpadding="0"> <tr> <td style="border-radius: 2px;" bgcolor="#FF1E0F"> <center><a href="' + kbLink + '"target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">Knowledge Base</a></center> </td> </tr> </table> </td> </tr> </table> </div> </td> </tr></table>';

    template.print(url);
})(current, template, email, email_action, event);
