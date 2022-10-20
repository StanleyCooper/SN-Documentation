//bubbles
(function runMailScript(current, template, email, email_action, event) {

    var comments = [];
    var author = [];
    var createdOn = [];

    var commentsGR = new GlideRecord('sys_journal_field');
    commentsGR.addEncodedQuery('element_id=' + current.sys_id);
    commentsGR.orderByDesc('sys_created_on');
    commentsGR.query();
    while (commentsGR.next()) {

        comments.push(commentsGR.value.toString().replace("\n", "<br><br>"));
        createdOn.push(commentsGR.sys_created_on.toString());

        var userGR = new GlideRecord('sys_user');
        userGR.addEncodedQuery('user_name=' + commentsGR.sys_created_by.toString());
        userGR.query();
        if (userGR.next()) {
            author.push(userGR.name.toString());
        }
    }

    for (var i = 0; i < comments.length; i++) {

        if (current.caller_id.name.toString() == author[i].toString()) {

            template.print('<table width="100%" border="0" cellspacing="5" cellpadding="0"> <tr> <td> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td style="border-radius: 3px;" bgcolor="#FF1E0F" style="font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: black; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 20px; border: 1px solid #FF1E0F; display: inline-block;"><div style="margin: 5px;"><b><u>' + author[i].toString() + ':</u></b><br>' + createdOn[i] + '<br><br> ' + comments[i].toString() + '</div></td> </tr> </table> </td> </tr> </table>');


        } else {

				template.print('<table width="100%" border="0" cellspacing="5" cellpadding="0"> <tr> <td> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td style="border-radius: 3px;" bgcolor="#d67b46" style="font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: black; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 20px; border: 1px solid #d67b46; display: inline-block;"><div style="margin: 5px;"><b><u>' + author[i].toString() + ':</u></b><br>' + createdOn[i] + '<br><br> ' + comments[i].toString() + '</div></td> </tr> </table> </td> </tr> </table>');

        }

    }

})(current, template, email, email_action, event);


//blocks
(function runMailScript(current, template, email, email_action, event) {

	template.print('<table width="100%" style="margin: 0 auto;"> <tr> <td bgcolor="#F5F5F5" style="font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: black; text-decoration: none; text-decoration: none; padding: 20px; width: 600px; display: inline-block; border-bottom-style: solid; border-bottom-color: #808080; border-bottom-width: 7px;border-top-style: solid; border-top-color: #808080; border-top-width: 7px;"> <div style="margin: 5px;"> <h2>Discussion:</h2> </div> </td> </tr></table>');

    var comments = [];
    var author = [];
    var createdOn = [];

    var commentsGR = new GlideRecord('sys_journal_field');
    commentsGR.addEncodedQuery('element_id=' + current.sys_id);
    commentsGR.orderByDesc('sys_created_on');
    commentsGR.query();
    while (commentsGR.next()) {

        comments.push(commentsGR.value.toString().replace("\n", "<br><br>"));
        createdOn.push(commentsGR.sys_created_on.toString());

        var userGR = new GlideRecord('sys_user');
        userGR.addEncodedQuery('user_name=' + commentsGR.sys_created_by.toString());
        userGR.query();
        if (userGR.next()) {
            author.push(userGR.name.toString());
        }
    }

    for (var i = 0; i < comments.length; i++) {

        if (current.caller_id.name.toString() == author[i].toString()) {

            template.print('<table width="100%" style="margin: 0 auto;"> <tr> <td style="font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: black; text-decoration: none; text-decoration: none; padding: 20px; width: 600px; display: inline-block; border-bottom-style: solid; border-bottom-color: #808080; border-bottom-width: 7px;"> <div style="margin: 5px;"><b style="color: #FF1E0F;">' + author[i].toString() + '</b> | ' + createdOn[i] + '<br><br> ' + comments[i].toString() + '</div> </td> </tr></table>');


        } else {

				template.print('<table width="100%" style="margin: 0 auto;"> <tr> <td style="font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: black; text-decoration: none; text-decoration: none; padding: 20px; width: 600px; display: inline-block; border-bottom-style: solid; border-bottom-color: #808080; border-bottom-width: 7px;"> <div style="margin: 5px;"><b>' + author[i].toString() + '</b> | ' + createdOn[i] + '<br><br> ' + comments[i].toString() + '</div> </td> </tr></table>');

        }

    }

})(current, template, email, email_action, event);

