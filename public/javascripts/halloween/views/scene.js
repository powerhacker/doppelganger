define([
	'hbars!../templates/scene',
	'vendor/jquery.parallax'
], function(template) {
	return Marionette.ItemView.extend({
		template: template,

		ui: {
			scene: '.scene',
			layers: '.layer'
		},

		onDomRefresh: function() {
			this.ui.scene.parallax();
			this.videoLoop();
		},

		draw: function() {
			var masks = this.$('.mask');
			var canvases = this.$('canvas');

			this.collection.each(function(model, i) {
				var canvas = canvases.get(i);
				var mask = masks.get(i);
				var ctx = canvas.getContext('2d');
				var zoom = parseFloat(mask.getAttribute('data-zoom'), 10);
				var data = model.toJSON(mask.width, mask.height, zoom);

				canvas.width = canvas.width;

				ctx.save();

				ctx.drawImage(data.videoEl, -data.centerX, -data.centerY, data.width, data.height);
				ctx.fillStyle = mask.getAttribute('data-hue');
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				ctx.globalCompositeOperation = 'destination-in';
				ctx.drawImage(mask, 0, 0);

				ctx.restore();
			}, this);
		},

		videoLoop: function () {
			cancelAnimationFrame(this.frame);

			var last = Date.now();

			this.frame = requestAnimationFrame(function play() {
				var isStale = Date.now() - last > (1000/30);

				this.frame = requestAnimationFrame(play.bind(this))

				if (isStale) {
					last = Date.now();
					this.draw();
				}
			}.bind(this));
		}
	});
});
