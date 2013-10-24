/**
 * @name HoneyComb
 * @extends Marionette.ItemView
 */

define([
	'./hexagon',
	'hbars!../templates/honeycomb'
], function(Hexagon, template) {

	return Marionette.CompositeView.extend({
		className: 'honeycomb',
		itemView: Hexagon,
		template: template,

		ui: {
			background   : '.background',
			middleground : '.middleground',
			foreground   : '.foreground'
		},

		collectionEvents: {
			add: 'videoLoop',
			remove: 'videoLoop'
		},

		initialize: function() {
			$(window).on('resize', this.drawTileMap.bind(this));
		},

		allLayers: function() {
			return this.$('.backdrop__layer');
		},

		buildItemView: function(item, ItemViewType, itemViewOptions) {
			var angle = this.children.length * 45;
			var chosen = this.grid.nearestHexFromCenter(this.$el.width(), this.$el.height(), angle);

			var options = _.extend({
				el: item.get('videoEl'),
				geometry: chosen,
				model: item
			}, itemViewOptions);

			return new ItemViewType(options);
		},

		appendHtml: function(){},

		draw: function() {
			var overlay = this.getContext('foreground');
			var swap = this.ui.foreground[0].cloneNode();

			overlay.clearRect(0, 0, swap.width, swap.height);

			this.children.each(function(hexagon) {
				hexagon.render(swap);
				overlay.globalCompositeOperation = 'source-over';
				overlay.drawImage(swap, 0, 0);
			});
		},

		videoLoop: function () {
			cancelAnimationFrame(this.frame);

			var last = Date.now();

			this.frame = requestAnimationFrame(function play() {
				var isStale = Date.now() - last > 1000 / 30;

				this.frame = requestAnimationFrame(play.bind(this))

				if (!isStale) return

				last = Date.now();
				this.draw();
			}.bind(this));
		},

		drawGradientMap: function() {
			var ctx = this.getContext('background');
			var width = window.innerWidth;
			var height = window.innerHeight;
			var gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.45);

			gradient.addColorStop(0, 'rgba(0, 120, 150, 0.25)'); // light blue
			gradient.addColorStop(1, 'rgba(0, 10, 10, 0.3)'); // dark blue

			ctx.globalCompositeOperation = 'lighten';
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height)
		},

		drawTileMap: function() {
			var width  = window.innerWidth * 1.2;
			var height = window.innerHeight * 1.2

			this.allLayers().attr({ height: height, width: width });

			this.grid = new HT.Grid(width, height);
			this.cache = this.grid.Cache();

			this.getContext('background').drawImage(this.cache, 0, 0);

			this.drawGradientMap();
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
