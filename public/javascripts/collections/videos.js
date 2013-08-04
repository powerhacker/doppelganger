/**
 * @name VideosCollection
 */

define(['M/video'] ,function(Video) {
	return Backbone.Collection.extend({
		model: Video
	});
});
