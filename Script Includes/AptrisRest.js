/******************

This is the scheduled job to kick off the calls
var token = new AptrisREST().getToken();
//gs.log('TOKEN: ' + token);
var getBooking = new AptrisREST().getBooking(token, -30, 2000);

********************/
var AptrisREST = Class.create();
AptrisREST.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getToken: function() {

        var r = new sn_ws.RESTMessageV2('EMS API', 'Get Token');
        var response = r.execute();
        var responseBody = response.getBody();
        var httpStatus = response.getStatusCode();

        var parser = new JSONParser();
        var parsedResponse = parser.parse(responseBody);
        var token = parsedResponse.clientToken.toString();
        //gs.log('--| scriptInclude - Token: '+parsedResponse.clientToken);

        return token;
    },

    getBooking: function(token, days, pageSize, formattedMinDate, formattedMaxDate) {

        this.token = token;

        //Set Defaults
        //  days is how far back we look for bookings
        //  pageSize is how many we return per call
        days = days ? days : -30;
        pageSize = pageSize ? pageSize : 2000;

        var bookingRestMessage;

        var date = new GlideDate();
        date.addDays(days);
        var newDate = date.getByFormat('YYYY-MM-dd');
        var finalDate = newDate + 'T00:00:00Z';

        // Use days or use min/max method
        if (!formattedMinDate && !formattedMaxDate) {
            bookingRestMessage = new sn_ws.RESTMessageV2('EMS Search Bookings', 'Search for minDateChanged');
            bookingRestMessage.setStringParameterNoEscape('page', '1');
            bookingRestMessage.setStringParameterNoEscape('token', token);
            bookingRestMessage.setStringParameterNoEscape('pageSize', pageSize);
            bookingRestMessage.setStringParameterNoEscape('date', finalDate);

        } else {
            bookingRestMessage = new sn_ws.RESTMessageV2('EMS Search Bookings', 'Search for min and max');
            bookingRestMessage.setStringParameterNoEscape('page', '1');
            bookingRestMessage.setStringParameterNoEscape('token', token);
            bookingRestMessage.setStringParameterNoEscape('pageSize', pageSize);
            bookingRestMessage.setStringParameterNoEscape('date', formattedMinDate);
            bookingRestMessage.setStringParameterNoEscape('maxDate', formattedMaxDate);

        }

        var response = bookingRestMessage.execute();
        var httpStatus = response.getStatusCode();
        var responseBody = response.getBody();

        if (httpStatus == 200) {
            var parser = new JSONParser();
            var allBookingsJSON = parser.parse(responseBody);
            var resultsCount = allBookingsJSON.resultsCount;

            gs.log('--|Count: ' + resultsCount);
            gs.log('--|Count2: ' + allBookingsJSON.results.length);
            //gs.log('--|DATE: '+finalDate);
            //gs.log('--|'+httpStatus);
            //gs.log('--|Body: '+responseBody);


            // Iterate through allBookingsJSON,  it holds all the bookings
            for (var i = 0; i < allBookingsJSON.results.length; i++) {

                // Let's get one of the bookings from the restmessage result list
                var singleBookingsObject = allBookingsJSON.results[i];

				//Log JSON Packages
				gs.log(JSON.stringify(singleBookingsObject, null, 4),'Rich');

                // Let's pull the reservationId and bookingId from our current singleBookingsObject
                var reservationID = singleBookingsObject.reservation.id.toString();
                var bookingID = singleBookingsObject.id.toString();
                this.bookingID = bookingID;

                // Check to see if a work order has already been created from this booking
                var currentWorkOrderGr = new GlideRecord('wm_order');
                currentWorkOrderGr.addQuery('u_booking_id', bookingID);
                currentWorkOrderGr.query();

                // If we find an already matching booking order we run an update
                if (currentWorkOrderGr.next()) {
                    currentWorkOrderGr = this.updateWorkOrderFromResultObject(currentWorkOrderGr, singleBookingsObject);
                    this.stampWorkOrderWithAnyErrors(currentWorkOrderGr);

                    // Otherwise insert
                } else {
                    currentWorkOrderGr = this.createWorkOrderFromResultObject(singleBookingsObject);
                    this.stampWorkOrderWithAnyErrors(currentWorkOrderGr);

                }
            }
        } else if (httpStatus == 404) {
            gs.log('--|NO RESULTS FOR DATE: ' + finalDate);
        } else {
            gs.log('--|ERROR RUNNING EMS QUERY');
        }

    },


    // Create a workorder from a booking object
    createWorkOrderFromResultObject: function(singleBookingsObject) {

        var workOrder = new GlideRecord('wm_order');
        workOrder.initialize();
        this.skills = [];
        //gs.info('to work order bookingID: ' + this.bookingID);

        // We check if there is any service orders and put any media skills into this.skills
        if (singleBookingsObject.hasServiceOrders) {
            var serviceOrderResponse = this.getServiceOrderResponseObject(this.bookingID, this.token);
            //gs.info('BPS Respomse XML' + serviceOrderResponse);
            this.skills = this.getResourceIdsFromServiceOrderResponse(serviceOrderResponse);
        }

        // After checking we do not continue creation if there are no service orders, or no related media skills
        if (!singleBookingsObject.hasServiceOrders || (this.skills.length <= 0)) {
            return false;
        }

        // Otherwise we create
        return this.updateWorkOrderFromResultObject(workOrder, singleBookingsObject, true);
    },


    // Update a workorder from a booking object
    // If inserting make sure to use isInsert flag
    updateWorkOrderFromResultObject: function(workOrderGr, singleBookingsObject, isInsert) {


        var reservationId = singleBookingsObject.reservation.id.toString();
        workOrderGr.u_reservation_id = reservationId;
        workOrderGr.state = '10';
        workOrderGr.u_event_location = singleBookingsObject.room.description;
        workOrderGr.u_booking_id = singleBookingsObject.id.toString();
        workOrderGr.short_description = singleBookingsObject.eventName;
        workOrderGr.u_group = singleBookingsObject.group.name.toString();
        workOrderGr.u_reserved_start_time = new AptrisDateUtil().ISODateTimeToGlideDateTime(singleBookingsObject.reserveStartTime);
        workOrderGr.u_reserved_end_time = new AptrisDateUtil().ISODateTimeToGlideDateTime(singleBookingsObject.reserveEndTime);
        workOrderGr.u_event_start_time = new AptrisDateUtil().ISODateTimeToGlideDateTime(singleBookingsObject.eventStartTime);
        workOrderGr.u_event_end_time = new AptrisDateUtil().ISODateTimeToGlideDateTime(singleBookingsObject.eventEndTime);
        workOrderGr.task_created = true;
        if (singleBookingsObject.reservation.webUserId == '') {
            //webUserId empty
        } else {
            var user_sys_id = new this.getSysUserFromWebUser(singleBookingsObject.reservation.webUserId);
            workOrderGr.caller = user_sys_id.getUniqueValue();
            var userGR = new GlideRecord('sys_user');
            userGR.addEncodedQuery('sys_id=' + user_sys_id.getUniqueValue());
            userGR.query();
            if (userGR.next()) {
                workOrderGr.u_caller_phone = userGR.phone;
            }
        }

        var reservationObject = this.getReservationResponseObjectById(reservationId, this.token);
        workOrderGr.u_33_digit_code = reservationObject.billingReference;
        workOrderGr.u_caller_email = reservationObject.contact.emailAddress;
        workOrderGr.u_estimated_event_attendance = reservationObject.estimatedAttendance;
		gs.log('Comments: ' + reservationObject.comment,'Rich');


        if (isInsert) {
            workOrderGr.insert();
        } else {
            workOrderGr.update();
        }

        //if (singleBookingsObject.hasServiceOrders) {
        var serviceOrderResponse = this.getServiceOrderResponseObject(this.bookingID, this.token);
        //workOrderGr.skills = this.getResourceIdsFromServiceOrderResponse(serviceOrderResponse);
        //workOrderGr.u_service_order_id = serviceOrderResponse.results.serviceOrderDetails.serviceOrderId;
        this.createWorkOrderTasks(serviceOrderResponse, workOrderGr);
        this.cancelUnmatchedWorkOrderTasks(serviceOrderResponse, workOrderGr);
        //}

        return workOrderGr;
    },

    stampWorkOrderWithAnyErrors: function(workOrderGr) {

        // If work order is not a valid record, we do not run the rest
        if (!workOrderGr.isValidRecord()) {
            return;
        }

        // Log any insert errors, usually skill insert errors
        if (this.errorComments && this.errorComments.length > 0) {
            var errorNote = "";

            this.errorComments.forEach(function(err) {
                errorNote += err + "\n";
            });

            workOrderGr.work_notes = errorNote;
            workOrderGr.update();

            gs.error(errorNote);
            this.errorComments = [];
        }
    },


    getReservationResponseObjectById: function(reservationId, token) {

        // To avoid extra rest messages, let's store our reservation objects
        if (!this.reservationHistory) {
            this.reservationHistory = {};
        }

        // Use reservation history if possible
        if (this.reservationHistory[reservationId]) {
            return this.reservationHistory[reservationId];
        }

        // If token is not passed in, we generate a new one
        if (!token) {
            token = this.getToken();
        }

        var r = new sn_ws.RESTMessageV2('EMS Get  Reservations', 'Get  Reservations');
        r.setStringParameterNoEscape('token', token);
        r.setStringParameterNoEscape('reservationId', reservationId);
        var response = r.execute();
        var httpStatus = response.getStatusCode();
        var responseBody = response.getBody();

        var parser = new JSONParser();
        var parsedResponse = parser.parse(responseBody);

        // Save to reservation history
        this.reservationHistory[reservationId] = parsedResponse;

        return parsedResponse;
    },


    // Get a service order from booking id
    getServiceOrderResponseObject: function(bookingID, token) {

        // If token is not passed in, we generate a new one
        if (!token) {
            token = this.getToken();
        }

        var r = new sn_ws.RESTMessageV2('EMS Search Service Order', 'Search Service Order');
        r.setStringParameterNoEscape('token', token);
        r.setStringParameterNoEscape('bookingId', bookingID);
        var response = r.execute();
        var responseBody = response.getBody();
        //gs.info('BPZ XML' + responseBody);
        var httpStatus = response.getStatusCode();

        var parser = new JSONParser();
        var parsedResponse = parser.parse(responseBody);

        return parsedResponse;
    },


    // Get array of skillIds
    getResourceIdsFromServiceOrderResponse: function(serviceOrderResponse) {

        var arryOfSkills = [];
        this.errorComments = [];

        // We insert into the array all the services tied to this booking id
        serviceOrderResponse.results.forEach(function(serviceOrder) {

            try {
                var resourceId = serviceOrder.serviceOrderDetails[0].resource.id + '';
                var serviceOrderId = serviceOrder.serviceOrderDetails[0].serviceOrderId;
                //gs.info('BPZ2' + serviceOrderId);
                var resourceDescription = serviceOrder.serviceOrderDetails[0].resource.description + '';


                // This service order has a skill, if that skill matches one from our table, we add to the work order.skills
                var skillGr = new GlideRecord("cmn_skill");
                if (skillGr.get("u_resource_id", resourceId)) {
                    arryOfSkills.push(skillGr.getValue("sys_id"));
                }

                // Notate error and log any readying errors
            } catch (err) {
                gs.error(err);
                this.errorComments.push("Could not add skill.  " + err);

            }
        }, this);

        // We put it into an array and add to the skills field
        return arryOfSkills.join(",");
    },

    //Create missing work order tasks
    createWorkOrderTasks: function(serviceOrderResponse, workOrderGr) {
        //Variables
        var resourceidvalue = '';
        for (var i = 0; i < serviceOrderResponse.results.length; i++) {
            for (var x = 0; x < serviceOrderResponse.results[i].serviceOrderDetails.length; x++) {
                resourceidvalue = serviceOrderResponse.results[i].serviceOrderDetails[x].resource.id + '';
                var skill_gr = new GlideRecord('cmn_skill');
                skill_gr.addQuery('u_resource_id', resourceidvalue);
                skill_gr.query();
                if (skill_gr.next()) {

					//Add Lead Time
					var leadTime = parseInt(skill_gr.u_lead_time, 10);
					leadTime = leadTime * -60;
					var taskExpectedStart = new GlideDateTime(workOrderGr.u_reserved_start_time);
					taskExpectedStart.addSeconds(leadTime);


                    var workordertask_gr = new GlideRecord('wm_task');
                    var serviceorderid = serviceOrderResponse.results[i].serviceOrderDetails[x].id + '';
                    if (workordertask_gr.get('u_service_order_id', serviceorderid)) {
                        //Found existing task, skip
                    } else {
                        //No task found creating task
                        var createTaskGR = new GlideRecord('wm_task');
                        createTaskGR.initialize();
                        //createTaskGR.setWorkflow(false);
                        createTaskGR.parent = workOrderGr.sys_id;
                        createTaskGR.u_caller = workOrderGr.caller;
                        createTaskGR.u_caller_phone = workOrderGr.u_caller_phone;
                        createTaskGR.u_caller_email = workOrderGr.u_caller_email;
                        createTaskGR.u_event_location = workOrderGr.u_event_location;
                        createTaskGR.short_description = workOrderGr.short_description;
                        createTaskGR.description = workOrderGr.description;
                        createTaskGR.state = '10'; //Pending Dispatch;
                        createTaskGR.dispatch_group.setDisplayValue('SN Media Services Managers');

						//Need to see what field lead timed start needs to be set to for Central Dispatch
						createTaskGR.expected_start = taskExpectedStart;

                        createTaskGR.u_reserved_start_time = workOrderGr.u_reserved_start_time;
                        createTaskGR.u_reserved_end_time = workOrderGr.u_reserved_end_time;
                        createTaskGR.u_event_start_time = workOrderGr.u_event_start_time;
                        createTaskGR.u_event_end_time = workOrderGr.u_event_end_time;
                        createTaskGR.u_reservation_id = workOrderGr.u_reservation_id;
                        createTaskGR.u_booking_id = workOrderGr.u_booking_id;
                        createTaskGR.u_event_type = workOrderGr.u_event_type;
                        createTaskGR.u_estimated_event_attendance = workOrderGr.u_estimated_event_attendance;
                        createTaskGR.u_service_order_id = serviceOrderResponse.results[i].serviceOrderDetails[x].id + '';
                        createTaskGR.u_group = workOrderGr.u_group;
                        createTaskGR.u_account = serviceOrderResponse.results[i].serviceOrderDetails[x].resource.accountId + '';
                        createTaskGR.skills = skill_gr.sys_id;
                        //Get Group record from skills
                        var skill_group_gr = new GlideRecord('sys_group_has_skill');
                        if (skill_group_gr.get('skill', skill_gr.sys_id)) {
                            createTaskGR.assignment_group = skill_group_gr.group.sys_id;
                            createTaskGR.u_price = skill_group_gr.skill.u_price;
                        }
                        createTaskGR.u_requested_package = skill_gr.sys_id;
                        createTaskGR.insert();
                    }
                }
            }
        }
    },

    //Check for extra tasks that may have been removed from the booking record and cancels them
    cancelUnmatchedWorkOrderTasks: function(serviceOrderResponse, workOrderGr) {
        //Variables
        var arrayUtil = new ArrayUtil();
        var serviceorder_id = new Array();

        for (var i = 0; i < serviceOrderResponse.results.length; i++) {
            for (var x = 0; x < serviceOrderResponse.results[i].serviceOrderDetails.length; x++) {
                serviceorder_id.push(serviceOrderResponse.results[i].serviceOrderDetails[x].id);
            }
        }
        var workordertask_gr = new GlideRecord('wm_task');
        workordertask_gr.addQuery('parent', workOrderGr.sys_id);
        workordertask_gr.addNotNullQuery('u_service_order_id');
        workordertask_gr.query();
        while (workordertask_gr.next()) {
            if (arrayUtil.indexOf(serviceorder_id, workordertask_gr.u_service_order_id) >= 0) {
                //Matches, do nothing
            } else {
                //Doesn't match
                workordertask_gr.state = 7;
                workordertask_gr.setWorkflow(false);
                workordertask_gr.update();
            }
        }
    },

    //Get webUser record from the Booking record
    getSysUserFromWebUser: function(webUserId) {
        //Variables
        var json = new global.JSON();
        var json_result_object_webUser = [];
        var match_score = 0;
        var match_value = 0;
        var user_sys_id = '';
        //Token check
        if (!token) {
            token = this.getToken();
        }

        var webUser_message = new sn_ws.RESTMessageV2('EMS Web User', 'Get User');
        webUser_message.setStringParameterNoEscape('token', token);
        webUser_message.setStringParameterNoEscape('webUserId', webUserId);
        var webUser_response = webUser_message.execute();
        var webUser_responseBody = webUser_response.getBody();
        var webUser_httpStatus = webUser_response.getStatusCode();
        if (webUser_httpStatus == '200') {
            match_value = 0;
            json_result_object_webUser = JSON.parse(webUser_responseBody);
            var user_gr = new GlideRecord('sys_user');
            user_gr.addQuery('user_name', 'STARTSWITH', json_result_object_webUser.networkId);
            user_gr.query();
            while (user_gr.next()) {
                match_value = 0;
                if (user_gr.email == json_result_object_webUser.emailAddress) {
                    match_value = match_value + 2;
                }
                if (user_gr.name == json_result_object_webUser.userName) {
                    match_value = match_value + 1;
                }
                if (user_gr.active == true) {
                    match_value = match_value + 1;
                }
                if (match_value > match_score) {
                    user_sys_id = user_gr;
                    match_score = match_value;
                }
            }
            if (user_sys_id == '') {
                return "";
            } else {
                return user_sys_id;
            }
        } else {
            gs.error("EMS WebUser message error = " + webUser_response);
            return "";
        }
    },

    type: 'AptrisREST'
});
