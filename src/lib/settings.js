let yaml = require('js-yaml'),
    process = require('process'),
    fs = require('fs-extra'),
    sanitize = require('sanitize-filename'),
    settings = null

if (fs.existsSync('./config.yml')){
    try {
        let settingsYML = fs.readFileSync('./config.yml', 'utf8')
        settings = yaml.load(settingsYML)
    } catch (e) {
        console.log('Error reading settings.yml', e)
        throw e
    }
} else {
    // warn no config
}

// assign defaults
settings = Object.assign({
    port: 3000,
    host: 'localhost',
    protocol : 'http',
    dataDirectory : './data',
    cacheViews: true,
    watch : [ ],
}, settings)

for (const watch of settings.watch){
    watch.valid = false
    watch.state = ''
    watch.__safename = ''

    // force name to path if name not set
    if (!watch.name){
        if (watch.path)
            watch.name = watch.path
        else
            watch.name = 'unnamed'
    }

    if (!watch.path){
        watch.state = '"path" not set - this must be a valid glob (see https://en.wikipedia.org/wiki/Glob_(programming))'
        continue
    }

    if (!watch.command){
        watch.state = `Watch "${watch.name}" does not have a "command" - this should be a shell command to call when a file event occurs`
        continue
    }

    // set default event to 'add'
    if (!watch.on)
        watch.on = ['add']

    watch.__safename = sanitize(watch.name)
    watch.valid = true
}

// ensure there are no identical safenames
for (const watch of settings.watch)
    if (settings.watch.filter(s => s.__safename === watch.__safename).length > 1){
        console.log(`FATAL ERROR : Name collision detected for ${watch.name} (transformed to ${watch.__safename}). Please ensure that transformed names are unique by giving your watches unique names`)
        process.exit(1)
    }

/**
 * validate watch structure - must have
 * 
 * {
 *     name (string, optional, if not set path will be name)
 *     glob (string, required, any glob or array of globs allowed by chokidar
 *     command,
 *     on,
 *     valid (bool)
 *     state (string, reports last state of watch, used to report immediate errors, invalid settings etc)
 * }
 * 
 */
module.exports = settings