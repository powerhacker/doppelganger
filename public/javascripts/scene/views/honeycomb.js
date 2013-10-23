/**
 * @name HoneyComb
 * @extends Marionette.ItemView
 */

define([
	'hbars!../templates/honeycomb',
	'./hexagon'
], function(template, Hexagon) {

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
			add: 'videoLoop'
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

			this.children.each(function(hexagon) {
				hexagon.render(swap);
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
