/**
 * @name HoneyComb
 * @extends Marionette.ItemView
 */

define(['hbars!../templates/honeycomb'], function(template) {

	return Marionette.ItemView.extend({
		template: template,

		ui: {
			background   : '.background',
			middleground : '.middleground',
			foreground   : '.foreground',
			overlay      : '.overlay',
		},

		collectionEvents: {
			add: 'videoLoop'
		},

		initialize: function() {
			$(window).on('resize', this.drawTileMap.bind(this));
		},

		allLayers: function() {
			return this.$('.backdrop__layer');
		},

		draw: function(tiles, data) {
			var overlay = this.getContext('overlay');
			var swap = this.ui.overlay[0].cloneNode();
			var ctx = swap.getContext('2d');

			var width = HT.Hexagon.Static.WIDTH;
			var height = HT.Hexagon.Static.HEIGHT;

			for (var i = 0, len = data.length; i < len; i++) {
				var hex = tiles[i];
				var entry = data[i];

				ctx.drawImage(entry.videoEl,
					hex.x - entry.centerX, hex.y - entry.centerY,
					entry.width, entry.height
				);

				ctx.globalCompositeOperation = 'destination-in';
				hex.draw(ctx, false, '#000');

				ctx.globalCompositeOperation = 'source-over';
				hex.draw(ctx, "#082631");

				overlay.drawImage(swap, 0, 0);
			};
		},

		videoLoop: function () {
			var sample = this.grid.Hexes.slice(10);
			var data = this.collection.toJSON();

			cancelAnimationFrame(this.frame);

			var last = Date.now();

			this.frame = requestAnimationFrame(function play() {
				var isStale = Date.now() - last > (1000/30);

				this.frame = requestAnimationFrame(play.bind(this))

				if (data.length && isStale) {
					last = Date.now();
					this.draw(sample, data);
				}
			}.bind(this));
		},

		drawTileMap: function() {
			var width  = window.innerWidth * 1.2;
			var height = window.innerHeight * 1.2

			this.allLayers().each(function() {
				$(this).attr({
					height: height,
					width: width
				});
			});

			this.grid = new HT.Grid(width, height);
			this.cache = this.grid.Cache();

			this.getContext('background').drawImage(this.cache, 0, 0);

			this.videoLoop();
		},

		getContext: function(type) {
			return this.$('.backdrop__layer.' + type)[0].getContext('2d');
		},

		onDomRefresh: function() {
			this.drawTileMap();
		},

	});

});
