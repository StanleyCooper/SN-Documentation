//require checkboxes

function onSubmit() {
    //Set the mandatory checkbox variable names and total mandatory count here
    var mandatoryVars = 'option1,option2,option3,option4';
    var mandatoryCount = 2;
    var passed = forceMandatoryCheckboxes(mandatoryVars, mandatoryCount);
    if (!passed) {
        //Abort the submit
        alert('You must select at least ' + mandatoryCount + ' options.');
        return false;
    }
}
function forceMandatoryCheckboxes(mandatory, count) {
    //Split the mandatory variable names into an array
    mandatory = mandatory.split(',');
    var answer = false;
    var varFound = false;
    var numTrue = 0;
    //Check each variable in the array
    for (x = 0; x < mandatory.length; x++) { //Check to see if variable exists
        if (g_form.getControl(mandatory[x])) {
            varFound = true; //Check to see if variable is set to 'true'
            if (g_form.getValue(mandatory[x]) == 'true') {
                numTrue++; //Exit the loop if we have reached required number of 'true'
                if (numTrue >= count) {
                    answer = true;
                    break;
                }
            }
        }
    }
    //If we didn't find any of the variables allow the submit
    if (varFound == false) {
        answer = true;
    }
    //Return true or false
    return answer;
}
