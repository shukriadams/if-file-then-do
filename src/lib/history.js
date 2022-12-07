module.exports = {

    /**
     * sort descending age
     */
    _sort(a, b){ return a > b ? -1 : 
        a < b ? 1 : 
            0 
    },
    
    async getLatest(){
        let fsUtils = require('madscience-fsUtils'),
            fs = require('fs-extra'),
            path = require('path'),
            settings = require('./settings'),
            latestFiles = [],
            latest = []

        for (let watch of settings.watch){
            let files = await fsUtils.readFilesInDir(path.join(settings.dataDirectory, 'watch', watch.__safename))
            files.sort(this._sort)
            latestFiles = latestFiles.concat(files.slice(0, settings.viewLength))
        }

        for (let latestFile of latestFiles){
            const content = await fs.readJson(latestFile)
            latest.push(content)
        }
        
        return latest
    },

    async getStale(){
        let fsUtils = require('madscience-fsUtils'),
            path = require('path'),
            settings = require('./settings'),
            stale = []

        for (let watch of settings.watch){
            let files = await fsUtils.readFilesInDir(path.join(settings.dataDirectory, 'watch', watch.__safename))
            files.sort(this._sort)
    
            stale = stale.concat(files.slice(settings.historyLength))
        }

        return stale
    }
}