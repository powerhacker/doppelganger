/**
 * @name Connections
 */

define([
	'core',
	'connection/controller'
], function(App, Controller) {
	var Connection = App.module("Connection");

	var controller = Connection.controller = new Controller();

	controller.on("stream:added", function(stream) {
		App.vent.trigger('connection:stream:added')
	});

	controller.on("stream:added", function(stream) {
		App.vent.trigger('connection:stream:removed')
	});

	App.reqres.setHandler('connection:streams', function() {
		return controller.collection;
	});

	App.commands.setHandler('connection:mute', function() {
		controller.driver.mute();
	});

	App.commands.setHandler('connection:unmute', function() {
		controller.driver.unmute();
	});

	App.commands.setHandler('connection:pause', function() {
		controller.driver.pause();
	});

	App.commands.setHandler('connection:resume', function() {
		controller.driver.resume();
	});

	return Connection;
});
