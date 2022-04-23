let io = null

module.exports = {

    initialize(express){
        const Socketio = require('socket.io')
        io = Socketio(express)
        io.on('connection', socket => {
            console.log('client connected')
            socket.join('myclient')
        })
    },

    send (eventName, data){
        console.log('sending' + data)
        io.to('myclient').emit(eventName, data)
    }

}