/**
 * @name Setup
 */

requirejs.config({
	baseURL: '/javascripts',

	hbars: {
		extension: '.html'
	},

	paths: {
		M : 'models',
		V : 'views',
		C : 'controllers',
		R : 'routers',
		T : 'templates',

		Handlebars: 'vendor/handlebars',
		text: 'vendor/text',
		hbars: 'vendor/hbars'
	},
	shim: {
		Handlebars: {
			exports: 'Handlebars'
		}
	}
});

require(['C/connection', 'V/utility'], function(ConnectionController, UtilityView) {

	var connection = new ConnectionController();
	var utility = new UtilityView({ el: utilityBar });

	connection.on('message:chat', function(data) {
		var video = $("#" + data.from + "_video_incoming");
		$(video).parent().find(".video-box-caption").html(data.payload.message);
	});

	// Register the "echo" task for super cool messaging
	utility.registerTask('echo', function(value) {
		localVideo.querySelector(".video-box-caption").innerHTML = value;
		connection.send("chat", { name: this.hostname, message: value });
	});

	$("body").on('click', '.video-box-wrap', function() {
		$(".video-box-wrap").removeClass('has-focus').filter(this).addClass('has-focus');
		connection.createSpeedDial();
	});

});
