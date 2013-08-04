/**
 * @name Video
 * @desc A single video on the screen
 * @extends Marionette.ItemView
 */

define(['hbars!T/video'], function(template) {

	var VideoView = Marionette.ItemView.extend({

		events: {
			'video:exit'     : 'remove',
			'message:chat'   : 'setMessage'
		},

		template: template,

		mute: function() {
			this.video.muted = "on";
		},

		unmute: function() {
			this.video.muted = "off";
		},

		play: function() {
			this.video.play();
		},

		render: function() {
			var markup = $(this.template())
			markup.find('.video-box-mask').append(this.el);

			this.setElement(markup);

			this.video = this.el.querySelector('video')
			this.$video = $(this.video);

			return this;
		},

		setMessage: function(e, value) {
			var bubble = this.$('.video-box-caption');

			if (value) {
				bubble.addClass('is-visible').html(value);
			} else {
				bubble.removeClass('is-visible');
			}
		}
	});

	return VideoView;
});
