let _io = null

module.exports = {

    initialize(express){
        const Socketio = require('socket.io')
        _io = Socketio(express)
        _io.on('connection', function (socket) {
            console.log('client connected')
            socket.join('myclient')
        })
    },

    send(file){
        console.log('sending' + file)
        _io.to('myclient').emit('dropbox.connected', { file : file })
    }

}