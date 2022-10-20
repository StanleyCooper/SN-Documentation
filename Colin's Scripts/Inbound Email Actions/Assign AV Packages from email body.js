//Set the email body to a string variable
var body = email.body_text.toString();
gs.log(body,'bodyonly');
//stringify the body to allow for searching
var bodyHtml = JSON.stringify(body);

//Grab location with date of request
var location = bodyHtml.substring(bodyHtml.indexOf('Location:') + 13, bodyHtml.indexOf('Setup:') - 4);

//Create an array and query for all packages on the u_av_packages table
var packages = [{
	//name: '',
	//assignment_group: '',
	//service: ''
}];
var count = 0;
var gr = new GlideRecord('u_av_packages');
gr.query();
while(gr.next()){
	//create a glide record object and populate the array
	var name = gr.name.toString();
	var assignment_group = gr.assignment_group.toString();
	var service = gr.u_service.toString();
	packages.push({
		name: name,
		assignment_group: assignment_group,
		service: service
	});
	count++;
}

//The next grouping of While statements searches the email for each instance of the reservations details and returns the positions
//query for event dates and return the positions
var eventDatePositions = [];
var re = /Date:/g,
str = bodyHtml;
while ((match = re.exec(str)) != null) {
	eventDatePositions.push(match.index);
}

//query for Service Time and return the positions
var serviceTimePositions = [];
var ser = /Service Time:/g,
str = bodyHtml;
while ((match = ser.exec(str)) != null) {
	serviceTimePositions.push(match.index);
}

// //query for service order positions
// var serviceOrderPositions = [];
// var sop = /New Service Order:/g,
// str = bodyHtml;
// while ((match = sop.exec(str)) != null) {
	// 	serviceOrderPositions.push(match.index);
	// }

	//query for Status position
	var statusPosition =[];
	var stpos = /Status:/g,
	str = bodyHtml;
	while ((match = stpos.exec(str)) != null) {
		statusPosition.push(match.index);
	}

	//query for Service Order ID position
	var serviceOrderID =[];
	var soid = /Service Order ID:/g,
	str = bodyHtml;
	while ((match = soid.exec(str)) != null) {
		serviceOrderID.push(match.index);
	}

	//query for Reservation ID position
	var reservationID =[];
	var rsid = /Reservation ID:/g,
	str = bodyHtml;
	while ((match = rsid.exec(str)) != null) {
		reservationID.push(match.index);
	}

	//query for group ID position
	var groupID =[];
	var grip = /Group:/g,
	str = bodyHtml;
	while ((match = grip.exec(str)) != null) {
		groupID.push(match.index);
	}

	//query for location
	var locationID =[];
	var lid = /Location:/g,
	str = bodyHtml;
	while ((match = lid.exec(str)) != null) {
		locationID.push(match.index);
	}

	//query for setup
	var setupID =[];
	var setID = /Setup:/g,
	str = bodyHtml;
	while ((match = setID.exec(str)) != null) {
		setupID.push(match.index);
	}

	//query for event ID
	var eventID =[];
	var evID = /Event:/g,
	str = bodyHtml;
	while ((match = evID.exec(str)) != null) {
		eventID.push(match.index);
	}

	//query for event Type
	var eventType =[];
	var evtID = /Event Type:/g,
	str = bodyHtml;
	while ((match = evtID.exec(str)) != null) {
		eventType.push(match.index);
	}

	//query for status
	var status =[];
	var statID = /Status:/g,
	str = bodyHtml;
	while ((match = statID.exec(str)) != null) {
		status.push(match.index);
	}

	//query for quantity
	var quantity =[];
	var quid = /Quantity/g,
	str = bodyHtml;
	while ((match = quid.exec(str)) != null) {
		quantity.push(match.index);
	}

	//create an array for each reservation date - used to populate the different event packages found in the individual events body
	var reservationDescription = [];
	var rd = /Description/g,
	str = bodyHtml;
	while ((match = rd.exec(str)) != null) {
		reservationDescription.push(match.index);
	}

