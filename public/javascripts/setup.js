/**
 * @name Setup
 */

requirejs.config({
	baseURL: '/javascripts',

	hbars: {
		extension: '.html'
	},

	paths: {
		Handlebars: 'vendor/handlebars',
		text: 'vendor/text',
		hbars: 'vendor/hbars'
	},

	shim: {
		Handlebars: {
			exports: 'Handlebars'
		}
	}
});

require([
	'application',
	'connection/app',
	'presentation/app'
], function(App) {
	App.start();
});
