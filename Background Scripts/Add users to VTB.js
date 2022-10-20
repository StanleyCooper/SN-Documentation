var groupSysID = '287ee6fea9fe198100ada7950d0b1b73'; //Put the sys_id of the group that you would like to add here
var boardSysID = 'd6cfc3ff2f200010da18ddda2799b661'; //Put the sys_id of the board that you would like to add users to here

var groupMemberGR = new GlideRecord('sys_user_grmember');
groupMemberGR.addEncodedQuery('group=' + groupSysID);
groupMemberGR.query();
while(groupMemberGR.next()){

	var vtbMemberGR = new GlideRecord('vtb_board_member');
	vtbMemberGR.initialize();
	vtbMemberGR.user = groupMemberGR.user.sys_id;
	vtbMemberGR.board = boardSysID;
	vtbMemberGR.insert();

}
