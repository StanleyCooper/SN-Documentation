///////////////////////////////
//
//
//   script include
//
////////////////////////////////

var validateStartDate = Class.create();
validateStartDate.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

	getneedbydate: function(){

    // set value from client script
		var start = this.getParameter('sysparm_fdt');
		//gs.info('date from client ' + start);
		var startDate = new GlideDateTime();
		startDate.setValue(start);
		//gs.info('Start date is ' + startDate);

    //get current date/time
		var todayDate = new GlideDateTime();
		//gs.info('Todays date ' + todayDate.getNumericValue() + " Start date " + startDate.getNumericValue());
		var days = 0 ;
		while (todayDate < startDate) {

				todayDate.addDaysLocalTime(1);
				if (todayDate.getDayOfWeekLocalTime() != 6 && todayDate.getDayOfWeekLocalTime() != 7)           //excluding Weekends
					{
					days++ ;
				}
			}
			gs.info('Days are  ' + days);

			if(days <= 10){
				return false;
			}
			else{
				return true;
			}

      //calculate the difference in date/times in milliseconds then round to next largest number
      function calcDur(startDate,endDate){
        var duration = (startDate.getNumericValue() - todayDate.getNumericValue()) / 8.64e+7;
        duration = Math.ceil(duration);
        //gs.info('The Duration is ' + duration);
      }


	}


	});



  /////////////////////
  //
  //
  //   Client script
  //
  //
  //////////////////////

  function onChange(control, oldValue, newValue, isLoading) {

	if (isLoading || newValue == '') {

		return;

	}

  // pass in as year month day
	var cdt = g_form.getValue('start_date'); //first Date/Time field
	cdt = cdt.toString().split('-');
	var dMonth = cdt[0];
	var dDay = cdt[1];
	var dYear = cdt[2];
	cdt = dYear + '-' + dMonth + '-' + dDay;

	//alert(cdt);

	var ajax = new GlideAjax('validateStartDate');
	ajax.addParam('sysparm_name','getneedbydate');
	ajax.addParam('sysparm_fdt', cdt);
	ajax.getXML(doSomething);
	function doSomething(response){
		var answer = response.responseXML.documentElement.getAttribute("answer");
		g_form.addInfoMessage(answer);

	}




}
