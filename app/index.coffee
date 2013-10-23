#
# Main Application
#

require 'colors'
express = require('express')
app = express()

isDevelopment = not (process.env.NODEENV is 'production');

require('./settings')(app);

app.get '/', (req, res) ->
    res.end "Please join a room!"

app.get '/:room', (req, res) ->
    res.render 'index', development: isDevelopment

server = app.listen app.get('port'), ->
    console.log("Listening on port " + "%d".bold.red +
                " in " + "%s".bold.green, app.get('port'), app.settings.env);
