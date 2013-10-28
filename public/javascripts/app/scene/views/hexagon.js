define(function() {

	return Marionette.ItemView.extend({
		template: false,

		initialize: function(options) {
			this.geometry = options.geometry;

			this.canvas = options.canvas;
			this.canvas_ctx = this.canvas.getContext('2d');

			this.swap = this.canvas.cloneNode();
			this.swap_ctx = this.swap.getContext('2d');
		},

		clone: function() {
			return this.canvas.cloneNode();
		},

		isPlaying: function() {
			return !this.el.paused;
		},

		erase: function() {
			this.canvas_ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},

		updateVideo: function(x, y, width, height) {
			this.swap_ctx.drawImage(this.el, x, y, width, height);
		},

		getStrokeMask: _.memoize(function() {
			var mask = this.clone();
			this.geometry.draw(mask.getContext('2d'), "#205163");
			return mask;
		}, function() { return this.geometry.Id; }),

		getFillMask: _.memoize(function() {
			var mask = this.clone();
			this.geometry.draw(mask.getContext('2d'), false, '#000');
			return mask;
		}, function() { return this.geometry.Id; }),

		applyMask: function() {
			this.canvas_ctx.drawImage(this.getFillMask(), 0, 0);
		},

		applyVideo: function() {
			this.canvas_ctx.globalCompositeOperation = 'source-atop';
			this.canvas_ctx.drawImage(this.swap, 0, 0);
		},

		applyHighlights: function() {
			this.canvas_ctx.globalCompositeOperation = 'lighten';
			this.canvas_ctx.drawImage(this.getStrokeMask(), 0, 0);
		},

		render: function() {
			var data = this.serializeData();

			this.updateVideo(data.x, data.y, data.width, data.height);

			this.applyMask();
			this.applyVideo();
			this.applyHighlights();

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
