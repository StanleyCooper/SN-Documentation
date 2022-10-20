removeUser('b8581f24db73ba0065f0f9a61d96190b', '67118c866f3d76400f3ccccc5d3ee455')//user sys_id grp sys_id
function removeUser(userID, groupID) {
    var grGroup = new GlideRecord('sys_user_grmember');
    grGroup.addQuery('group', groupID);
    grGroup.addQuery('user', userID);
    grGroup.query();
    if (grGroup.next()) {
        gs.print('Deleting group member record: ' + grGroup.getUniqueValue());
        grGroup.deleteRecord();
    } else {
        gs.print('No matching records found');
    }
}
