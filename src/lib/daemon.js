module.exports = {

    start(){
        const CronJob = require('cron').CronJob,
            settings = require('./settings')

        this.internalWorker = new CronJob(settings.internalWorkerTimer, this.work.bind(this), 
        null, 
        true, 
        null, 
        null, 
        true /*runonitit*/)
    },

    async work(){
        const fs = require('fs-extra'),
            settings = require('./settings'),
            history = require('./history'),
            log = require('./log').instance()
       
        for (let watch of settings.watch){
            let files = await history.getStale(watch.__safename) 

            for (let file of files) {
                try {
                    console.log('cleaning out', file)
                    await fs.remove(file)
                } catch (ex){
                    log.error(ex)
                }
            }
        }


        // clean out old logs

    }

}