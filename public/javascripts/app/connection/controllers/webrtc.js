/**
 * @name WebRTCController
 * @extends Marionette.Controller
 */

define([
	'vendor/simplewebrtc',
	'app/connection/collections/streams'
], function(SimpleWebRTC, Streams) {

	return Marionette.Controller.extend({

		initialize: function() {
			var collection = this.collection = new Streams();

			this.driver = new SimpleWebRTC({
				autoRequestMedia: true,
				autoRemoveVideos: false,
				localVideoEl: document.createElement('div'),
				remoteVideosEl: document.createElement('div')
			});

			this.driver.on('readyToCall', this.boot.bind(this));
			this.driver.on('videoAdded', this.addVideo.bind(this));
			this.driver.on('videoRemoved', this.removeVideo.bind(this));

			this.driver.connection.on('message', function(data) {
				this.trigger("message", data);
				this.trigger("message:" + data.type, data);
			}.bind(this));

			this.driver.on('speaking', function(data) {
				data && collection.get(data.id).set('speaking', true);
			});

			this.driver.on('stoppedSpeaking', function(data) {
				data && collection.get(data.id).set('speaking', false);
			});
		},

		localVideo: function() {
			return this.driver.getEl(this.driver.config.localVideoEl).querySelector('video');
		},

		boot: function(id) {
			this.collection.add({
				id: id,
				local: true,
				videoEl: this.localVideo()
 			});
			this.driver.resume();
			this.driver.joinRoom(window.location.pathname.slice(1));
		},

		addVideo: function(video, data) {
			this.collection.add(data);
			this.trigger("stream:added")
		},

		removeVideo: function(video, data) {
			this.collection.remove(data.id);
			this.trigger("stream:removed")
		},

		send: function(type, data) {
			this.driver.webrtc.sendToAll(type, data);
		}
	});
});
