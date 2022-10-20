//Create a sys_property and put the sys_id of the kb article into it then put this in the script of a WF Task
workflow.scratchpad.taskid = task.setNewGuid();
//Attach an existing knowledge article
var attachKB = new GlideRecord('m2m_kb_task');
attachKB.initialize();
attachKB.task = workflow.scratchpad.taskid;
attachKB.kb_knowledge = gs.getProperty('aptris.site.survey.kb');
attachKB.insert();
