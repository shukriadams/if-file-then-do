import { View as Default } from './../default/default'
import { View as Config } from './../config/config'
import { View as Item } from './../item/item';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Link } from 'react-router-dom'
import { history } from './../helpers/history';
import Store from './../store/store'
import { Provider } from 'react-redux'
import socketInitialize from './../helpers/socket';
import { Layout } from './../layout/layout';
import {View as Loader } from './../loader/loader';
import listWatcher from './../store/watchers/list'; // importing watcher will start it
import pubsub from './../helpers/pubsub';

(async ()=>{
    pubsub.once('main', 'onRehydrated', async ()=>{
        ReactDOM.render(
            <Router history={history}>
                <Provider store={Store}>
                    <Switch>
                        <Layout>
                            <Route exact path="/" component={Default} />
                            <Route exact path="/config" component={Config} />
                        </Layout>
                    </Switch>
                </Provider>
            </Router>,
            document.getElementById('reactHook')
        );
    
        socketInitialize()
    })
})()
