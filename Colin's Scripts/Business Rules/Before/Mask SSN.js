Objective:
- To parse/replace numerical values in the Short description and/or Description fields if they match specific criteria.
  - In this case, if a user adds 5 consecutive #'s, or a SSN # (normal format), only display the "Last 4" and
    mask any/all #'s in front of the last 4.

* Example string: Some text then 123456789 12345 1234 123-12-1234  --> #####6789 #2345 1234 ###-##-1234

Business Rule: Mask SSN: INC SD_Desc
Table: Incident

When to run: Before insert/update

Filter Conditions:
- Short description changes
  OR
- Description changes

Script:

(function executeRule(current, previous /*null when async*/) {

	var ssnRgx = new RegExp('[0-9]{3}-[0-9]{2}-', 'g'); // Match "123-12-" format
	var newSubstr = '###-##-'; // What we're going to replace any/all matches with

	// Example string: Some text then 123456789 12345 1234 123-12-1234  --> #####6789 #2345 1234 ###-##-1234
	var inputArraySD = current.short_description.toString().split(' ');

	for (var i = 0; i < inputArraySD.length; i++) {
		if (ssnRgx.test(inputArraySD[i])) {
			inputArraySD[i] = inputArraySD[i].replace(ssnRgx, newSubstr);
		}
		else if (/^\d+$/.test(inputArraySD[i]) && inputArraySD[i].length >= 5) {
			inputArraySD[i] = inputArraySD[i].replace(/.(?=.{4,}$)/g, '#');
		}
	}

	var inputArrayD = current.description.toString().split(' ');

	for (var x = 0; x < inputArrayD.length; x++) {
		if (ssnRgx.test(inputArrayD[x])) {
			inputArrayD[x] = inputArrayD[x].replace(ssnRgx, newSubstr);
		}
		else if (/^\d+$/.test(inputArrayD[x]) && inputArrayD[x].length >= 5) {
			inputArrayD[x] = inputArrayD[x].replace(/.(?=.{4,}$)/g, '#');
		}
	}

	current.short_description = inputArraySD.join(' ');
	current.description = inputArrayD.join(' ');

})(current, previous);
