const http = require('http'),
    Express = require('express'),
    handlebarsLoader = require('madscience-handlebarsLoader'),
    settings = require('./settings'),
    socket = require('./socket')

module.exports = {
    start(){

        const express = Express()

        express.use(Express.static(`${__dirname}/../express/static`))

        

        // load views
        handlebarsLoader.initialize({ 
            forceInitialize : !settings.cacheViews,
            helpers : `${__dirname}/../express/helpers`,
            pages : `${__dirname}/../express/views/pages`,
            partials : `${__dirname}/../express/views/partials`,
        })

        // load routes
        const route = require('./../express/routes/default')
        route(express)

        const server = http.createServer(express)
            server.listen(settings.port)
        
        socket.initialize(server)

        console.log(`if-file-then-do started, view at http://localhost:${settings.port}`)
    }
}

