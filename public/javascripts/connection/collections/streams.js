/**
 * @name Streams
 * @extends Backbone.Collection
 */

define(['../models/stream'] ,function(Stream) {
	return Backbone.Collection.extend({
		model: Stream
	});
});
