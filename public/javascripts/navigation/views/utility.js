/**
 * @name Utility
 * @extends Marionette.ItemView
 */

define([
	'hbars!../templates/utility',
	'core'
], function(template, App) {
	return Marionette.ItemView.extend({
		template: template,

		events: {
			'click 	.actionbar__nav__control--mute': 'toggleMute',
			'click 	.actionbar__nav__control--pause': 'togglePause'
		},

		ui: {
			mute: '.actionbar__nav__control--mute',
			pause: '.actionbar__nav__control--pause'
		},

		toggleMute: function() {
			var isActive = this.ui.mute.toggleClass('is-active').hasClass('is-active');
			var action = isActive? 'mute' : 'unmute';

			App.execute('connection:' + action);
		},

		togglePause: function() {
			var isActive = this.ui.pause.toggleClass('is-active').hasClass('is-active');
			var action = isActive? 'pause' : 'resume';
			App.execute('connection:' + action);
		}
	});
});
