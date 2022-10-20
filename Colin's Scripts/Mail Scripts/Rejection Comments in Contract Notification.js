(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
/* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
/* Optional GlideRecord */ event) {

	// Add your code here
	var gr = new GlideRecord("sysapproval_approver");
	gr.addQuery("document_id", current.sys_id);
	gr.orderByDesc('sys_updated_on');
	gr.setLimit(1);
	gr.query();
	if (gr.next()) {

		var comments = [];
		comments = gr.comments.getJournalEntry(-1);
		var na = comments.split('\n\n');

		template.print(gr.approver.name + ' has rejected the contract.');
		template.print('<br>');

		if(na[0].toString() != ''){
			template.print('<p>' + na[0].toString() + '</p>');
		}
		if(na[1].toString() != ''){
			template.print('<p>' + na[1].toString() + '</p>');
		}
		if(na[2].toString() != ''){
			template.print('<p>' + na[2].toString() + '</p>');

		}

		template.print('<br>');

	}


	})(current, template, email, email_action, event);
