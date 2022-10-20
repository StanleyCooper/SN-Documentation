/*******

To use this filter create a condition where

Sys ID (IS) javascript: new mostRecentStatusReport().runReport('add your encoded query from the pm_project table here')

*******/

var mostRecentStatusReport = Class.create();
mostRecentStatusReport.prototype = {
    runReport: function(query) {
        var statusReports = [];

        var projectGR = new GlideRecord('pm_project');
        projectGR.addEncodedQuery(query);
        projectGR.query();
        while (projectGR.next()) {

            var projectStatusGR = new GlideRecord("project_status");
            projectStatusGR.addQuery('project', projectGR.sys_id.toString());
            projectStatusGR.orderByDesc("sys_created_on");
            projectStatusGR.query();
            if (projectStatusGR.next()) {

                statusReports.push(projectStatusGR.getValue('sys_id'));
            }
        }
        return statusReports;
    },

    type: 'mostRecentStatusReport'

};
