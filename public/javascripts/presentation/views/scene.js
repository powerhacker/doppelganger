/**
 * @name Scene
 * @extends Marionette.Layout
 */

define([
	'hbars!../templates/scene',
	'core',
	'./honeycomb',
	'./utility'
], function(template, Core, Honeycomb, Utility) {
	return Marionette.Layout.extend({
		className: 'scene',
		template: template,

		regions: {
			'backdrop' : '.region--backdrop',
			'utility'  : '.region--utility',
			'videos'   : '.region--videos'
		},

		onDomRefresh: function() {
			var collection = App.request('connection:streams');

			this.utility.show(new Utility());

			this.backdrop.show(new Honeycomb({
				collection: collection
			}));
		}
	});
});
