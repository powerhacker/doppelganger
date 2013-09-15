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

define(['C/connection', 'V/utility'], function(ConnectionController, UtilityView) {

	var connection = window.connection = new ConnectionController();
	var utility = new UtilityView({ el: utilityBar });

	connection.on('message:chat', function(data) {
		var model = connection.collection.get(data.from);
		model.set('message', data.payload.message)
	});

	// Register the "echo" task for super cool messaging
	utility.registerTask('echo', function(value) {
		var model = connection.collection.findWhere({ local: true });
		model.set('message', value);
		connection.send("chat", { name: this.hostname, message: value });
	});

	setInterval(function() {
		$(_.shuffle(document.querySelectorAll('video'))[0]).trigger('click');
	}, 10000);

	return connection;
});
