answer();
function answer(){

  var user = new GlideRecord('sys_user');
  user.get(gs.getUserID());

	if (gr.active){
		return true;
	}
	else{
		return false;
	}

}
