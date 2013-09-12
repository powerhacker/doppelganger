/**
 * @name VideosView
 */

define(['views/video'], function(VideoView) {

	var $window = $(window);
	var $body = $("body");

	return Marionette.CollectionView.extend({

		events: {
			'click .video-box-wrap' : 'drawFocus'
		},

		collectionEvents: {
			'remove reset' : 'organize'
		},

		itemView: VideoView,

		initialize: function() {
			$window.on('resize', _.debounce(this.organize.bind(this), 200))
		},

		onAfterItemAdded: function(view) {
			view.play();
			this.organize();
		},

		videos: function() {
			return this.$(".video-box-wrap");
		},

		videosWithout: function(without) {
			return this.videos().not(without);
		},

		drawFocus: function(e) {
			this.videos().removeClass('has-focus');
			$(e.currentTarget).addClass('has-focus');
			this.organize();
		},

		ensureFocus: function() {
			var $videos = this.videos();
			if (!$videos.filter(".has-focus").length) {
				$videos.first().addClass('has-focus');
			}
		},

		organize: function() {
			this.ensureFocus();

			if ($body.hasClass('mode-fullscreen')) {
				this.makeFullscreenLayout();
			} else {
				this.makeRotaryLayout();
			}
		},

		makeFullscreenLayout: function() {
			var $videos = this.videosWithout('.has-focus');
			var size = $videos.width() * 1.7;
			var offset = (size * ($videos.length -1)) / 2

			$videos.each(function(index, el) {
				var $video = $(el);
				var x = (index * size) - offset

				setTimeout(function() {
					$video.css("transform", [
						"translate(" + x + "px, 0px)",
						"translateZ(0)"
					].join(" "));
				}, 200 * index);
			});
		},

		makeRotaryLayout: function(offset) {
			var $videos = this.videosWithout('.has-focus');
			var size = this.$('.has-focus').width() * 0.85;
			var rotation = 90 + (offset || 0);

			$videos.each(function(index, el) {
				var $video = $(el);
				var percent = index / $videos.length;
				var radians = (Math.PI / 180) * ((percent * 360) + rotation)
				var x = Math.sin(radians) * size | 0;
				var y = Math.cos(radians) * size | 0;

				setTimeout(function() {
					$video.css("transform", [
						"translate(" + x + "px," + y + "px)",
						"translateZ(0) rotateZ(360deg)"
					].join(" "));
				}, 200 * index);
			});
		}
	});
});
