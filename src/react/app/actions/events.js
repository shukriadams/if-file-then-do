import store from './../store/store'

const setEvents = events => store.dispatch({ type: 'SET_EVENTS', events }),
    setHistory = events => store.dispatch({ type: 'SET_HISTORY', events }),
    setSettings = settings => store.dispatch({ type: 'SET_SETTINGS', settings })

let fetchEvents = async ()=>{ 
    const events = await getJsonAsync('/events')
    setEvents(events)
} 

export {
    setEvents,
    setHistory,
    setSettings,
    fetchEvents
}