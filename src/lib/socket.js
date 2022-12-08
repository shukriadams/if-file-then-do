let io = null

module.exports = {

    initialize(express){
        const Socketio = require('socket.io'),
            history = require('./history'),
            settings = require('./settings')

        io = Socketio(express)
        io.on('connection', async socket => {
            console.log('client connected')
            socket.join('myclient')
            // get start payload
            const events = await history.getLatest()
            this.send('initialize', { events, settings : { watch : settings.watch } })
        })
    },

    send (eventName, data){
        console.log('sending' + data)
        io.to('myclient').emit(eventName, data)
    }

}