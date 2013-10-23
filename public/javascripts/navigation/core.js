/**
 * @name Scene
 * @desc The main presentation logic
 */

define([
	'core',
	'./views/utility'
], function(App, Utility) {
	var Navigation = App.module("Navigation");

	Navigation.addInitializer(function() {
		App.navigation.show(new Utility());
	});

	return Navigation
});
