#
# Main Application
#

require 'colors'
express = require('express')
app = express()

require('./settings')(app);

app.get '/', (req, res) ->
    res.end "Please join a room!"

app.get '/:room', (req, res) ->
    res.render 'index'

server = app.listen app.get('port'), ->
    console.log("Listening on port " + "%d".bold.red +
                " in " + "%s".bold.green, app.get('port'), app.settings.env);
