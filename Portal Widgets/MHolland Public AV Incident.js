/***

HTML

***/

<div id="getHelp"><h2>
  Submit an AV Ticket
  </h2>
  <div ng-if="c.data.submitted" class="panel panel-default">
    <p class='formSubmitted'>
      Your ticket has been submitted. Reference Ticket number: {{c.data.myIncNumber}}
    </p>
  </div>
  <div ng-if="!c.data.submitted" class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">Get Help</h4>
    </div>
    <div class="panel-body">
      <form class="m-t form-horizontal" role="form">

        <div class="mandatory form-group">
          <label class="col-sm-12">*Your Name:</label>
          <div class="col-sm-12">
            <input type="text" name="yourName" ng-model="form.yourName" field="yourName" placeholder="" class="form-control" required>
          </div>
        </div>

        <div class="form-group">
          <label class="mandatory col-sm-12">*Room Location:</label>
          <div class="col-sm-12">
            <!--<input type="text" name="room" ng-model="form.room" field="room" placeholder="" class="form-control" required>-->
            <select type="text" name="room" field="room" ng-model="form.room" placeholder="" class="form-control required" required>
              <option value="All In">All In</option>
              <option value="Core Values">Core Values</option>
              <option value="Gold Standard">Gold Standard</option>
              <option value="Huddle Room">Huddle Room</option>
              <option value="Lake">Lake</option>
              <option value="LaSalle Conference Room">LaSalle Conference Room</option>
              <option value="Marvin’s Garden">Marvin’s Garden</option>
              <option value="Mtegrity">Mtegrity</option>
              <option value="North Shore">North Shore</option>
              <option value="Skybox">Skybox</option>
              <option value="United Center">United Center</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12">Phone Number:</label>
          <div class="col-sm-12">
            <input type="tel" name="number" ng-model="form.number" field="number" placeholder="Format: 555-555-5555" class="form-control">
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12">What's your email address?</label>
          <div class="col-sm-12">
            <input type="email" name="email" ng-model="form.email" field="email" placeholder="" class="form-control">
          </div>
        </div>

        <div class="form-group">
          <label class="mandatory col-sm-12">*AV Categories</label>
          <div class="col-sm-12">
            <select type="text" name="category" field="category" ng-model="form.category" placeholder="" class="form-control required" required>
              <option value="screen_sharing">Screen Sharing</option>
              <option value="phone">Phone</option>
              <option value="tablet">Tablet</option>
              <option value="audio">Audio</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12">Please describe the issue:</label>
          <div class="col-sm-12">
            <textarea name="description" field="description" ng-model="form.description" class="form-control"></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-success" ng-click="c.submitForm(form.yourName,form.room,form.number,form.email,form.category,form.description)">Submit </button>


      </form>
    </div>
  </div>
</div>



/***

CSS

***/

/* fixes labels in editor */
label.mandatory {
  color: red;
}
.formSubmitted {
  padding: 20px;
  font-size: 1.2em;
}


/***

Client Script

***/

function($scope, spUtil) {
  /* widget controller */

	var c = this;



	//	$scope.$on("field.change", function(evt, parms) {
	//		if (parms.field.name == 'location')
	//			c.data.setLocation = parms.newValue;

	//		c.server.update().then(function(response) {
	//			spUtil.update($scope);
	//		})
	//	});
	//process the input
	c.submitForm = function(yourName, room, number, email, category, description) {
		if(!yourName || !room || !category){
			alert('All fields are mandatory.');
		}
		else{
			//alert('I functioned ' );
			c.data.op = 'submit';
			c.data.description = description;
			c.data.yourName = yourName;
			c.data.category = category;
			c.data.room = room;
			c.data.number = number;
			c.data.email = email;


			c.server.update().then(function(response){
				//c.data.myRitm = response.ritm;

				//alert('Your ticket has been submitted.  Reference Ticket number: ' + c.data.myIncNumber);
			});
		}


	};
	c.locations = [];
	c.data.location = '';
	c.selected = {value: c.locations[0]};
	c.refreshLocation = function(query){
		if(query) {
			c.server.get({
				action: 'searchLocation',
				query: query
			}).then(function(response){
				c.locations = response.data.locations;
			});
		}
	};
	c.onSelectCallback = function(item, model) {
		c.data.location = item.sys_id;
	};
	c.remove = function (item) {
		var index = c.data.files.indexOf(item);
		c.data.files.splice(index, 1);
	};
}


/***

Server script

***/


(function() {
	/* populate the 'data' object */
	/* Take the form values, validate input, & on submit create new Incident */
	data.form = {};

			//if record submitted
			if(input.op=='submit'){
				data.submitted = true;

				//create new incident
				var inc = new GlideRecord('incident');
				inc.initialize();

				//if email is input
				if(input.email != ''){
					inc.u_guest_email = input.email;
				}
				else{
					inc.u_guest_email = 'N/A';
				}

				//Set INC Fields
				inc.short_description = 'AV Incident for ' + input.room;
				inc.description = 'AV INC Submitted\n\nName: ' + input.yourName + '\nRoom: ' + input.room + '\nPhone Number: ' + input.number + '\nEmail: ' + input.email + '\nCategory: ' + input.category + '\nDescription: ' + input.description;
				inc.contact_type = 'self-service';
				inc.category = 'av_conference_rooms';
				inc.subcategory = input.category;
				inc.assignment_group.setDisplayValue('Level 1 Infrastructure Support');

				//query for user
				var userLookupGR = new GlideRecord('sys_user');
				userLookupGR.addEncodedQuery('email=' + input.email.toString());
				userLookupGR.query();
				//if user found
				if(userLookupGR.next()){
					inc.caller_id = userLookupGR.sys_id;
				}
				else{
					inc.caller_id.setDisplayValue('Guest');
				}

				inc.urgency = '3';
				data.myInc = inc.insert();
				
				//send event for email notification
				gs.eventQueue('incident.av_incident',inc);

				var myinc = new GlideRecord('incident');
				myinc.get('sys_id',data.myInc);
				data.myIncNumber = myinc.number.toString();

			}

			})();
