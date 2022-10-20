//The first piece is the ‘Reference qual’ field value on the dictionary entry of the reference field (Assignment group in this case). The ‘javascript:’ prefix is the same, but you need to reference your Script Include function instead of the business rule function. In this case, I’m using a Script Include named ‘u_backfillAssignmentGroup’. Since these scripts can potentially interfere with each other, it’s best to prefix any of your custom scripts with ‘u_’ or something similar in order to //distinguish them from any that ServiceNow may introduce in the future.
//javascript:u_backfillAssignmentGroup();


function u_backfillAssignmentGroup() {
   var gp = ' ';
   var a = current.assigned_to;

   //return everything if the assigned_to value is empty
   if(!a)
      return;

   //sys_user_grmember has the user to group relationship
   var grp = new GlideRecord('sys_user_grmember');
   grp.addQuery('user',a);
   grp.query();
   while(grp.next()) {
      if (gp.length > 0) {
         //build a comma separated string of groups if there is more than one
         gp += (',' + grp.group);
      }
      else {
         gp = grp.group;
      }
   }
   // return Groups where assigned to is in those groups we use IN for lists
   return 'sys_idIN' + gp;
}
