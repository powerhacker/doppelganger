/**
 * @name Stream
 * @extends Backbone.Model
 */

define(function() {
	return Backbone.Model.extend({

		toJSON: function() {
			var attrs = _.clone(this.attributes);
			var el = attrs.videoEl;

			var hexWidth = HT.Hexagon.Static.WIDTH;
			var hexHeight = HT.Hexagon.Static.HEIGHT;

			var scaleX = hexWidth / el.videoWidth;
			var scaleY = hexHeight / el.videoHeight;

			var scale = attrs.scale = Math.max(scaleX, scaleY);

			var height = attrs.height = el.videoHeight * scale;
			var width = attrs.width = el.videoWidth * scale;

			attrs.centerX = (width - hexWidth) * 0.5;
			attrs.centerY = (height - hexHeight) * 0.5;

			return attrs;
		}
	});
});
