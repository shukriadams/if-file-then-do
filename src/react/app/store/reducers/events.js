let defaultState = {
    events: []
}

export default function screenshot(state = defaultState, action) {

    switch (action.type) {

        case 'SET_EVENTS': {
            let events = state.events.concat(action.events)
            events.sort((a, b)=> a.date > b.date ? -1 : b.date > a.date ? 1 :0)
            events =  events.slice(0, 10)
            return Object.assign( { }, state, { events });
        }

        case 'SET_HISTORY': {
            action.events.sort((a, b)=> a.date > b.date ? -1 : b.date > a.date ? 1 :0 )

            return Object.assign( { }, state, { events: action.events });
        }


        default:{
            return state;
        }
    }
}