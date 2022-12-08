(async()=>{
    // set shortcut global for easier module imports. Modules are loaded relative to "server" directory
    global._$ = `${__dirname}/`

    const path = require('path'),
        jsonfile = require('jsonfile'),
        process = require('process'),
        minimist = require('minimist'),
        server = require('./lib/server'),
        watchers = require('./lib/watchers'),
        argv = minimist(process.argv.slice(2))

    if (argv.version || argv.v){
        const package = jsonfile.readFileSync(path.join( __dirname, '/package.json'))
        console.log(`if-file-then-do, version ${package.version}`)
        return process.exit(0)
    }

    if (argv.autostart){
        const regedit = require('regedit').promisified

        if (process.platform === 'win32'){
            console.error('Install app as a service is supported on Windows only')
            return process(1)
        }

        await regedit.putValue({
            'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run': {
                iffilethendo: {
                    value: 'c:\\test\\app.exe',
                    type: 'REG_SZ'
                }
            }
        })

        console.log('autostart enabled')
        return process.exit(0)
    }

    if (argv.noautostart){
        const regedit = require('regedit').promisified

        if (process.platform === 'win32'){
            console.error('Install app as a service is supported on Windows only')
            return process(1)
        }

        await regedit.deleteValue('HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\iffilethendo')
        console.log('autostart disabled')
        return process.exit(0)
    }

    watchers.start()
    await server.start()

})()

