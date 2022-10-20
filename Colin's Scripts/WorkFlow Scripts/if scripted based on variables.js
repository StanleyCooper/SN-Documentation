// This script needs to set answer to 'yes' or 'no' to indicate the state of the activity.
//
// For example,
//
   answer = ifScript();

   function ifScript() {
      if (current.variables.its_software_request_selection_quote != '' || current.variables.its_software_request_selection_quote_other !='' ) {
         return 'yes';
      }
      return 'no';
   }
