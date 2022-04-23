import io from 'socket.io-client'
import { setEvents } from './../actions/events'
import settings from './../settings/settings'

export default function initialize(){
    const socket = io.connect(`${settings.protocol}://${settings.host}:${settings.port}`, { reconnect: true })
    
    socket.on('file_event', async data => {
        console.log(data)
        setEvents(data)
    })
}
