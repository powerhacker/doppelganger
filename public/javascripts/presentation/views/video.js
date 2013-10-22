/**
 * @name Video
 * @extends Marionette.ItemView
 */

define(function() {
	return Marionette.ItemView.extend({
		className: 'video',

		render: function() {
			var video = this.model.get('videoEl');
			this.$el.append(video);
			this.play();
		},

		play: function() {
			if (this.model.has('videoEl')) {
				this.model.get('videoEl').play()
			}
		}
	});
});
