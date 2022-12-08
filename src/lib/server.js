
module.exports = {
    async start(){

        const http = require('http'),
            Express = require('express'),
            handlebarsLoader = require('madscience-handlebarsLoader'),
            settings = require('./settings'),
            fs = require('fs-extra'),
            path = require('path'),
            process = require('process'),
            daemon = require('./daemon'),
            socket = require('./socket'),
            express = Express()

        express.use(Express.static(`${__dirname}/../express/static`))
        express.use(Express.static(`${__dirname}/../react`))
        
        // set up directory structure for logs
        try {
            await fs.ensureDir(path.join(settings.dataDirectory, 'logs'))
        } catch(ex){
            console.log(`FATAL ERROR : failed to create logs directory @ ${settings.dataDirectory}/logs`, ex)
            return process.exit(1)
        }

        // load views
        handlebarsLoader.initialize({ 
            forceInitialize : !settings.cacheViews,
            helpers : `${__dirname}/../express/helpers`,
            pages : `${__dirname}/../express/views/pages`,
            partials : `${__dirname}/../express/views/partials`,
        })

        // load routes
        require('./../express/routes/events')(express)
        // default must be bound last, catch-all react handler
        require('./../express/routes/default')(express) 

        daemon.start()
        const server = http.createServer(express)

        server.listen(settings.port)
        socket.initialize(server)
        console.log(`if-file-then-do started, view at http://localhost:${settings.port}`)
    }
}

