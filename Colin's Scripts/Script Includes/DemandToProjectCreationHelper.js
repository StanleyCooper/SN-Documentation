var DemandToProjectCreationHelper = Class.create();
DemandToProjectCreationHelper.prototype = {
	initialize: function() {
	},

	createProject: function (sysId) {
		var sys_id = sysId, projId, projNumber, tableDisplayName;
		var demand = new GlideRecord('dmn_demand');
		demand.addQuery('sys_id', sys_id);
		demand.query();

		if(demand.next()) {
			sys_id = demand.getValue("sys_id");
			projId = demand.getValue("project");
			var projectTable = "pm_project";
			if(GlidePluginManager.isActive('com.snc.project_management_v3')){
				projectTable = SNC.PPMConfig.getProjectTable(demand.sys_class_name);
			}
			if(sys_id && !projId) {
				var project = new GlideRecord(projectTable);
				project.initialize();
				var fields = ['short_description', 'primary_program', 'business_case', 'sys_domain', 'investment_class', 'investment_type', 'risk_of_performing', 'risk_of_not_performing', 'enablers', 'barriers', 'in_scope', 'out_of_scope', 'assumptions', 'goals', 'strategic_objectives', 'business_unit', 'department', 'impacted_business_units', 'business_applications', 'business_capabilities',
				'cmdb_ci','company','priority','urgency','impact'];
				for(var index in fields){
					var field = fields[index];
					if(project.isValidField(field)){
						project.setValue(field, demand.getValue(field));
					}
				}

				//Begin Aptris RAC - 1/16/19
				project.setValue("cmdb_ci", demand.getValue("cmdb_ci"));
				project.setValue("u_corporate_project", demand.getValue("u_corporate"));
				project.setValue("u_regulatory_mandate", demand.getValue("u_regulatory"));
				project.setValue("goal", demand.getValue("goal"));
				project.setValue("u_executive_summary", demand.getValue("u_executive_summary"));
				project.setValue("u_size", demand.getValue("size"));
				project.setValue("u_sponsor", demand.getValue("u_reference_2"));
				var capitalLay = demand.capital_outlay;
				if( JSUtil.notNil(capitalLay) && JSUtil.notNil(capitalLay.getCurrencyValue())) {
					project.cost = capitalLay.getCurrencyCode() + ';' + parseFloat(capitalLay.getCurrencyValue());
				}
				project.setValue("u_category", demand.getValue('category'));
				//END

				project.setValue("primary_portfolio", demand.getValue("portfolio"));
				project.setValue("demand", sys_id);
				project.setValue("calculation_type", 'manual');
				var benefit = demand.financial_benefit;
				if( JSUtil.notNil(benefit) && JSUtil.notNil(benefit.getCurrencyValue())) {
					project.benefits = benefit.getCurrencyCode() + ';' + parseFloat(benefit.getCurrencyValue());
				}
				//Begin Aptris RAC - Taken from old AjaxCreateRelatedEntityFromDemand - Added by BPL on 12-8-2017 so End date of project is not set by duration
				//project.setWorkflow(false);
				//end BPL


				if(new GlidePluginManager().isActive('com.snc.financial_planning_pmo')) {
					var riskDerivationFunction = ScoreFactory.riskDerivationFunction();
					project.setValue('risk', riskDerivationFunction(demand.score_risk));
				}
				var resp = this._setProjectDatesAndDurationFromDemand(project, demand, projectTable);
				if ( resp.status == 'error' )
					return {'sysId': null, 'number': '', 'label': 'Project', 'error': resp.message };

					projId = project.insert();
					if(JSUtil.nil(projId)){
						var allErrorMessages = j2js(gs.getErrorMessages());
						if (JSUtil.notNil(allErrorMessages) && allErrorMessages.length > 0)
							return {'sys_id': projId, 'number': '', 'label': 'Project', 'error':allErrorMessages[0]};
							else
								return {'sys_id': projId, 'number': '', 'label': 'Project'};
							}
							GlideSysAttachment.copy(demand.sys_class_name, sys_id, projectTable, projId);
							projNumber = project.getValue('number');
							tableDisplayName = project.getClassDisplayValue();

							if(JSUtil.nil(demand.related_records))
								demand.related_records = projId;
							else
								demand.related_records = demand.related_records + "," + projId;
							demand.project = projId;
							demand.state = '8';
							demand.stage = 'project';
							demand.update();

							var projectDomain = project.sys_domain;
							var req = new GlideRecord("dmn_requirement");
							req.addQuery("parent", sys_id);
							req.query();
							while(req.next()){
								var sourceId = req.getUniqueValue();
								req.parent = projId;
								req.sys_domain = projectDomain;
								var newNumber = new NumberManager('dmn_requirement');
								req.number = newNumber.getNextObjNumberPadded();
								var reqId = req.insert();
								GlideSysAttachment.copy('dmn_requirement', sourceId, 'dmn_requirement', reqId);
								gs.log("Requirement created for Project " + project.number);
							}

							if(new GlidePluginManager().isActive('com.snc.financial_planning_pmo')){
								this._updateFinancialRecords(sys_id, projId);
								var budgetPlanner = new ITFMBudgetPlanner();
								budgetPlanner.updateDemandBudgetKeysToProject(demand, projId);
								this._copyFinancialFieldsFromDemandToProject(demand, projId, projectTable);
							}

							var risk = new GlideRecord("risk");
							risk.addQuery("state","!=","achieved");
							risk.addQuery("task", sys_id);
							risk.query();
							while(risk.next()){
								risk.task = projId;
								if (new GlidePluginManager().isActive('com.snc.program_management'))
									risk.top_task = projId;
								risk.sys_domain = projectDomain;
								risk.update();
								gs.log("Risk updated for Project " + project.number);
							}

							var dec = new GlideRecord("dmn_decision");
							dec.addQuery("parent", sys_id);
							dec.query();
							while(dec.next()){
								var decSourceId = dec.getUniqueValue();
								var decisionNumber = new NumberManager('dmn_decision');
								dec.number = decisionNumber.getNextObjNumberPadded();
								dec.parent = projId;
								dec.sys_domain = projectDomain;
								dec.setWorkflow(false);
								var decId = dec.insert();
								GlideSysAttachment.copy('dmn_decision', decSourceId, 'dmn_decision', decId);
								gs.log("Decision created for Project " + project.number);
							}

							//Begin Aptris RAC 1/16/19 Move over related lists from old AjaxCreateRelatedEntityFromDemand: Populate related lists (Aptris 5/3/17)
							//Stakeholders related list
							var stkhold = new GlideRecord('dmn_m2m_demand_stakeholder');
							stkhold.addQuery('demand',sys_id);
							stkhold.query();
							while(stkhold.next()){//insert stakeholders from demand to the many to many table
								var proj_stk = new GlideRecord("u_m2m_stakeholder_projects");
								proj_stk.initialize();
								proj_stk.u_stakeholder_register = stkhold.stakeholder;
								proj_stk.u_project = projId;
								proj_stk.insert();
								gs.log("Stakeholder created for Project " + project.number);
							}
							//Affected CIs related list
							var ci = new GlideRecord("task_ci");
							ci.addQuery("task", sys_id);
							ci.addQuery("ci_item","!=",project.cmdb_ci);
							ci.query();
							while(ci.next()){
								var ciSourceId = ci.getUniqueValue();
								ci.task = projId;
								var ciId = ci.insert();
								GlideSysAttachment.copy('task_ci', ciSourceId, 'task_ci', ciId);
								gs.log("Affected CI created for Project " + project.number);
							}
							//Impacted Services related list
							var service = new GlideRecord("task_cmdb_ci_service");
							service.addQuery("task", sys_id);
							service.query();
							while(service.next()){
								var serviceSourceId = service.getUniqueValue();
								service.task = projId;
								var serviceId = service.insert();
								GlideSysAttachment.copy('task_cmdb_ci_service', serviceSourceId, 'task_cmdb_ci_service', serviceId);
								gs.log("Impacted Service created for Project " + project.number);
							}
							//Impacted Departments related list
							var dept = new GlideRecord("u_m2m_demands_departments");
							dept.addQuery("u_demand", sys_id);
							dept.query();
							while(dept.next()){
								var proj_dept = new GlideRecord('u_m2m_projects_departments');
								proj_dept.initialize();
								proj_dept.u_department = dept.u_department;
								proj_dept.u_project = projId;
								proj_dept.insert();
								gs.log("Impacted Department created for Project " + project.number);
							}
							//Impacted Vendors related list
							var vend = new GlideRecord("u_m2m_demands_companies");
							vend.addQuery("u_demand", sys_id);
							vend.query();
							while(vend.next()){
								var proj_vend = new GlideRecord('u_m2m_projects_companies');
								proj_vend.initialize();
								proj_vend.u_company = vend.u_company;
								proj_vend.u_project = projId;
								proj_vend.insert();
								gs.log("Impacted Vendor created for Project " + project.number);
							}
							//Managed Documents related list
							var doc = new GlideRecord("dms_document");
							doc.addQuery("u_parent", sys_id);
							doc.query();
							while(doc.next()){
								var docSourceId = doc.getUniqueValue();
								doc.u_parent = projId;
								var docId = doc.insert();
								GlideSysAttachment.copy('dms_document', docSourceId, 'dms_document', docId);

								//copy over Revisions related list from the Document
								var rev = new GlideRecord('dms_document_revision');
								rev.addQuery('document', docSourceId);
								rev.query();
								while(rev.next()){
									var revSourceId = rev.getUniqueValue();
									rev.document = docId;
									var revId = rev.insert();
									GlideSysAttachment.copy('dms_document_revision', revSourceId, 'dms_document_revision', revId);
								}
								gs.log("Document created for Project " + project.number);
							}//END

							//Copy stories on Demand to Project
							if(new GlidePluginManager().isActive('com.snc.sdlc.agile.2.0')){
								var projectAgileApi = new ProjectWorkbenchAgile2Apis();
								projectAgileApi.copyStoriesFromDemandtoProject(sys_id,projId);
							}

							// Risk, Size and Value are copied over from demand
							project = new GlideRecord(projectTable);
							if ( project.get(projId) ) {
								project.score_risk = demand.getValue("score_risk");
								project.score_size = demand.getValue("score_size");
								project.score_value = demand.getValue("score_value");
								project.score = demand.getValue('score');
								project.setWorkflow(false);
								project.update();
								project = new GlideRecord(projectTable);
								project.get(projId);
							}

							//Delete stakeholders from project added by BR
							var stakeHolderRegister = new StakeHolderRegister('pm_m2m_project_stakeholder', 'project');
							stakeHolderRegister.deleteAllStakeHoldersInM2M(projId);

							//Copy stakeholders from demand to project
							var dmn_m2mGr = new GlideRecord('dmn_m2m_demand_stakeholder');
							dmn_m2mGr.addQuery('demand', sysId);
							dmn_m2mGr.query();

							while(dmn_m2mGr.next()) {
								stakeHolderRegister.copyStakeHoldersFromDemandToProject(projId, dmn_m2mGr);
							}
						}
					}
					return {'sys_id': projId, 'number': projNumber, 'label': tableDisplayName};
					},

					_setProjectDatesAndDurationFromDemand: function(project, demand, projectTable) {
						if (demand.start_date.nil())
							return;
						var resp = {"status": "success"};
							var defaultProjectScheduleId = '7aa3e10c8f70010040f82ab2f0f9234d';
							var scheduleId = SNC.PPMConfig.getProperty('com.snc.project.default_schedule', projectTable, defaultProjectScheduleId);
							var util = new ProjectTaskManagerUtil();
							var demandStart = this.getGlideDateTime(demand.getValue('start_date'), demand.getDisplayValue('start_date'), false);
							//remmed by RAC 1/16/19 - was remmed in orginalAjaxCreateRelatedEntityFromDemand
							//var startDateTime = util.getStartDateInternalFromSchedule(scheduleId, demandStart.getValue());
							//Added by RAC 1/16/19
							var startDateTime = demandStart.getDisplayValue();
							//end Add RAC
							var projectStartDateTime = new GlideDateTime();
							projectStartDateTime.setValue(startDateTime);
							project.setValue('start_date', projectStartDateTime);
							PPMDebug.log("DemandToProjectCreationHelper: projectStartDateTime -> " + projectStartDateTime.getDisplayValueInternal());
							//Added by RAC - 1/16/19
							project.setValue('schedule_start_date', projectStartDateTime);
							//end Add RAC

							if (!demand.requested_by.nil()) {

								//remmed by RAC 1/16/19 - updated to reflect logic of old AjaxCreateRelatedEntityFromDemand
								/*var demandEnd = this.getGlideDateTime(demand.getValue('requested_by'), demand.getDisplayValue('requested_by'), true);
								resp = util.RecalculateDurationFromEndDatePerScheduleInternal(startDateTime, demandEnd, scheduleId);
								resp = new JSON().decode(resp);

								if ( resp.status == 'success' ) {
									project.setDisplayValue('duration', resp.duration);
								}*/

								//Added by RAC 1/16/19
								var demandEnd = new GlideDateTime();
								demandEnd.setDisplayValue(demand.getValue('requested_by') + ' 08:00:00');
								//remmed by BPL 12-7-2017
								//var endDateTime = util.RecalculateEndDateFromAbsoluteDurationPerSchedule(demandEnd.getDisplayValue(), new GlideDuration('1 00:00:00'), scheduleId);
								//Added by BPL 12-7-2017
								var endDateTime = demandEnd.getDisplayValue();
								//end Add BPL
								var projectEndDateTime = new GlideDateTime();
								projectEndDateTime.setDisplayValue(endDateTime);
								project.setValue('end_date', projectEndDateTime);
								//remmmed by BPL 12-7-2017
								//var duration = util.RecalculateDurationFromEndDatePerSchedule(startDateTime, endDateTime, scheduleId);
								var duration = gs.dateDiff(projectStartDateTime.getDisplayValue(),demandEnd.getDisplayValue(),false);
								var projectDuration = new GlideDuration();
								projectDuration.setDisplayValue(duration);
								//Remmed by BPL 12-7-2017
								//project.setValue('duration', projectDuration.getValue());
								//Added by BPL 12-7-2017
								project.setValue('duration', duration);
								project.setValue('end_date', projectEndDateTime);
								project.setValue('schedule_end_date', projectEndDateTime);
								//end ADD RAC

							}
							return resp;
						},

						getGlideDateTime: function (date, displayDate, endTime) {
							PPMDebug.log("DemandToProjectCreationHelper: getGlideDateTime - date -> " + date + " | " + displayDate);
							var dateTime = new GlideDateTime();
							if(endTime) {
								dateTime.setDisplayValueInternal(date + " 23:59:59");
							} else {
								dateTime.setDisplayValueInternal(date + " 00:00:00");
							}
							PPMDebug.log("DemandToProjectCreationHelper: getGlideDateTime - dateTime -> " + dateTime.getValue() + " | " + dateTime.getDisplayValueInternal());
							return dateTime;
						},

						_updateFinancialRecords:function(demandId, projectId){
							var project = new GlideRecord('pm_project');
							project.get(projectId);

							var costPlan = new GlideRecord("cost_plan");
							costPlan.addQuery("task", demandId);
							costPlan.setValue('task', projectId);
							costPlan.setValue('top_task', projectId);
							costPlan.setValue('sys_domain', project.sys_domain);
							costPlan.setWorkflow(false);
							costPlan.updateMultiple();

							var costBreakdowns = new GlideRecord("cost_plan_breakdown");
							costBreakdowns.addQuery("task", demandId);
							costBreakdowns.setValue('task', projectId);
							costBreakdowns.setValue('sys_domain', project.sys_domain);
							costBreakdowns.setWorkflow(false);
							costBreakdowns.updateMultiple();

							var fundingRecs = new GlideRecord("project_funding");
							fundingRecs.addQuery("task", demandId);
							fundingRecs.setValue('task', projectId);
							fundingRecs.setValue('sys_domain', project.sys_domain);
							fundingRecs.setWorkflow(false);
							fundingRecs.updateMultiple();

							this.updateBenefitPlans(demandId, projectId);

							//Update estimated and budget costs
							new PlannedTaskEntityUpdater().updatePlannedTaskEstimatedCost(project);
							new PPMTaskEntityUpdater().updateBudgetCost(project);
						},

						_copyFinancialFieldsFromDemandToProject:function(demand, projectId, projectTable){
							var project = new GlideRecord(projectTable);
							if ( project.get(projectId)) {
								project.discount_rate = demand.getValue("discount_rate");
								project.npv_value = demand.getValue("npv_value");
								project.irr_value = demand.getValue("irr_value");
								project.capex_cost = demand.getValue("capital_outlay");
								project.opex_cost = demand.getValue("operational_outlay");
								project.setWorkflow(false);
								project.update();
							}
						},

						updateBenefitPlans: function (demandId, projectId) {
							gs.print("Into updateBenefitPlans -> " + demandId + " | " + projectId);
							var project = new GlideRecord('pm_project');
							project.get(projectId);

							var benefitPlan = new GlideRecord("benefit_plan");
							benefitPlan.addQuery("task", demandId);
							benefitPlan.setValue('task', projectId);
							benefitPlan.setValue('sys_domain', project.sys_domain);
							benefitPlan.setWorkflow(false);
							benefitPlan.updateMultiple();

							var benefitBreakdowns = new GlideRecord("benefit_plan_breakdown");
							benefitBreakdowns.addQuery("task", demandId);
							benefitBreakdowns.setValue('task', projectId);
							benefitBreakdowns.setValue('sys_domain', project.sys_domain);
							benefitBreakdowns.setWorkflow(false);
							benefitBreakdowns.updateMultiple();
						},

						type: 'DemandToProjectCreationHelper'
					};
