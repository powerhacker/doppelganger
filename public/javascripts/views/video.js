/**
 * @name Video
 * @desc A single video on the screen
 * @extends Marionette.ItemView
 */

define(['hbars!T/video'], function(template) {

	var VideoView = Marionette.ItemView.extend({

		modelEvents: {
			'change:message' : 'setMessage',
			'remove'         : 'remove'
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
			var markup = $(this.template());
			var video = this.video = this.model.get('videoEl');

			this.$video = $(this.video);

			markup.find('.video-box-mask').append(video);

			this.setElement(markup);

			this.model.get('local') && this.$el.addClass('has-focus');

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
