define(function() {

	return Marionette.ItemView.extend({
		template: false,

		initialize: function(options) {
			this.geometry = options.geometry;
		},

		render: function(canvas) {
			if (!canvas) return;

			var ctx = canvas.getContext('2d');
			var data = this.serializeData();

			ctx.save();

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(this.el, data.x, data.y, data.width, data.height);

			ctx.globalCompositeOperation = 'destination-in';
			this.geometry.draw(ctx, '#092431', '#000');

			ctx.globalCompositeOperation = 'lighten';

			this.geometry.draw(ctx, "#205163");

			ctx.restore();

			return this;
		},

		serializeData: function() {
			var attrs = this.model.toJSON();

			var hexWidth = HT.Hexagon.Static.WIDTH;
			var hexHeight = HT.Hexagon.Static.HEIGHT;

			var scaleX = hexWidth / this.el.videoWidth;
			var scaleY = hexHeight / this.el.videoHeight;

			var scale = attrs.scale = Math.max(scaleX, scaleY);

			var height = attrs.height = this.el.videoHeight * scale;
			var width = attrs.width = this.el.videoWidth * scale;

			attrs.x = this.geometry.x - (width - hexWidth) * 0.5;
			attrs.y = this.geometry.y - (height - hexHeight) * 0.5;

			return attrs;
		}

	});

});
