var express    = require('express'),
    handlebars = require('express3-handlebars');

module.exports = function(app) {

	return app.configure(function() {

		app.use(express["static"]('./public'));

		app.engine('handlebars', handlebars({
			defaultLayout: 'layout'
		}));

		app.set('view engine', 'handlebars');
		app.set('port', parseInt(process.env.PORT) || 3002);
	});
};
