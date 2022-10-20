/****************************


HTML


*****************************/

<div id="getHelp"><h2>
  Submit a Help Ticket
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

        <div class="form-group">
          <label class="col-sm-12">*Store Name:</label>
          <div class="col-sm-12">
            <input type="text" name="storeName" ng-model="form.storeName" field="storeName" placeholder="" class="form-control" required>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12">*Your First &amp; Last Name:</label>
          <div class="col-sm-12">
            <input type="text" name="name" ng-model="form.name" field="name" placeholder="" class="form-control" required>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12">*Phone Number:</label>
          <div class="col-sm-12">
            <input type="tel" name="number" ng-model="form.number" field="number" placeholder="Format: 555-555-5555" class="form-control" required>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12">*What's your email address?</label>
          <div class="col-sm-12">
            <input type="email" name="email" ng-model="form.email" field="email" placeholder="" class="form-control" required>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12">*How many people are impacted by this issue?</label>
          <div class="col-sm-12">
            <select type="text" name="impact" field="impact" ng-model="form.impact" placeholder="" class="form-control required" required>
              <option value="1">More than 50</option>
              <option value="2">Between 2-50</option>
              <option value="3">One person</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-12">*Please describe the issue:</label>
          <div class="col-sm-12">
            <textarea name="description" field="description" ng-model="form.description" class="form-control" required></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-success" ng-click="c.submitForm(form.description,form.impact,form.email,form.number,form.name, form.storeName)">Submit </button>


      </form>
    </div>
  </div>
</div>




/*********************

Client script

********************/
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
	c.submitForm = function(description, impact, email, number, name, storeName) {
		if(!description || !impact || !email || !number || !name || !storeName){
			alert('All fields are mandatory.');
		}
		else{
			//alert('I functioned ' );
			c.data.op = 'submit';
			c.data.description = description;
			c.data.impact = impact;
			c.data.email = email;
			c.data.number = number;
			c.data.name = name;
			c.data.storeName = storeName;

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


/*********************

Server Script

*********************/


(function() {
	/* populate the 'data' object */
	/* Take the form values, validate input, & on submit create new Incident */
	data.form = {};


			if(input.op=='submit'){
				data.submitted = true;
				var inc = new GlideRecord('incident');
				inc.initialize();
				inc.description = "Submitted by a user not in the system: " + input.name + " at contact number " + input.number + ".\n Store Name: " + input.storeName + "\n Description: " + input.description;
				inc.contact_type = 'self-service';
				inc.caller_id.setDisplayValue('Guest');
				if (input.description.length > 80)
					inc.short_description = producer.comments.substring(0, 79);
				else{
					inc.short_description = input.description;
				}
				inc.impact = input.impact;
				inc.watch_list = input.email;
				inc.urgency = '3';
				data.myInc = inc.insert();

				var myinc = new GlideRecord('incident');
				myinc.get('sys_id',data.myInc);
				data.myIncNumber = myinc.number.toString();

			}

			})();


/******************

css

*****************/
/* fixes labels in editor */
label {
  color: red;
}
.formSubmitted {
  padding: 20px;
  font-size: 1.2em;
}
