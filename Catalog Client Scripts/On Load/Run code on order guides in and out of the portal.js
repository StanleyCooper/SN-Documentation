function onLoad() {
  /**
  * So here is the case, I have a variable set being used in an order guide and catalog item.
  * I want to hide the set on the catalog item and make it visible on the form only if the user
  * submits the order via order guide. If the user directly submits the catalog item then they
  * should not see the variable set on the form.
  */
    try{
      //if on standard UI hide form
      var guide = $("sysparm_guide");//if on a guide, and the standard ui this will not eq null
      if(guide){
        g_form.setDisplay('create_for_user', true);
      } else {
        g_form.setDisplay('create_for_user', false);
      }
    } catch(e) { //if on sp, $("") will fail
      var sp_guide = g_service_catalog.isOrderGuide();
      if(sp_guide){
        g_form.setDisplay('create_for_user', true);
      } else {
        g_form.setDisplay('create_for_user', false);
      }
    }
}