// 	//get Package Quantity Positions
	var bodyNoSpaces = body.replace(/(\r\n|\n|\r)/gm, "");
	var packageQuantityPositions = [];
 	var quantStart = /(?:\*)[0-9]/g; //search for a star, any number then a letter
 	str = bodyNoSpaces;
 	while ((match = quantStart.exec(str)) != null) {
 		var a = match.index;
 		packageQuantity.push(a);

 	}
	//create an array for each reservation date found in the email
	//This array holds different properties of each days event
	var eventDates = [];
	for (var x=0; x < eventDatePositions.length; x++) {

		//Set a variable for each parameter of the day's event
		var eDate = bodyHtml.substring(eventDatePositions[x] + 5,serviceTimePositions[x] - 3); //Date with day of week
		//var newServiceOrder = bodyHtml.substring(serviceOrderPositions[x] + 22, serviceOrderID[x] -4); //Service Order
		var newServiceOrderID = bodyHtml.substring(serviceOrderID[x] + 17, reservationID[x]-3); //Service Order ID
		var newReservationID = bodyHtml.substring(reservationID[x] + 15,groupID[x]-3); //Reservation ID
		var newGroup = bodyHtml.substring(groupID[x]+6,eventDatePositions[x]-3); //Group
		var newDate = bodyHtml.substring(eventDatePositions[x] + 6, serviceTimePositions[x] - 3); //Date with day of week
		var newServiceTime = bodyHtml.substring(serviceTimePositions[x] + 13,locationID[x]-3); //Service Time
		var newLocation = bodyHtml.substring(locationID[x] + 9,setupID[x]-3); //Location of event
		var newSetup = bodyHtml.substring(setupID[x] + 5,eventID[x]-3); //Setup type
		var newEvent = bodyHtml.substring(eventID[x] + 6,eventType[x]-3); //Event
		var newEventType = bodyHtml.substring(eventType[x] + 11,status[x]-3); //Event Type
		var newStatus = bodyHtml.substring(status[x] + 7, quantity[x]-6); //Status

		//Get date only in year-month-day to set the Due Date on incident tasks
		var dateOnly = newDate.split(' ')[0];
		dateOnly = dateOnly.split('/');
		var dMonth = dateOnly[0].toString();
		if(dMonth.length == 1){
			dMonth = '0' + dMonth;
		}
		var dDay = dateOnly[1].toString();
		if(dDay.length == 1){
			dDay = '0' + dDay;
		}
		var dYear = dateOnly[2].toString();
		dateOnly = dYear + '-' + dMonth + '-' + dDay + ' 00:00:00';

		//Create a variable to hold the event parameters in a formatted block
		var reserve = /*'New Service Order: ' + newServiceOrder + */'\nService Order ID: ' + newServiceOrderID + '\nReservation ID: ' + newReservationID + '\nGroup: ' + newGroup + '\nDate: ' + newDate + '\nService Time: ' + newServiceTime + '\nLocation: ' + newLocation + '\nSetup: ' + newSetup + '\nEvent: ' + newEvent + '\nEvent Type: ' + newEventType + '\nStatus: ' + newStatus;

		var packageBody = bodyHtml.substring(reservationDescription[x],serviceOrderID[x+1]).toString();

		var packageBodyNoSpaces = packageBody.replace(/\\n/g, "");
		//gs.log(packageBodyNoSpaces, 'Packagebody');

		//Push the desired parameters to the Event Dates array
		eventDates.push({
			date: eDate.toString(),
			dateOnly: dateOnly,
			location: newLocation,
			reservation: reserve,
			packageBody: packageBody,
			packageBodyNoSpaces: packageBodyNoSpaces
		});

	}
	//Create a loop for each eventDate object, the number of different event dates, found
	var packageCounter = 0;
	for (var j=0; j < eventDates.length; j++){

		//Create an array to store the packages found from the search below
		var fCount = 1;
		var packagesFound = [
		//fName: '',
		//fAssignment_group: '',
		//fService: ''
		//fQuantity
		];
		//var quantityCounter = 0;
		//for each package found in the packages array, the GR query of the entire AV Packages table, push the event to the packages found array
		for (var i=1; i < packages.length; i++) {

			if(eventDates[j].packageBody.indexOf(packages[i].name) !== -1) {
				//gs.log('J is ' + j + ' Package Body of J is ' + eventDates[j].packageBody, 'testPackageBody');
				//push found packages to array
				if(packages[i].name.toString() != ''){

					var foundName = packages[i].name.toString();
					var foundGroup = packages[i].assignment_group.toString();
					var foundService = packages[i].service.toString();

					var packageFoundQuantityPosition = eventDates[j].packageBodyNoSpaces.indexOf(packages[i].name);
					var newQuantity = eventDates[j].packageBodyNoSpaces.substring(packageFoundQuantityPosition-4,packageFoundQuantityPosition);
					newQuantity = newQuantity.replace('*','');

					packagesFound.push({
						fName: foundName,
						fAssignment_group: foundGroup,
						fService: foundService,
						fQuantity: newQuantity
					});

				}
				fCount++;
			}
		}

		//If two or more packages are found for any given event, create a parent incident to hold that days event details and create Incident Tasks to assign to the specific groups responsible for providing the services as defined on the AV Packages table.
		if(fCount > 2){
			//fCount = 1;

			var incident = new GlideRecord('incident');
			incident.initialize();
			incident.u_caller_not_found = true;
			incident.short_description = eventDates[j].date + ' ' + email.subject + ' ' + eventDates[j].location;
			//populate the top of the description with the found packages
			var description = 'Event Date: ' +  eventDates[j].date + '\nLocation: ' + eventDates[j].location +'\n\nRequested Packages:\n';
			for (var x=0; x < packagesFound.length; x++) {
				//gs.log('Event Date J is ' + j + ' package name is ' + packagesFound[x].fName  , 'packages found');
				description = description + '\n' + packagesFound[x].fName + ' - Quantity: ' + packagesFound[x].fQuantity;
			}
			incident.description = description + '\n\nReservation Information\n\n' + eventDates[j].reservation + '\n\nOriginal Email Body:\n' + email.body_text;
			incident.u_service_offering = '8998f807db4d7f00b017d6fa4b96197e'; //Service Offering is Media Services
			incident.assignment_group = '25c38bc7db30fb44b017d6fa4b96198f';	//assignment group is SN All Media
			incident.contact_type = 'email';
			incident.category = 'request';
			incident.impact = '4'; //individual
			incident.urgency = '3'; //Work unaffected
			incident.due_date.setDisplayValue(eventDates[j].dateOnly);
			incident.insert();

			//Attach PDF to the incident
			var sysAttach = new GlideSysAttachment();
			var emailSysId = sys_email.getUniqueValue();
			sysAttach.copy('sys_email',emailSysId,'incident',incident.sys_id);

			//create an incident task for each package found
			for (var x=0; x < packagesFound.length; x++) {
				var incidentTask = new GlideRecord('u_incident_task');
				incidentTask.initialize();
				incidentTask.short_description = eventDates[j].date + ' - Packages: ' + packagesFound[x].fName + ' - ' + email.subject + ' ' + eventDates[j].location;
				incidentTask.due_date.setDisplayValue(eventDates[j].dateOnly);
				incidentTask.description = 'Event Date: ' +  eventDates[j].date + '\nLocation: ' + eventDates[j].location + '\n\nRequested Packages:\n' + packagesFound[x].fName + ' - Quantity: ' + packagesFound[x].fQuantity + '\n\nReservation Information\n\n' + eventDates[j].reservation;// + '\n\n' + email.body_text;
				incidentTask.assignment_group = packagesFound[x].fAssignment_group;
				incidentTask.u_incident = incident.sys_id;
				packageCounter = packageCounter + 1;
				incidentTask.insert();
			}
			packagesFound = [];
		}

		//If only one package is found on a day's event create an incident to to assign to the specific groups responsible for providing the services as defined on the AV Packages table.
		else{

			var incident = new GlideRecord('incident');
			incident.initialize();
			incident.u_caller_not_found = true;
			incident.short_description = eventDates[j].date + ' ' + email.subject + ' ' + eventDates[j].location;
			//populate the top of the description with the found packages
			var description = 'Event Date: ' +  eventDates[j].date + '\nLocation: ' + eventDates[j].location + '\n\nRequested Packages:\n';
			description = description + '\n' + packagesFound[0].fName + ' - Quantity: ' + packagesFound[0].fQuantity;
			incident.description = description + '\n\nReservation Information\n\n' + eventDates[j].reservation + '\n\nOriginal Email Body:\n' + email.body_text;
			incident.u_service_offering = packagesFound[0].fService;
			incident.assignment_group = packagesFound[0].fAssignment_group;
			incident.contact_type = 'email';
			incident.category = 'request';
			incident.impact = '4'; //individual
			incident.urgency = '3'; //Work unaffected
			incident.due_date.setDisplayValue(eventDates[j].dateOnly);
			packageCounter = packageCounter + 1;
			incident.insert();

			//Attach PDF to the incident
			var sysAttach = new GlideSysAttachment();
			var emailSysId = sys_email.getUniqueValue();
			sysAttach.copy('sys_email',emailSysId,'incident',incident.sys_id);
		}
	}
