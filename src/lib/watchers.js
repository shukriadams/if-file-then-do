const settings = require('./settings'),
    Watcher = require('./watcher')

module.exports = {
    async start(){
        for(const watch of settings.watch.filter(watch => watch.valid)){
            new Watcher(watch.name, watch.path, watch.command, watch.on)
            console.log(`started watcher ${watch.name}`)
        }
    }
}