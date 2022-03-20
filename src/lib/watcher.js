const chokidar = require('chokidar'),
    exec = require('madscience-node-exec')

module.exports = class Watcher {
    constructor(name, glob, command, events = [], options = {             
        persistent: true,
        usePolling: true,
        ignoreInitial : true
    }){
        this.command = command
        this.name = name
        this.watcher = chokidar.watch(glob, options)
        
        if (typeof events === 'string')
            events = [events]

        if (events.includes('add'))
            this.watcher.on('add', async ()=>{
                await this.handleEvent()
            })

        if (events.includes('edit'))
            this.watcher.on('change', async ()=>{
                await this.handleEvent()
            })

        if (events.includes('delete'))
            this.watcher.on('unlink', async ()=>{
                await this.handleEvent()
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

    async handleEvent(){
        // run the actual job here
        await exec.sh({ 
            cmd : this.command, 
            onStdout : data => {
                data = this.shellTextToLines(data)
                for(const item of data)
                    console.log(item)
            }, 
            onStderr : data =>{
                console.log('ERR', data)
            },
            onStart : args => {
                console.log(`${this.name} starting`)
            },
            onEnd : result => {
                console.log(`${this.name} ended`)
            }
        })        
    }

}


