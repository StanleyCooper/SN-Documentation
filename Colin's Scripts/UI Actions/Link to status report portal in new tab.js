//Script Include: CLient Callable True

var CDWGenerateStatusReportLink = Class.create();
CDWGenerateStatusReportLink.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    sendLink: function() {
        var project = this.getParameter('sysparm_project');
		var grStatusReport = new GlideRecord('project_status');
        grStatusReport.addEncodedQuery('project=' + project);
        grStatusReport.orderByDesc('sys_created_on');
        grStatusReport.setLimit(1);
		grStatusReport.query();
        if (grStatusReport.next()) {

            var gd = new GlideDate();
            gd.setValue(grStatusReport.as_on);
			var url = gs.getProperty('glide.servlet.uri') + 'project_status?id=project_status_report&sysparm_sys_id=' + project + '&sysparm_sys_class_name=pm_project&sysparm_title=Project%20Status&sysparm_status_date=' + gd + '&sysparm_report_id=' + grStatusReport.sys_id;
			return url;

        }
    },

    type: 'CDWGenerateStatusReportLink'
});



// UI Action
//Client: True
//Onclick redirectToPortal();

function redirectToPortal() {

    var project = g_form.getUniqueValue();
    var ga = new GlideAjax('CDWGenerateStatusReportLink');
    ga.addParam('sysparm_name', 'sendLink');
    ga.addParam('sysparm_project', project);
    ga.getXML(theLink);

    function theLink(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");

		if(answer){
			g_navigation.open(answer, '_blank');
		}
		else{
			alert('Current project has no status reports.');
		}

    }

}
