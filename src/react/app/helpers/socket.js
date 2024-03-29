import io from 'socket.io-client'
import { setEvents, setHistory, setSettings } from './../actions/events'
import settings from './../settings/settings'

export default function initialize(){

    const socket = io.connect(`${settings.protocol}://${settings.host}:${settings.port}`, { 
        reconnect: true 
    })
    
    socket.on('file_event', async data => {
        console.log(data)
        setEvents(data.events)
    })

    socket.on('initialize', async data => {
        console.log(data)
        setHistory(data.events)
        setSettings(data.settings)
    })
}
