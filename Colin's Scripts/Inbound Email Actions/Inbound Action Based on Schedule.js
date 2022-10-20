var schedRec = new GlideRecord('cmn_schedule');               // Query table for schedule
schedRec.get('William Blair Business hours ( 7:30 - 5:00 M-F)(excluding US holidays)');       // Get the schedule name
var sched = new GlideSchedule(schedRec.sys_id);               // Create variable schedule
var schedTime = new GlideDateTime();                       // Create variable current datetime
schedTime.addSeconds(120);                                       // Add 15 min to variable datetime
// If datetime during business hours Pacific time zone
if (sched.isInSchedule(schedTime,'US/Central')) {
      // Route task to Data Center
      //gs.addInfoMessage('In schedule - Route to Data Center');
      gs.log('Schedule is in the time','Rich');
      //return 'yes';
      }
// If datetime after business hours Pacific time zone
else {
      // Router task to Command Center
      //gs.addInfoMessage('Not in schedule - Route to Command Center');
      //return 'no';
      }
