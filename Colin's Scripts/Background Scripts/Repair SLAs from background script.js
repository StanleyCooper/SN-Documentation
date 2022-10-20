var incidentQuery = "sys_updated_on>=javascript:gs.dateGenerate('2019-01-01','00:00:00')";
var slaRepair = new SLARepair();
slaRepair.setValidateOnly(true); //comment out this line to actually repair SLAs
slaRepair.repairByFilter(incidentQuery, "incident");
if (slaRepair.validateOnly) {
  //gs.log("SLARepair run in validate only mode - found " + slaRepair.taskIds.length + " Incident records to repair", "SLARepair");
}
