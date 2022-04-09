let yaml = require('js-yaml'),
    fs = require('fs-extra'),
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
    watch : [ ],
}, settings)

for (const watch of settings.watch){
    watch.valid = false
    watch.state = ''

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

    watch.valid = true
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