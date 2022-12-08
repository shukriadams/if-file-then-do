const chokidar = require('chokidar'),
    exec = require('madscience-node-exec'),
    settings = require('./settings'),
    fs = require('fs-extra'),
    timebelt = require('timebelt'),
    path = require('path'),
    cuid = require('cuid'),
    socket = require('./socket') 

module.exports = class Watcher {

    constructor(config, options = {             
        persistent: true,
        usePolling: true,
        ignoreInitial : true
    }){
        this.config = config

        this.dataPath = path.join(settings.dataDirectory, 'watch', this.config.__safename)
        fs.ensureDirSync(this.dataPath)
        
        this.watcher = chokidar.watch(this.config.path, options)
        let events = this.config.on

        if (typeof events === 'string')
            events = [events]

        if (events.includes('add'))
            this.watcher.on('add', async (filePath, fileinfo)=>{
                await this.handleEvent(filePath, fileinfo, 'add')
            })

        if (events.includes('edit'))
            this.watcher.on('change', async (filePath, fileinfo)=>{
                await this.handleEvent(filePath, fileinfo, 'edit')
            })

        if (events.includes('delete'))
            this.watcher.on('unlink', async (filePath, fileinfo)=>{
                await this.handleEvent(filePath, fileinfo, 'delete')
            })
    }

    // splits a wall of shell text into an array of lines
    shellTextToLines(input){
        input = input.replace(/\r\n/g, '\n')
        input = input.replace(/\r/g, '\n')
        input = input.replace(/\\n/g, '\n')
        input = input.replace(/\\r/g, '\n')
        return input.split('\n')
    }
    
    /**
     * Cleans out old log files 
     */
    async clean(){

    }

    async handleEvent(filePath, fileinfo, eventType){
        
        let consoleOut = '',
            passed = false

        // run the actual job here
        try  {
            await exec.sh({ 
                cmd : this.config.command, 
                onStdout : data => {
                    data = this.shellTextToLines(data)
                    for(const item of data){
                        consoleOut += item
                        console.log(item)
                    }
                }, 
                onStderr : data =>{
                    console.log('ERR', data)
                    consoleOut += data
                },
                onStart : args => {
                    console.log(`${this.config.name} starting`)
                },

                /**
                 * Result is {
                 *    code: int,
                 *    passed: bool,
                 *    result: string
                 * }
                 */
                onEnd : async result => {
                    passed = result.passed
                    consoleOut += `Exited with code: ${result.code}. ${result.result}` 
                    this.afterEvent(filePath, consoleOut, passed, eventType)
                }
            })     
        } catch (ex){
            consoleOut += JSON.stringify(ex)
        }
    }

    async afterEvent(filePath, consoleOut, passed, eventType){
        const date = new Date(),
            data = {
                date: new Date(),
                name: this.config.__safename,
                file : filePath,
                result : consoleOut,
                eventType,
                passed
            }

        await fs.writeJson(path.join(this.dataPath, `${timebelt.toShort(date, 'd_t', 'ymd', 'hms')}_${cuid()}.json`), 
            data, 
            {
                spaces: 4
            })

        socket.send('file_event', { events : [data] })
        console.log(`${this.config.name} ended`)
    }

}