//block with centered table
(function runMailScript(current, template, email, email_action, event) {

	template.print('<table width="100%" style="margin: 0 auto;"> <tr> <td style="font-size: 12px; font-family: Arial, sans-serif; color: black; text-decoration: none; text-decoration: none; padding: 20px; width: 600px; display: inline-block;"> <div style="margin: 5px;"> <table style="margin: 0 auto;"> <tr> <td>');

	template.print('<table width="100%" style="margin: 0 auto;"> <tr> <td bgcolor="#F5F5F5" style="font-size: 12px; font-family: Arial, sans-serif; color: black; text-decoration: none; text-decoration: none; padding-right:40px; width: 600px; display: inline-block; border-bottom-style: solid; border-bottom-color: #808080; border-bottom-width: 7px;border-top-style: solid; border-top-color: #808080; border-top-width: 7px;"> <div style="margin 5px;"><h2>Discussion:</h2> </div> </td> </tr></table>');

    var comments = [];
    var author = [];
    var createdOn = [];

    var commentsGR = new GlideRecord('sys_journal_field');
    commentsGR.addEncodedQuery('element_id=' + current.sys_id);
    commentsGR.orderByDesc('sys_created_on');
    commentsGR.query();
    while (commentsGR.next()) {

        comments.push(commentsGR.value.toString().replace("\n", "<br>"));
        createdOn.push(commentsGR.sys_created_on.toString());

        var userGR = new GlideRecord('sys_user');
        userGR.addEncodedQuery('user_name=' + commentsGR.sys_created_by.toString());
        userGR.query();
        if (userGR.next()) {
            author.push(userGR.name.toString());
        }
    }


    for (var i = 0; i < comments.length; i++) {

        var formattedDate;
        var dateDueDate = createdOn[i];
        var dueDate = new GlideDateTime(dateDueDate);



        if (current.caller_id.name.toString() == author[i].toString()) {

            template.print('<table width="100%" style="margin: 0 auto;"> <tr> <td style="font-size: 12px; font-family: Arial, sans-serif; color: black; text-decoration: none; text-decoration: none; padding-right:40px; width: 600px; display: inline-block; border-bottom-style: solid; border-bottom-color: #808080; border-bottom-width: 7px;"> <div style="margin-left: 0px; margin-top: 5px; margin-bottom: 5px;"><b style="color: #FF1E0F;">' + author[i].toString() + '</b> | ' + dueDate.getDisplayValue() + '<br><br> ' + comments[i].toString() + '</div> </td> </tr></table>');


        } else {

            template.print('<table width="100%" style="margin: 0 auto;"> <tr> <td style="font-size: 12px; font-family: Arial, sans-serif; color: black; text-decoration: none; text-decoration: none;  padding-right:40px; width: 600px; display: inline-block; border-bottom-style: solid; border-bottom-color: #808080; border-bottom-width: 7px;"> <div style="margin-left: 0px; margin-top: 5px; margin-bottom: 5px;"><b>' + author[i].toString() + '</b> | ' + dueDate.getDisplayValue() + '<br><br> ' + comments[i].toString() + '</div> </td> </tr></table>');

        }

    }
})(current, template, email, email_action, event);


//Email Source Code
<table style="width: 600px; border-collapse: collapse;" border="0" cellpadding="3" align="center">
<tbody>
<tr>
<td style="width: 100%;">
<p><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;">&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<img title="" src="mholland.pngx" alt="" width="175" height="66" align="baseline" border="" hspace="" vspace="" /> </span></p>
<p>&nbsp;</p>
<p align="left"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Hello ${caller_id},</span><br /><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">&nbsp;</span></p>
<p align="left"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Your incident has been updated with the comments below.</span><br /><br /></p>
<p align="left"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Thank you,</span><br /><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${assigned_to} | ${assigned_to.phone} | ${assigned_to.email}</span><br /><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; M. Holland Help Desk |&nbsp;847-849-5800 |&nbsp;<a href="mailto:helpdesk@mholland.com">helpdesk@mholland.com</a></span></p>
<p align="left"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">${mail_script:service_portal_link} </span></p>
<p align="left"><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">${mail_script:formatted_additional_comments}</span></p>
<p><span style="font-size: 10pt; font-family: helvetica;"><span style="font-family: arial, helvetica, sans-serif;">${mail_script:knowledge_base_link}</span></span></p>
</td>
</tr>
</tbody>
</table>
<p align="left">&nbsp;</p>
