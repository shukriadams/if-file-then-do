// set shortcut global for easier module imports. Modules are loaded relative to "server" directory
global._$ = `${__dirname}/`

const path = require('path'),
    jsonfile = require('jsonfile'),
    process = require('process'),
    minimist = require('minimist'),
    server = require('./lib/server'),
    watchers = require('./lib/watchers'),
    argv = minimist(process.argv.slice(2))

if (argv.version || argv.v){
    const package = jsonfile.readFileSync(path.join( __dirname, '/package.json'))
    console.log(`if-file-then-do, version ${package.version}`)
    process.exit(0)
}

server.start()
watchers.start()
