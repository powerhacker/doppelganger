/**
 * @name Videos
 * @extends Marionette.CollectionView
 */

define(['./video'], function(Video, template) {
	return Marionette.CollectionView.extend({
		className: 'videos-container',
		itemView: Video
	});
});
