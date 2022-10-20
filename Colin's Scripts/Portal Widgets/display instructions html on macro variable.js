/*
      HTML
*/

<div ng-bind-html="c.data.instructions"></div>

/*

Client Controller

*/

function($scope) {
	var c = this;

	c.data.variable = $scope.page.field.sys_id.toString();

	servUpdate = function() {
		c.server.update().then(function (response) {

		});

	};
	servUpdate();
}

/*

Server side script

*/

(function() {

	if(input){
		var question = input.variable;
		var instructions;
		var gr = new GlideRecord("item_option_new");
		gr.addQuery("sys_id", question);
		gr.query();
		if (gr.next()) {
			//gs.log('Data variable is ' + gr.instructions ,"RICH LOG");
			instructions = gr.instructions.toString();
		}
		data.instructions = instructions;
	}
})();
