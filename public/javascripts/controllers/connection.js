/**
 * @name ConnectionController
 * @desc A simple bucket to handle video connection stuff.
 *       Uses https://github.com/HenrikJoreteg/SimpleWebRTC
 *
 * @extends Marionette.Controller
 */

define([
	'views/videos',
	'collections/videos'
], function(VideosView, VideosCollection) {

	var ConnectionController = Marionette.Controller.extend({

		initialize: function() {

			this.driver = new SimpleWebRTC({
				autoRequestMedia: true,
				autoRemoveVideos: false,
				localVideoEl: 'localVideo',
				log: true,
				remoteVideosEl: 'remoteVideos'
			});

			this.driver.on('readyToCall', this.boot.bind(this));
			this.driver.on('videoAdded', this.addVideo.bind(this));
			this.driver.on('videoRemoved', this.removeVideo.bind(this));

			this.collection = new VideosCollection();

			this.view = new VideosView({
				el: remoteVideos,
				collection: this.collection
			});

			this.driver.connection.on('message', function(data) {
				this.trigger("message", data);
				this.trigger("message:" + data.type, data);
			}.bind(this));
		},

		boot: function(id) {
			this.collection.add({
				id: id,
				local: true,
				videoEl: localVideo.querySelector('video')
 			});
			this.driver.joinRoom(window.location.pathname.slice(1));
		},

		addVideo: function(video, data) {
			this.collection.add(data);
		},

		removeVideo: function(video, data) {
			this.collection.remove(data.id);
		},

		send: function(type, data) {
			this.driver.webrtc.sendToAll(type, data);
		}
	});

	return ConnectionController;
});
