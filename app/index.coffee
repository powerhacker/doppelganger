#
# Main Application
#

require 'colors'

fs = require 'fs'
https = require 'https'
http = require 'http'
express = require 'express'
options =
    cert : fs.readFileSync '/Users/nathanielhunzaker/.ssl/server.crt'
    key  : fs.readFileSync '/Users/nathanielhunzaker/.ssl/server.key'

app = express()

isDevelopment = app.settings.env isnt 'production'

require('./settings')(app);

app.get '/', (req, res) ->
    res.render 'index', development: isDevelopment

app.get '/:room', (req, res) ->
    res.render 'room', development: isDevelopment

base = http.createServer(app)
ssl = https.createServer(options, app)

base.listen app.get('port'), ->
    console.log("HTTP listening on port " + "%d".bold.red +
        " in " + "%s".bold.green, app.get('port'), app.settings.env);

ssl.listen app.get('port') + 1, ->
    console.log("HTTPS listening on port " + "%d".bold.red +
        " in " + "%s".bold.green, app.get('port') + 1, app.settings.env);
