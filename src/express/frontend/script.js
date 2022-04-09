import io from 'socket.io-client'
const body = document.querySelector('body')
body.style.backgroundColor = 'green'
const protocol = body.getAttribute('data-protocol') || 'http',
    host = body.getAttribute('data-host') || 'localhost',
    port = body.getAttribute('data-port') || '3000'

const socket = io.connect(`${protocol}://${host}:${port}`, { reconnect : true })
socket.on('dropbox.connected', data =>{
    console.log(data)
})
