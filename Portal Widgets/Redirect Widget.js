//Client Side

function ($scope, $location) {
	var c = this;
	var nUrl = c.data.new_portal_home;
	// Redirect to homepage on new portal but allow it to be loaded on the Main UI frame
	$location.url(nUrl);
}

//Server
(function() {
	/* populate the 'data' object */
	data.new_portal_home = '/stat';
	// Present message for users that have disabled javascript from running in their browsers
	gs.addErrorMessage(gs.getMessage('decom.portal', data.new_portal_home));
})();
