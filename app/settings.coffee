#
# Application Settings
# 

express = require 'express'
handlebars = require 'express3-handlebars'

module.exports = (app) ->
    app.configure ->
        app.use express.static './public'
        app.engine 'handlebars', handlebars defaultLayout: 'layout'
        app.set 'view engine', 'handlebars'
        app.set 'port', 3002