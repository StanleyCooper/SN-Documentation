// This script needs to set answer to 'yes' or 'no' to indicate the state of the activity.
//
// For example,
//
var aptrisDeploys;
var company = current.account;

var gr = new GlideRecord("customer_account");
gr.addQuery("sys_id", company);
gr.query();
if (gr.next()) {
   aptrisDeploys = gr.u_aptris_deploys;
}

  answer = ifScript();

  function ifScript() {
     if (aptrisDeploys) {
        return 'yes';
     }
     return 'no';
  }
