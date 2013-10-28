#
# Main Application
#

require 'colors'
express = require 'express'

app = express()

isDevelopment = app.settings.env isnt 'production'

require('./settings')(app);

app.get '/', (req, res) ->
    res.render 'index', development: isDevelopment

app.get '/:room', (req, res) ->
    res.render 'room', development: isDevelopment

app.listen app.get('port'), ->
    console.log("HTTP listening on port " + "%d".bold.red +
        " in " + "%s".bold.green, app.get('port'), app.settings.env);
