const settings = require('./settings'),
    fs = require('fs-extra'),
    process = require('process'),
    Watcher = require('./watcher')

module.exports = {
    async start(){

        // set up directory structure for watchers
        try {
            await fs.ensureDir(settings.dataDirectory)
        } catch(ex){
            console.log(`FATAL ERROR : failed to create internal data directory @ ${settings.dataDirectory}`, ex)
            return process.exit(1)
        }

        for(const watch of settings.watch.filter(watch => watch.valid)){
            new Watcher(watch)
            console.log(`started watcher ${watch.name}`)
        }
    }
}