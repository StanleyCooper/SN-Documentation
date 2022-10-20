//CDW RAC Copy Comments and Worknotes to new change
  var journalEntries = [];

  var gr = new GlideRecord('sys_journal_field');
  gr.addQuery('element_id', current.sys_id);
  gr.query();
  while (gr.next()) {
      journalEntries.push({
          element: gr.element.getDisplayValue(),
          value: gr.value.getDisplayValue()
      });
  }

  for (var i = 0; i < journalEntries.length; i++) {
      var journalEntryGR = new GlideRecord('sys_journal_field');
      journalEntryGR.initialize();
      journalEntryGR.name = 'change_request';
      journalEntryGR.element_id = changeRequest.getGlideRecord().getUniqueValue();
      journalEntryGR.element = journalEntries[i].element;
      journalEntryGR.value = journalEntries[i].value;
      journalEntryGR.insert();
  }
