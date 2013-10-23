/**
 * @name Stream
 * @extends Backbone.Model
 */

define(function() {
	return Backbone.Model.extend({

		toJSON: function(width, height, zoom) {
			var attrs = _.clone(this.attributes);
			var el = attrs.videoEl;

			var maskWidth = width;
			var maskHeight = height;

			var scaleX = maskWidth / el.videoWidth;
			var scaleY = maskHeight / el.videoHeight;

			var scale = attrs.scale = Math.max(scaleX, scaleY) * (zoom || 1);

			var height = attrs.height = el.videoHeight * scale;
			var width = attrs.width = el.videoWidth * scale;

			attrs.centerX = (width - maskWidth) * 0.5;
			attrs.centerY = (height - maskHeight) * 0.5;

			return attrs;
		}
	});
});
