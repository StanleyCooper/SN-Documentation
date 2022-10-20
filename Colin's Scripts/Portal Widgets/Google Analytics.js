/*************************************

https://community.servicenow.com/community?id=community_question&sys_id=df0e41bcdba6a3001089e15b8a961950
Create a new UI Script
In the navigator go to System UI -> UI Scripts

Name: SP Google Analytics beacon

Type: Mobile/Service Portal

Script:

*************************************/

angular.module('spGABeacon', []).run(function($rootScope, $window, $location){

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	//enter your tracker code here
	ga('create','UA-XXXXXXXX-1','auto');

	ga('send',{
		hitType:'pageview',
		title: window.top.document.title,
		location: window.location.href
	});


	$rootScope.$on('$locationChangeSuccess', function(event, toState, toParams){
		ga('send', {
				hitType: 'pageview',
				title: $window.document.title,
				location: $location.absUrl()
			});

	});
});

/*************************************


Create a Service Portal dependency
In the navigator go to Service Portal -> Dependencies

Name: GA beacon

Include on page load: Checked

Angular module name: spGABeacon

Click submit and open the record you just created.

Go to the JS Includes related list and click New

Display Name: GA beacon

Source: UI Script

UI Script: SP Google Analytics beacon



Associate the dependencies with the Header Menu widget
Using the navigator go to: Service Portal -> Widgets

Open the Header Menu widget

Using the Dependencies related list, click edit.

Pick: Google Analytics & GA beacon and click save

-Open header menu widget
-Create a new JS Include
  -Display Name GA beacon
  -Source: UI script
  -UI Script: SP Google Analytics beacon
-Add Google Analytics Dependacy
-Create New Dependacy
  -Name GA beacon
  -Include on page load
  -Angular module name spGABeacon
-Save
-Create a JS Include
  -Dependacy: GA beacon
  -JS Include GA Beachon

*************************************/
