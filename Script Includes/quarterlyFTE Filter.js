var quarterlyFTE = Class.create();
quarterlyFTE.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    runReport: function(query) {
        //array to hold unique resource agg monthly values by user/task/quarter needs a test value to be searchable
		var users = ['test'];
		//array to hold the values to be passed back to the array
        var quarterlyFTEs = [];

        var resourceGR = new GlideRecord('resource_aggregate_monthly');
        //limit records where there is a fiscal quarter/project
		resourceGR.addEncodedQuery('u_fiscal_quarter!=NULL^task!=NULL');
        //resourceGR.setLimit(100);
        resourceGR.query();
        while (resourceGR.next()) {
			//build the unique search string
            var currentUser = resourceGR.user.sys_id.toString() + resourceGR.task.number + resourceGR.u_fiscal_quarter.name;

            if (users.indexOf(currentUser) !== -1) {
				//if string found
                gs.info('user exists');
            } else {
				//push to search array
                users.push(currentUser);
				//push to array to pass back to report
                quarterlyFTEs.push(resourceGR.getValue('sys_id'));
            }

        }
		//pass back to report
        return quarterlyFTEs;
    },
    type: 'quarterlyFTE'
});
