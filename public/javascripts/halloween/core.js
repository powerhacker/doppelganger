/**
 * @name Halloween
 * @desc Trick or Treat!
 */

define([
	'core',
	'./views/scene'
], function(App, Scene) {
	var Presentation = App.module("Presentation");

	Presentation.addInitializer(function() {
		App.main.show(new Scene({
			collection: App.request('connection:streams')
		}));
	});

	return Presentation;
});
