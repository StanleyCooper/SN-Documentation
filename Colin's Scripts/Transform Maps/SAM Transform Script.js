(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
	// Query the Source data
	var table = import_set.table_name;
	var ci = new GlideAggregate(table);
	ci.addQuery('sys_import_set','=',import_set.sys_id);
	ci.addAggregate('COUNT', 'u_installed_on');
	ci.addHaving('COUNT', 'u_installed_on', '>=', '1');
	ci.query();

	while (ci.next()) {

		var swInstall = new GlideRecord('cmdb_sam_sw_install');
		swInstall.addQuery('installed_on.name','=',ci.getValue('u_installed_on'));
		swInstall.query();

		while (swInstall.next()) {
			log.info('Device: '  + swInstall.installed_on.name + '\nDeleted Software Installation: ' + swInstall.display_name);
			swInstall.deleteRecord();
		}
	}

})(source, map, log, target);
