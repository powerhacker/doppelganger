/**
 * @name Backdrop
 * @extends Marionette.ItemView
 */

define(['hbars!../templates/backdrop'], function(template) {

	return Marionette.ItemView.extend({
		template: template,

		ui: {
			background   : '.background',
			middleground : '.middleground',
			foreground   : '.foreground',
			overlay      : '.overlay',
		},

		initialize: function() {
			$(window).on('resize', this.drawTileMap.bind(this));
		},

		allLayers: function() {
			return this.$('.backdrop__layer');
		},

		drawTileMap: function() {
			var width  = window.innerWidth * 1.2;
			var height = window.innerHeight * 1.2

			this.allLayers().attr({
				height: height,
				width: width
			});

			this.grid = new HT.Grid(width, height);
			this.cache = this.grid.Cache();

			this.getContext('background').drawImage(this.cache, 0, 0);
		},

		getContext: function(type) {
			return this.$('.backdrop__layer.' + type)[0].getContext('2d');
		},

		onDomRefresh: function() {
			this.drawTileMap();
		},

	});

});
