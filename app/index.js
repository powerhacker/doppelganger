require('colors');

var express = require('express'),
    app = express(),
    isDevelopment = app.settings.env !== 'production';

require('./settings')(app);

app.get('/', function(req, res) {
	return res.render('index', {
		development: isDevelopment
	});
});

app.get('/:room', function(req, res) {
	return res.render('room', {
		development: isDevelopment
	});
});

app.listen(app.get('port'), function() {
	return console.log("HTTP listening on port " + "%d".bold.red + " in " + "%s".bold.green, app.get('port'), app.settings.env);
});
