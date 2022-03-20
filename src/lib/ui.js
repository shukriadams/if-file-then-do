const http = require('http'),
    Express = require('express'),
    settings = require('./settings')

module.exports = {
    start(){

        const express = Express()

        // load routes

        const server = http.createServer(express)
            server.listen(settings.port)
        
        console.log(`if-file-then-do started, view at http://localhost:${settings.port}`)
    }
}

