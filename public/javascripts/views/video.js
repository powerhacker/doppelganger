/**
 * @name Video
 * @desc A single video on the screen
 * @extends Marionette.ItemView
 */

define(['hbars!T/video'], function(template) {

	var VideoView = Marionette.ItemView.extend({

		events: {
			'video:exit': 'remove'
		},

		template: template,

		render: function() {
			var markup = $(this.template()).prepend(this.el);

			this.setElement(markup);
			this.video = this.el.querySelector('video')

			return this;
		},

		play: function() {
			this.video.play();
		}
	});

	return VideoView;
});
