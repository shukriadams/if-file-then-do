let defaultState = {
    watch: []
}

export default function screenshot(state = defaultState, action) {

    switch (action.type) {


        case 'SET_SETTINGS': {

            return Object.assign( { }, state, action.settings )
        }


        default: {
            return state
        }
    }
}