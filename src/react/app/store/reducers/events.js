let defaultState = {
    events: []
}

export default function screenshot(state = defaultState, action) {

    switch (action.type) {

        case 'SET_EVENTS': {
            return Object.assign( { }, state, { events: action.events });
        }

        default:{
            return state;
        }
    }
}