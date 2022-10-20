//HTML

<div ng-if="!data.is_logged_in" class="sp-login-widget" ng-class="::(c.options.use_advanced == 'true' ? 'advanced' : '')">
  <form ng-if="!c.externalLoginMode" class="form-signin" ng-submit="c.login(c.username, c.password)" method="post">
		<div ng-class="::{'panel panel-default': c.options.show_panel}">
			<div ng-if="::c.options.show_panel" class="panel-heading padder-v">
				<h3 class="panel-title">${Login}</h3>
			</div>
			<div ng-class="::{'panel-body': c.options.show_panel}">
				<div class="list-group list-group-sm">
					<div class="list-group-item">
            <label for="username" class="sr-only label-advanced">{{::data.usernameMsg}}</label>
            <input id="username" name="username" autocapitalize="off" ng-keypress="c.message = ''" ng-click="c.message = ''" class="form-control no-border input-advanced" type="text" placeholder='{{::data.usernameMsg}}' autofocus="true" ng-model="c.username"/>
					</div>
					<div class="list-group-item">
            <label for="password" class="sr-only label-advanced">{{::data.passwordMsg}}</label>
            <input id="password" name="password" ng-keypress="c.message = ''" ng-click="c.message = ''" class="form-control no-border input-advanced" type="password" placeholder='{{::data.passwordMsg}}' ng-model="c.password"/>
					</div>
				</div>

				<div ng-if="c.message" class="alert alert-danger login-alert" role="alert">{{c.message}}</div>
				<div ng-if="c.success" class="alert alert-success login-alert" role="alert">{{c.success}}</div>

				<div ng-if="::!c.data.forgetMe" class="checkbox">
          <label>
            <input name="c.remember_me" ng-model="c.remember_me" checked="checked" id="remember_me" type="checkbox" class="checkbox" value="true"/> ${Remember me}
					</label>
				</div>
        <!--STRY50033370: Forgot Password link in the login widget-->

        <div class="forgot-pwd-div m-b">
          <div class="row">
            <div ng-if="::(c.data.forgotPwdLinkProp == 'true')" class="forgot-text" ng-class="::(c.options.use_advanced == 'true' ? 'col-xs-8' : 'col-xs-12')">
              <a class="forgot-pwd-link" ng-href="{{::c.data.pswdResetUrl}}" aria-label="${Please click here to reset your password}">${Forgot Password ?}</a>
            </div>
            <div ng-class="::(c.options.use_advanced == 'true' && c.data.forgotPwdLinkProp =='true' ? 'col-xs-4' : 'col-xs-12')">
              <button name="login" type="submit" class="btn btn-lg btn-primary btn-block login-button-old">
                ${Login}
              </button>
            </div>
          </div>
        </div>

        <div class="row set-login-type-link m-t" ng-if="::data.multisso_enabled">
          <div class="col-xs-12 text-center">
            <a href="javascript:void(0)"
               ng-click="c.setExternalLogin(true)">${Use external login}</a>
          </div>
        </div>
			</div>
		</div>
	</form>


  <!-- CDW RAC Single Point Login created new function to check whether or not user is internal to sn or external to AD -->
  <form ng-if="c.externalLoginMode" class="form-signin" ng-submit="c.userLookup(c.username)" method="post">
		<div ng-class="::{'panel panel-default': c.options.show_panel}">
			<div ng-if="::c.options.show_panel" class="panel-heading">
				<h3 class="panel-title">${External Login}</h3>
			</div>

			<div ng-class="::{'panel-body': c.options.show_panel}">
				<div class="list-group list-group-sm">
					<div class="list-group-item">
            <label for="username" class="sr-only label-advanced">${User ID}</label>
            <input id="username" name="username" ng-click="message = ''" class="form-control no-border input-advanced" type="text" placeholder='${User ID}' autofocus="true" ng-model="c.username"/>
					</div>
				</div>

        <div class="submit-btn row">
          <div class="col-xs-12">
            <button name="login" type="submit" class="btn btn-lg btn-primary btn-block">
              ${Next}
            </button>
          </div>
        </div>
        <div class="set-login-type-link row m-t">
          <div class="col-xs-12 text-center">
            <!--<a href="javascript:void(0)"
               ng-click="c.setExternalLogin(false)">${Use internal login}</a>  <br>-->
            <a href= "https://adaxes.ad.hmshost.com/Adaxes/Selfservice#/SelfPasswordReset" style="color:white" target="_blank">AD/SSO Password Reset</a>
          </div>

        </div>
      </div>
		</div>
	</form>


  <div class="sp-self-registration forgot-pwd-link" ng-if="::c.data.self_registration_record_producer">${Don't have an account?}
    <a ng-href="/{{::c.data.url_suffix}}?id=sn_user_registration&sys_id={{::c.data.self_registration_record_producer}}">{{::c.data.self_registration_label}}</a>
  </div>
</div>


//CSS

.sp-login-widget {

  .panel-body {
    padding: 15px 15px 10px;
  }

  .form-control,
  label[for="username"],
  label[for="password"] {
    color: black;
  }

  .btn {
    font-weight: 600;
    font-size: 2.0rem;
    background-color: $login-btn-bg;
    border-color: $login-btn-border;
  }

  .list-group {
    margin-bottom: 12px;
  }

  .login-button-old {
    margin-top: 7px;
  }

  .login-alert {
    margin-left: 0px;
    margin-right: 0px;
  }

}
//STRY50033370: Forgot Password link in the login widget
//Start -- login widget advanced view
.sp-login-widget.advanced {
  .panel-title {
    font-size: 25px;
  }

  .panel-default > .panel-heading {
    background-color: $panel-bg;
    border: 0px;
  }

  .panel-body {
    padding: 0px 0px 10px;
  }

  [placeholder]::-webkit-input-placeholder {
    transition: opacity 0.01s 0.01s ease !important;
    opacity: 0 !important;
  }

  .form-signin {
    .list-group-item {
      border: 0px;
    }

    .login-alert {
    margin-left: 15px;
    margin-right: 15px;
    }

    .btn {
      font-weight: 400 !important;
      border-color: $brand-primary;
      background-color: $brand-primary;
      border-radius: 2px;
    }

    .forgot-pwd-div {
      padding-right: 15px;
      padding-left: 15px;
      .forgot-text {
        font-size: 16px;
        line-height: 20px;
        padding-top: 8px;
      }

      .btn {
        line-height: 16px;
        font-size: 14px;
        margin-top: 0px;
      }

    }

    .submit-btn {
      padding-right: 15px;
      padding-left: 15px;
    }

    .input-advanced {
      margin-top: 10px;
      border: 1px solid $panel-default-border !important;
      border-radius: 3px !important;
      background-color: $panel-bg !important;
    }

    .checkbox {
      padding-left: 15px !important;
    }

    .label-advanced {
      position: relative;
      width: 100%;
      padding: 0;
      overflow: visible;
      border: 0;
      height: 19px;
      color: $text-color;
      font-size: 16px;
      line-height: 19px;
    }

  }

}
//End -- login widget advanced view
.sp-self-registration {
  text-align: center;
}



//Client
function loginCtrl($scope, $http, $window, $location, glideUserSession, glideSystemProperties, spUtil) {

	var c = this;
	c.remember_me = c.data.forgetMeDefault;
	//CDW MAR 20201104 - Start.  Force user to the External Login version
	c.externalLoginMode = true;
	//CDW MAR 20201104 - END.
	c.data.url_suffix = $scope.portal ? $scope.portal.url_suffix : "";
	if (!c.data.is_logged_in && c.data.multisso_enabled && c.data.default_idp) {
		var pageId = $location.search().id || $scope.page.id;
		var isLoginPage = $scope.portal.login_page_dv == pageId;
		c.server.get({
			action: "set_sso_destination",
			pageURI: isLoginPage ? null : c.data.pageURI
		}).then(function() {
			$window.location = "/login_with_sso.do?glide_sso_id=" + c.data.default_idp;
		});
	}

	//CDW RAC created new function to check whether or not user is internal to sn or external to AD
	c.userLookup = function(username){

		c.data.username = username;

		c.server.update().then(function(response){

			if(c.data.isInternal == 'no'){
				//if user has an LDAP source trigger sso login
				c.externalLogin();
			}
			else{
				c.externalLoginMode = false;
			}

		});

	}

	c.login = function(username, password) {
		var url = spUtil.getURL({sysparm_type: 'view_form.login'});

		// If the page isn't public, then the ID in the
		// URL won't match the rendered page ID
		var pageId = $location.search().id || $scope.page.id;
		var isLoginPage = $scope.portal.login_page_dv == pageId;

		return $http({
			method: 'post',
			url: url,
			data: $.param({
				'sysparm_type': 'login',
				'ni.nolog.user_password': true,
				'remember_me': !!c.remember_me ? true : false,
				'user_name': username,
				'user_password': password,
				'get_redirect_url': true,
				'sysparm_goto_url': isLoginPage ? null : $location.url(),
				'mfa_redirect_url': isLoginPage ? null : c.data.pageURI
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			if (!response.data) {
				c.message = $scope.data.errorMsg;
				return;
			}

			if (response.data.status == 'success') {
				if (c.data.multiFactorAuthEnabled) {
					c.server.get({
						action: "multi_factor_auth_setup",
						directTo: response.data.redirect_url
					}).then(handleLoginSuccess.bind(response));
				} else {
					handleLoginSuccess.call(response);
				}
			} else if (response.data.status == 'mfa_code_required') {
				$window.location = '/validate_multifactor_auth_code.do';
			} else {
				// wrong username or password
				c.message = response.data.message;
				c.password = "";
				c.username = "";
				angular.element("#username").focus();
			}

		}, function errorCallback(response) {
			c.message = $scope.data.errorMsg;
		});
	};

	c.externalLogin = function() {
		var pageId = $location.search().id || $scope.page.id;
		var isLoginPage = $scope.portal.login_page_dv == pageId;
		c.server.get({
			action: "set_sso_destination",
			pageURI: isLoginPage ? null : c.data.pageURI
		}).then(function() {
			glideSystemProperties.set("glide.authenticate.multisso.enabled", true);

			glideUserSession.getSsoRedirectUrlForUsername(c.username)
				.then(function(url) {
				$window.location = url;
			}, function(err) {
				spUtil.addErrorMessage($scope.data.errorMsg2);
			});
		});
	}

	function handleLoginSuccess() {
		c.success = this.data.message;
		$window.location = this.data.redirect_url;
	}

	c.setExternalLogin = function(newVal) {
		c.externalLoginMode = newVal;
	}
}

//server
(function() {
	options.show_panel = options.show_panel == "true" || options.show_panel == true;

	if (input && input.action === "multi_factor_auth_setup") {
		if (gs.getSession().getProperty("setup_multifactor_authn")) {
			gs.getSession().putProperty("nav_to", input.directTo);
			gs.getSession().putProperty("starting_page", input.directTo);
			gs.getSession().putProperty("is_direct_redirect", "true");
		}
		return;
	}

	// We don't want to set a starting page until we've begun the login process.
  	if (input && input.action === "set_sso_destination") {
        	var gs_nav_to = gs.getSession().getProperty("nav_to");
		gs.getSession().putProperty("nav_to", null);

    		if (input.pageURI) {
          		gs.getSession().putProperty("is_direct_redirect", "true");
    		  	gs.getSession().putProperty("starting_page", input.pageURI);
    		}
    		else if (!gs.getSession().getProperty("starting_page") && gs_nav_to)
      			gs.getSession().putProperty("starting_page", gs_nav_to);
    		return;

  	}

	//CDW RAC created new function to check whether or not user is internal to sn or external to AD
	if (input && input.username){

		var userLookupGR = new GlideRecord('sys_user');
		userLookupGR.addEncodedQuery('email=' + input.username + '^source=NULL');
		userLookupGR.query();
		if(userLookupGR.next()){
			data.isInternal = 'yes'
		}
		else{
			data.isInternal = 'no';
		}

	}

	// for self registration fields
	var portalRecord = $sp.getPortalRecord();
    var self_registration_field = portalRecord ? portalRecord.getValue("user_registration_config") : "";
    if (self_registration_field) {
        var registration_config = new GlideRecord("sys_user_registration_config");
        registration_config.addActiveQuery();
	registration_config.query('sys_id',self_registration_field);
        if (registration_config.next()) {
            var self_registration_record_producer = registration_config.getValue("record_producer");
            var self_registration_label = registration_config.getValue("registration_label") || gs.getMessage("Sign Up");
            data.self_registration_record_producer = self_registration_record_producer;
            data.self_registration_label = self_registration_label;
        }
    }

	//STRY50033370: Forgot Password link in the login widget
  data.pswdResetUrl=gs.getProperty('glide.security.password_reset.uri');
	data.forgotPwdLinkProp=gs.getProperty('glide.security.forgot_password.display.link');

	data.errorMsg = gs.getMessage("There was an error processing your request");
	data.errorMsg2 = gs.getMessage("An error has occurred - please contact your system administrator");
	data.passwordMsg = gs.getMessage("Password");
	data.usernameMsg = gs.getMessage("User name");
	data.forgetMe = GlideProperties.getBoolean("glide.ui.forgetme");
	data.forgetMeDefault = GlideProperties.getBoolean('glide.ui.remember.me.default', true);
	data.is_logged_in = gs.getSession().isLoggedIn();
	var bypass_sso = options.bypass_sso == "true";
	data.multisso_enabled = !bypass_sso && GlideProperties.getBoolean("glide.authenticate.multisso.enabled");
	data.default_idp = GlideProperties.get("glide.authenticate.sso.redirect.idp");
	data.pageURI = new GlideSPUtil().getPageUri();
	data.multiFactorAuthEnabled = GlideProperties.getBoolean('glide.authenticate.multifactor', false);
})();
