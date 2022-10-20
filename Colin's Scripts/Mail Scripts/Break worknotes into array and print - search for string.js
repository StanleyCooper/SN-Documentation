(function runMailScript(current, template, email, email_action, event) {

	var worknotes = [];

	worknotes = current.work_notes.getJournalEntry(-1);
	var na = worknotes.split("\n\n");

	template.print('<p> <font size="3" color="black" face="Arial, Helvetica, sans-serif">');
	if(na[0].toString() != '' && na[0].toString().indexOf('This Incident - New was raised on behalf of') == -1){
		template.print('<p>' + na[0].toString() + '</p>');
	}
	if(na[1].toString() != '' && na[1].toString().indexOf('This Incident - New was raised on behalf of') == -1){
		template.print('<p>' + na[1].toString() + '</p>');
	}
	if(na[2].toString() != '' && na[2].toString().indexOf('This Incident - New was raised on behalf of') == -1){
		template.print('<p>' + na[2].toString() + '</p>');
	}
	template.print('</font></p>');

})(current, template, email, email_action, event);
