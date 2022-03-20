const settings = require('./settings'),
    Watcher = require('./watcher')

module.exports = {
    async start(){
        for(const watch of settings.watch){
            new Watcher(watch.name, watch.path, watch.do, watch.type)
            console.log(`started watcher ${watch.name}`)
        }
    }
}