On the Service Catalog

Create a new Reference variable

Add Advanced reference qualifier such as

javascript:"u_location=" + current.variables.facility

where ‘u_location’ is the field on the selected table to restrict

and +current.variables.facility is the value you want to check against

javascript:"active=true^u_variable=" + current.variables.variablename

This will add the check for active records

Example: To restrict a Reference field results (done for IPFS “Outlook” SC Item)

SC Item variable: Associate name

Reference field à sys_user table

Restrict the users returned/displayed to ‘All Active Users’ if the currently logged on user is a member of the “HR” group

Restrict the users returned/displayed to ‘Active users where the Manager field is populated with the currently logged on user’

Advanced Ref Qual:

javascript:u_associateRefQual();

Script Include:

Name: u_associateRefQual

Script: (make sure it’s not in a Class for this type of call)

function u_associateRefQual() {

if(gs.getUser().isMemberOf('73fbb2fddbd37a002263f12aaf96193f')) {  // HR group

return 'active=true^EQ';

}

else {

return 'active=true^managerDYNAMIC90d1921e5f510100a9ad2572f2b477fe^EQ';

}

}



For Facilities Requests (for example)

Create a new Reference variable (Floor)

I have Building (building), Floor (floor), and Room (room)

For the Building variable – Simply point to the cmn_building table

For the Floor variable – Point to the fpv_floorplan table

Add Advanced reference qualifier such as

javascript:'building=' + current.variables.building

where ‘building’ is the field on the selected table to restrict

and +current.variables.building is the value you want to check against

For the Room variable – Point to the fpv_element table

Add Advanced reference qualifier such as

javascript:'floor=' + current.variables.floor + '^building=' + current.variables.building

* checking against two fields for this restriction/filter

 
