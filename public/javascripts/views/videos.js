/**
 * @name VideosView
 */

define(['V/video'], function(VideoView) {

	return Marionette.CollectionView.extend({
		itemView: VideoView
	});

});
