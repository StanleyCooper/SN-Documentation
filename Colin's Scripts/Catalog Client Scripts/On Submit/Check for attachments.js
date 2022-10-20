function onSubmit() {
	//Works in non-portal ui
	try {
		var attachments = document.getElementById('header_attachment_list_label');
		if (attachments.style.visibility == 'hidden' || attachments.style.display == 'none' ) {
			alert('You must attach the required documentation before submitting this request.');
			return false;
		}
	}
	//For Service Portal
	catch(e) {
		var count = getSCAttachmentCount();
		if(count <= 0) {
			alert('You must attach the required documentation before submitting this request.');
			return false;
		}
	}
}
