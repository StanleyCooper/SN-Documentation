/*Ensure kb_view on the sys_public table is set to true

Create a new KnowledgeBase called Public Articles

Do not set up any Can Read criteria, any new articles should not have any roles selected

Create a true/false field called u_no_login_required on the knowledge article table

Create an on Query business rule on the Knowledge Article table with a condition of 

!gs.isLoggedIn();

And a script of */

function onBefore(current, previous) {

 
    current.addQuery("u_no_login_required", true);

gs.addInfoMessage('This article may require you to be logged in to view it');

 
}

/*Reference: https://community.servicenow.com/community?id=community_question&sys_id=6c070be5db1cdbc01dcaf3231f96190a

Setup BR so that any article inserted/updated that is using this public knowledge base is autoflagged as no login required = true (not read only though so it can be disabled)*/
