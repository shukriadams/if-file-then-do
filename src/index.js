const path = require('path'),
    jsonfile = require('jsonfile'),
    process = require('process'),
    minimist = require('minimist'),
    ui = require('./lib/ui'),
    watchers = require('./lib/watchers'),
    argv = minimist(process.argv.slice(2))

if (argv.version || argv.v){
    const package = jsonfile.readFileSync(path.join( __dirname, '/package.json'))
    console.log(`if-file-then-do, version ${package.version}`)
    process.exit(0)
}

ui.start()
watchers.start();
