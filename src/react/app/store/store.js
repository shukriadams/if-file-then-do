import { combineReducers, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'localforage'
import events from './reducers/events'
import settings from './reducers/settings'
import pubsub from './../helpers/pubsub'

const persistConfig = {
    key: 'root',
    storage,
    blacklist : ['events, settings']
}

let reducers = combineReducers({
    events,
    settings
})

const persistedReducer = persistReducer( persistConfig, reducers ),
    store = createStore(persistedReducer)

persistStore(store, {}, function(){
    pubsub.pub('onRehydrated')
})

export default store
