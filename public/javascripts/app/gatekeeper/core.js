/**
 * @name Scene
 * @desc The main presentation logic
 */

define([
	'app/core',
	'./views/Lobby'
], function(App, Lobby) {

	var Gatekeeper = App.module("Gatekeeper", function() {
		this.startWithParent = false;
	});

	Gatekeeper.on('start', function() {
		App.modal.show(new Lobby());
	});

	Gatekeeper.on('stop', function() {
		App.modal.reset();
	});

	return Gatekeeper;
});
