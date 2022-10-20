function onChange(control, oldValue, newValue, isLoading) {

    if (isLoading || newValue == '') {

        return;

    }

    //g_form.hideFieldMsg('start_date');

    var start_date = newValue;

    var ajax = new GlideAjax('DateTimeFunc');

    ajax.addParam('sysparm_name', 'ValidateLeadTime');

    ajax.addParam('start_date', start_date);

    ajax.getXML(validateDate);

}

function validateDate(response) {

    var answer = response.responseXML.documentElement.getAttribute("answer");

    if (answer == 1){

        alert("The event date can't be in past.") ;
		g_form.setValue('date_of_event','');
	}
    else if (answer == 2){

        alert('Event date must be at least 3 business days in the future.');
		g_form.setValue('date_of_event','');
	}
}


//server

var DateTimeFunc = Class.create();

DateTimeFunc.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    addTime: function() {

        // Get the Start Date

        var start = this.getParameter('start_date');

        var timeToAdd = this.getParameter('time_to_add');

        var gdt = new GlideDateTime();

        gdt.setDisplayValue(start);

        //add time to Start Date

        gdt.addSeconds(timeToAdd);

        //Return the End Date to Client Script

        return gdt.getDisplayValue();

    },

    addTimeSchedule: function() {

        var start = this.getParameter('start_date');

        var timeToAdd = this.getParameter('time_to_add');

        var sch = this.getParameter('schedule');

        var gdt = new GlideDateTime();

        gdt.setDisplayValue(start);

        //Get a schedule by name to calculate duration

        var schedRec = new GlideRecord('cmn_schedule');

        schedRec.get('name', sch);

        if (typeof GlideSchedule != 'undefined')

            var sched = new GlideSchedule(schedRec.sys_id);

        else

            var sched = new Packages.com.glide.schedules.Schedule(schedRec.sys_id);

        //Set the amount of time to add (in seconds)

        durToAdd = new GlideDuration(timeToAdd * 1000);

        var newDateTime = sched.add(gdt, durToAdd, '');

        //Return the new date

        return newDateTime.getDisplayValue();

    },

    ValidateLeadTime: function() {

        var se_start_date = this.getParameter('start_date');

        var opened_date = gs.nowDateTime();

        var currentDateTime = new GlideDateTime();

        currentDateTime.setDisplayValue(opened_date);

        var start_date = new GlideDateTime();

        start_date.setDisplayValue(se_start_date);




        if (se_start_date != '' && start_date < currentDateTime)

        {

            return 1; // Start Date Entered is in past

        } else if (se_start_date != '')

        {


            //Get Schedule
            var gdt = new GlideDateTime();
            var dc = new DurationCalculator();
            dc.setSchedule('090eecae0a0a0b260077e1dfa71da828'); // Schedule sys_id
            dc.setStartDateTime(gdt);
            dc.calcDuration(3 * 9 * 3600); // 8-5 Schedule  so 9 Hrs

            var edt = new GlideDateTime(dc.getEndDateTime())
            edt.getDate();

            var dc = new DurationCalculator();

            dc.setStartDateTime(currentDateTime);

            if (!dc.calcDuration(3 * 24 * 3600)) // Add 2 weeks

                gs.log("*** Error calculating duration");

            var newDateTime = dc.getEndDateTime();

            if (start_date < edt)

            {

                return 2; // Date entered is within the 2 weeks of lead time

            }

        }

    },

    compareDates: function() {

        var chg_start_date = this.getParameter('start_date');

        var chg_end_date = this.getParameter('end_date');

        if (chg_start_date > chg_end_date)

        {

            return true;

        }

        return false;

    },



});
