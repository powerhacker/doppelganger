/**
 * @name Application
 * @desc The brain of the application
 */

define(function() {
	var Application = new Marionette.Application();

	Application.on('initialize:after', function() {
		Backbone.history.start();
	});

	Application.addRegions({
		modals  : "#modals",
		main    : "#main",
		utility : "#utility"
	});

	return Application;
});
