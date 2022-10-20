//html
<div class="col-sm-12">
  <div class="panel panel-default">
 	 <div class="panel-heading">
    	<h1>Contact HLS ITS</h1>
     <h5>If you have an HLS HarvardKey, please click "Login" in the upper right hand corner.</h5>
     <!--	<h5>If you have an HLS Harvard Key, please click here: <button type="button" class="btn button-primary" ng-click="loginRedirect()">Log In</button></h5> -->
    	<h5>Having trouble with your HLS HarvardKey or if you don't have an HLS HarvardKey - please use the form below.</h5>
    </div>
  		<div class="panel-body">
    	    <form ng-model="publicincident" name="publicincident">
        	   <div class="form-row">
               <div class="form-group col-md-6">
                <label for="firstname">First name</label>
                <span ng-class="{'errLabel': !firstname.length, 'valid': firstname.length}" ng-show="!firstname.length">*</span>
                <input type="text" ng-class="{'errInput': !firstname.length, 'valid': firstname.length}" class="form-control" id="firstname" ng-model="firstname" placeholder="First name" required>
               </div>
              <div class="form-group col-md-6">
                <label for="lastname">Last name</label>
                <span ng-class="{'errLabel': !lastname.length, 'valid': lastname.length}" ng-show="!lastname.length">*</span>
                <input type="text" ng-class="{'errInput': !lastname.length, 'valid': lastname.length}" class="form-control" id="lastname" placeholder="Last name" ng-model="lastname" required>
              </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="email">Email</label>
              <span ng-class="{'errLabel': !email.length, 'valid': email.length}" ng-show="!email.length">*</span>
              <input type="email" ng-class="{'errInput': !email.length, 'valid': email.length}" class="form-control" id="email" placeholder="john.smith@harvard.edu" ng-model="email" required>
            </div>
            <div class="form-group col-md-6">
              <label for="phonenumber">Phone number</label>
              <span ng-class="{'errLabel': !phonenumber.length, 'valid': phonenumber.length}" ng-show="!phonenumber.length">*</span>
              <input type="tel" ng-class="{'errInput': !phonenumber.length, 'valid': phonenumber.length}" class="form-control" id="phonenumber" placeholder="(617) 867-539" ng-model="phonenumber" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="description">How can we help you?</label>
              <span ng-class="{'errLabel': !description.length, 'valid': description.length}" ng-show="!description.length">*</span>
              <textarea ng-class="{'errInput': !description.length, 'valid': description.length}" class="form-control" rows="5" id="description" placeholder="Let us know what we can do to help!" ng-model="description" required></textarea>
            </div>
          </div>
   </form>
      </div>
    	<div class="panel panel-footer text-right">
        <button type="button" class="btn button-primary" ng-disabled="!firstname || !lastname || !email || !phonenumber || !description" ng-click="submit()">Submit</button>
      </div>
 	</div>
</div>

//css

.panel-heading {
  background-color: $brand-warning;
}
h1{
 color: #f0f3f4;
}

