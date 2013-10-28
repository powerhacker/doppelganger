/**
 * @name Lobby
 * @extends Marionette.ItemView
 */

define([
	'app/core',
	'hbars!../templates/lobby'
], function(App, template) {
	return Marionette.ItemView.extend({
		className : 'menu modal',
		tagName   : 'menu',
		template  : template,

		events    : {
			'submit form' : 'joinRoom'
		},

		ui: {
			'form' : '.form--lobby'
		},

		joinRoom: function(e) {
			var room = this.ui.form[0]['room_name'].value;
			App.router.navigate(room, { trigger: true });
			e.preventDefault();
		}
	});
});
