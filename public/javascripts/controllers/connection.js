/**
 * @name ConnectionController
 * @desc A simple bucket to handle video connection stuff.
 *       Uses https://github.com/HenrikJoreteg/SimpleWebRTC
 *
 * @extends Marionette.Controller
 */

define(['V/video'], function(VideoView) {

	var ConnectionController = Marionette.Controller.extend({

		initialize: function() {

			this.driver = new SimpleWebRTC({
				localVideoEl: 'localVideo',
				remoteVideosEl: 'remoteVideos',
				autoRequestMedia: true,
				autoRemoveVideos: false
			});

			this.driver.on('readyToCall', this.boot.bind(this));
			this.driver.on('videoAdded', this.addVideo.bind(this));
			this.driver.on('videoRemoved', this.removeVideo.bind(this));

			this.driver.connection.on('message', function(data) {
				this.trigger("message", data);
				this.trigger("message:" + data.type, data);
			}.bind(this));

		},

		boot: function() {
			this.driver.joinRoom(window.location.pathname.slice(1));
		},

		addVideo: function(video) {
			var view = new VideoView({ el: video }).render()

			remoteVideos.appendChild(view.el);

			view.play();

			// Wrap the video in some container markup required to add other widgets
			this.createSpeedDial();
		},

		createSpeedDial: function() {
			var videos = $(".video-box-wrap").not(".has-focus");
			var size = 320;

			videos.each(function(index, video) {
				var percent = index / videos.length;
				var radians = (Math.PI / 180) * (percent * 360);
				var x = Math.sin(radians) * size | 0;
				var y = Math.cos(radians) * size | 0;

				setTimeout(function() {
					$(video).css("transform", "translate(" + x + "px," + y + "px) translateZ(0) rotateZ(360deg)");
				}, 200 * index);
			});
		},

		removeVideo: function(video) {
			$(video).trigger('video:exit')
			var $videos = $(".video-box-wrap");
			if ($videos.filter(".has-focus").length === 0) $videos.first().addClass('has-focus');
			this.createSpeedDial();
		},

		send: function(type, data) {
			this.driver.webrtc.sendToAll(type, data);
		}
	});

	return ConnectionController;

});
