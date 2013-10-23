/**
 * @name Scene
 * @desc The main presentation logic
 */

define([
	'core',
	'./views/honeycomb'
], function(App, Honeycomb) {
	var Scene = App.module("Scene");

	Scene.addInitializer(function() {
		App.body.show(new Honeycomb({
			collection: App.request('connection:streams')
		}));
	});

	return Scene;
});
