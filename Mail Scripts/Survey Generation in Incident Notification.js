var str = 'trigger_id=';
str = str + current.sys_id;

var surveySysID;

var surveyGr = new GlideRecord('asmt_assessment_instance');
surveyGr.addEncodedQuery(str);
surveyGr.query();
if(surveyGr.next()){

surveySysID = surveyGr.sys_id;

}
