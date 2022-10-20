// Incident state constants, use these constants when determining which incident state to use.
//
// Example - is the incident in the "Resolved" state:
// var incidentGr = new GlideRecord("incident");
// if (incidentGr.get("[sys_id]") && incidentGr.state == IncidentState.RESOLVED)
//     // do something when the incident is resolved
//
// Example 2 - change an incident state to "Closed"
// var incidentGr = new GlideRecord("incident");
// if (incidentGr.get("[sys_id]"))
//     incidentGr.state = IncidentState.CLOSED
// incidentGr.update();


var IncidentStateSNC = Class.create();

IncidentStateSNC.NEW                = "1";
IncidentStateSNC.IN_PROGRESS        = "2";
IncidentStateSNC.ACTIVE             = IncidentStateSNC.IN_PROGRESS;
IncidentStateSNC.ON_HOLD            = "3";
IncidentStateSNC.AWAITING_PROBLEM   = IncidentStateSNC.ON_HOLD;
IncidentStateSNC.AWAITING_USER_INFO = IncidentStateSNC.ON_HOLD;
IncidentStateSNC.AWAITING_EVIDENCE  = IncidentStateSNC.ON_HOLD;
IncidentStateSNC.RESOLVED           = "6";
IncidentStateSNC.CLOSED             = "7";
IncidentStateSNC.CANCELED           = "8";


IncidentStateSNC.prototype = {
    initialize: function() {
    },

    type: 'IncidentStateSNC'
};