h5 {
 color: darken(#fff, 20%);
}


.panel-footer {
 background-color: #A51C30;
 margin-bottom: 0px;
}

.button-primary {
 color: #1E1E1E
}


.button-primary:hover {
	background-color: darken($brand-primary, 20%);
  color: darken(#fff, 20%);
}

.errLabel {
 color:red;

}

.errInput {
   border-color:red;
}

a:hover {
 color:#1E1E1E;
}

//client
function($scope) {
  var c = this;

	$scope.submit = function() {
			c.server.get({
				"firstname": $scope.firstname,
				"lastname": $scope.lastname,
				"email": $scope.email,
				"phonenumber": $scope.phonenumber,
				"description": $scope.description
		});
		document.location = "/sp?id=public_thankyou_page";
	}

	$scope.loginRedirect = function() {
		document.location = c.data.login;
	}

}

//server
(function() {
	if (input) {
		var restContent = {};
		restContent.watch_list = input.email;
		restContent.short_description = input.description;
		restContent.u_preferred_contact_number = input.phonenumber;
		restContent.u_boolean_3 = 'true';
		restContent.u_first_name = input.firstname;
		restContent.u_last_name = input.lastname;
		restContent.u_email = input.email;
		restContent.caller_id = gs.getProperty('public.user.sys_id');
		restContent.contact_type = 'self-service';
		restContent.impact = '3';
		restContent.assignment_group = gs.getProperty('its.tss.primary_assignment');
		var notes = 'Name: ' + input.firstname + ' ' + input.lastname;
		notes += '\nPhone: ' + input.phonenumber;
		notes += '\nDescription: ' + input.description;
		restContent.work_notes = notes;
		//gs.log(JSON.stringify(restContent), 'rp');
		var request = new sn_ws.RESTMessageV2();
		request.setEndpoint(gs.getProperty('glide.servlet.uri') + 'api/now/table/incident');
		request.setHttpMethod('POST');

		//Eg. UserName="public", Password="admin" for this code sample.
		var user = 'public';
		var password = 'password';

		request.setBasicAuth(user,password);
		request.setRequestHeader("Accept","application/json");
		request.setRequestHeader('Content-Type','application/json');
		request.setRequestBody(JSON.stringify(restContent));
		var response = request.execute();
	}

	data.login = 'https://www.pin1.harvard.edu/cas/login?service=https%3A%2F%2Fkey-idp.iam.harvard.edu%2Fidp%2FexternalAuthnCallback%3Fconversation%3De2s1%26__authen_application%3Dhttps%3A%2F%2F' + gs.getProperty('glide.servlet.uri');
})()

//link function
function(scope, elem){
    scope.setFocusToAttachment = function () {
		setTimeout(function () {
			var inboxArray = elem.find("a.view-attachment");
			inboxArray.focus();
		}, 100);
	}
}
//dependency
//scToggleData
// <sc-toggle-data sn-data="HTML object" sn-limit="" sn-less-text="Read Less" sn-more-text="Read More"></sc-toggle-data>
function scToggleData(i18n, cabrillo) {
	"use strict";
	return {
		restrict: 'E',
		scope: {
			moreText: '@snMoreText',
			lessText: '@snLessText',
			limit: '<snLimit',
			data: '<snData'
			},

		template: '<now-message key="Show more" value="${Show more}"/>' +
				'<now-message key="Show less" value="${Show less}"/>',

		link: function(scope, elem) {
			var moreText = scope.moreText ||  i18n.getMessage('Show more');
			var lessText = scope.lessText || i18n.getMessage('Show less');

			var moreTextCmp = ' <a class="read-more">' + moreText + '</a>';
			var lessTextCmp = ' <a class="read-less">' + lessText + '</a>';

			if (cabrillo.isNative()) {
					moreTextCmp = ' <div style="display: flex;justify-content: center;align-items: center;" class="m-t"> <a class="read-more">' + moreText + '</a></div>';
					lessTextCmp = ' <div style="display: flex;justify-content: center;align-items: center;" class="m-t"> <a class="read-less">' + lessText + '</a></div>';
			}

			var limit = angular.isUndefined(scope.limit) || !scope.limit || scope.limit < 1 ? 150 : scope.limit;
			var text = angular.isUndefined(scope.data) ? '' : scope.data;
			var ellipsis = '...';

			var textHtml = String(text);
			var textNonHtml = textHtml.replace(/<([^>\s]*)[^>]*>/gm, '');
			var charCount = textNonHtml.length;

			if (charCount > limit)
				textHtml = htmlSubstring(textHtml, limit, ellipsis, moreTextCmp, lessTextCmp);

			elem.html(textHtml);
			elem.find('.read-more').on('click', function() {
				elem.find('.less-text').hide();
				elem.find('.more-text').show();
				});

			elem.find('.read-less').on('click', function() {
				elem.find('.more-text').hide();
				elem.find('.less-text').show();
				});

			function htmlSubstring(textHtml, limit, ellipsis, moreText, lessText) {
				var tags;
				var tagFinder = /<([^>\s]*)[^>]*>/gm;
				var stack = [];
				var lastTagIndex = 0;
				var result = '';

				//finding tag in each line
				while ((tags = tagFinder.exec(textHtml)) && limit) {
					//get the text between previous iteration tag-end index and current iteration tag-start index.
					var temp = textHtml.substring(lastTagIndex, tags.index).replace(/\s\s+/g,'').substr(0, limit);
					result += temp;
					limit -= temp.length;
					lastTagIndex = tagFinder.lastIndex;	//updating last-index of current iteration

					if (limit) {
						result += tags[0];
						if (tags[1].indexOf('/') === 0)
							stack.pop();
						else if (tags[1].lastIndexOf('/') !== tags[1].length-1)
							stack.push(tags[1]);
					}
				}

				result += ellipsis + moreText;
				//fix the unclosed tags
	    	    while (stack.length) {
	    	    	result += '</' + stack.pop() + '>';
	    	    	}

	    	    result = '<span class="less-text">' + result +  '</span><span class="more-text">' + textHtml + lessText + '</span>';
	    	    return result;

			}
		}
	};

}

//scBindHtmlComplete
function scBindHtmlCompile($compile, $sce) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$watch(
				function(scope) {
					// watch the 'compile' expression for changes
					return scope.$eval(attrs.scBindHtmlCompile);
				},
				function(value) {
					// when the 'compile' expression changes
					// assign it into the current DOM
					element.html($sce.getTrustedHtml(value) + '');

					// compile the new DOM and link it to the current
					// scope.
					// NOTE: we only compile .childNodes so that
					// we don't get into infinite loop compiling ourselves
					$compile(element.contents())(scope);
				}
			);
		}
	};
}

//option schema:
[{"name":"show_add_cart_button","label":"Show Add Cart Button","type":"boolean"},{"hint":"If you turn on this, you will be able to see field validation messages on right side","name":"show_field_validation_messages","default_value":"true","label":"Show field validation messages","type":"boolean"},{"hint":"Show Add/Update Wish List buttons","name":"show_add_to_wishlist_button","default_value":"true","label":"Show Add/Update Wish List buttons","type":"boolean"},{"hint":"Order item section on top. If you uncheck this, order section will be displayed at bottom of screen","name":"display_cart_on_right","default_value":"true","label":"Order Item Section On Top","type":"boolean"},{"hint":"Show item description in few words with an option to read more","name":"show_less_description","default_value":"true","label":"Enable Show More/Less for Item description on Mobile","type":"boolean"}]
