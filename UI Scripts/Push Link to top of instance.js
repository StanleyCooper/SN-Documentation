function report_upgrade_defect () {
  if (typeof jQuery === 'function' && typeof top.$j === 'function') {
    jQuery(document).ready(function () {
      var top = window.top;
      if (typeof top.report_upgrade_defect_loaded != 'undefined') {
        return;
      }
      var urlToOpen = 'https://www.google.com';
      top.report_upgrade_defect_loaded = true;
      var isUI16 = top.$j('.navpage-header-content').length > 0;
      var title = "Report Upgrade Issue";
      var widgetHtml;
        // UI16 - Geneva
        if (isUI16) {
          widgetHtml = '<div class="navpage-header-content">' +
            '<button data-placement="auto" class="btn btn-destructive"' +
            //' title="' + title + '" data-original-title="Upgrade Issue" onclick="window.open(\'/snd_xplore.do\', \'_blank\');">' + title +
              ' title="' + title + '" data-original-title="Upgrade Issue" onclick="window.open(\'' + urlToOpen + '\', \'_blank\');">' + title +
            '</button></div>';
          top.$j('#sysparm_search').parents('div.navpage-header-content').first().before(widgetHtml);
        }

    });
  }
}
report_upgrade_defect();
