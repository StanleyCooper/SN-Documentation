/////////////////
//
//  Create one UI action (submit) that has sysverb_insert as the action name to override the global submit
//
//
///////////////

// client = executeRule
//onclick runClientCode()
//condition current.canCreate()

//Client-side 'onclick' function
function runClientCode(){
	alert('Your request has been submitted. You will now be redirected back toward our internal intranet site.');
	//Call the UI Action and skip the 'onclick' function
	gsftSubmit(null, g_form.getFormElement(), 'emp_onboard_submit');
	g_navigation.open("https://mhq.mholland.com/Pages/Index.aspx", "_parent");

}

//Code that runs without 'onclick'
//Ensure call to server-side function with no browser errors
if(typeof window == 'undefined'){
	runBusRuleCode();
}
//Server-side function
function runBusRuleCode(){
	current.insert();
}

////////////////////////
//
//  create UI Action (submit form) that has emp_onboard_submit as the action name so it is called after gsftSubmit.
//     If it has sysverb_insert it will call the global submit button and not fuction correctly
//
////////////////////////

// client = executeRule
//onclick runClientCode()
//condition current.canCreate()

//Client-side 'onclick' function
function runClientCode(){
    alert('Your request has been submitted. You will now be redirected back toward our internal intranet site.');
    //Call the UI Action and skip the 'onclick' function
    gsftSubmit(null, g_form.getFormElement(), 'emp_onboard_submit');
	g_navigation.open("https://mhq.mholland.com/Pages/Index.aspx", "_parent");
}

//Code that runs without 'onclick'
//Ensure call to server-side function with no browser errors
if(typeof window == 'undefined'){
    runBusRuleCode();
}

//Server-side function
function runBusRuleCode(){
    current.insert();

}
