//First configure the trigger condition on the survey, then update the business rule created to reflect this logic

function onAfter(current) {

    //here we are counting the number of surveys for this user in a particular month and limiting the creation of new ones.
    var count = 0;

    var existingSurveyGR = new GlideRecord('asmt_assessment_instance');
    existingSurveyGR.addEncodedQuery('metric_type.sys_created_onONThis month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()^user=' + current.requested_for.sys_id);
    existingSurveyGR.query();
    while (existingSurveyGR.next()) {
        count++;
    }

    if (count < 5) {

        //checking if the child records have an assignment group of tierpoint
        var tierpointTask = false;

        var taskQuery = GlideRecord('sc_task');
        taskQuery.addEncodedQuery('request.sys_idSTARTSWITH' + current.sys_id + '^assignment_group=' + gs.getProperty('cdw.survey.tierpointAG')); //Tierpoint ServiceDesk
        taskQuery.query();
        while (taskQuery.next()) {

            if (taskQuery.assignment_group.sys_id == gs.getProperty('cdw.survey.tierpointAG')) {
                tierpointTask = true;
            }
        }

        //if  ag found create the survey
        if (tierpointTask) {

            //create survey
            var typeSysID = gs.getProperty('cdw.survey.customersat'); //sys_id of the survey
            var sourceRecordID = ''; //leave blank
            var userID = current.requested_for.sys_id;  //user to assign to
            var result = new SNC.AssessmentCreation().createAssessments(typeSysID, sourceRecordID, userID); //create survey

            //update trigger ID
            var asmtGR = new GlideRecord("asmt_assessment_instance");
            asmtGR.get(result.split(",")[0]);
            asmtGR.setValue('trigger_id', current.getValue('sys_id'));
            asmtGR.setValue('trigger_table', 'sc_request'); //update table name to the table the business rule is running on
            asmtGR.update();
        }
    }

}
