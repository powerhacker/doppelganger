/**
 * @name Scene
 * @extends Marionette.Layout
 */

define([
	'hbars!../templates/scene',
	'application',
	'./backdrop',
	'./videos',
	'./utility'
], function(template, App, Backdrop, Videos, Utility) {
	return Marionette.Layout.extend({
		className: 'scene',
		template: template,

		regions: {
			'backdrop' : '.region--backdrop',
			'utility'  : '.region--utility',
			'videos'   : '.region--videos'
		},

		onDomRefresh: function() {
			this.utility.show(new Utility());
			this.backdrop.show(new Backdrop());
			this.videos.show(new Videos({
				collection: App.request('connection:streams')
			}));
		}
	});
});
