/**
 * @name Scene
 * @desc The main presentation logic
 */

define([
	'app/core',
	'./views/utility'
], function(App, Utility) {
	var Navigation = App.module("Navigation", function() {
		this.startWithParent = false;
	});

	Navigation.on('start', function() {
		App.navigation.show(new Utility());
	});

 	Navigation.on('stop', function() {
		App.navigation.reset();
	});

	return Navigation;
});
