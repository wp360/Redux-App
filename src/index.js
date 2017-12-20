import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
//React-Redux 提供Provider组件，可以让容器组件拿到state
import { Provider } from 'react-redux';

import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import reducers from './reducer';
import Auth from './Auth.js';
import Dashboard from './Dashboard';

import registerServiceWorker from './registerServiceWorker';

//const reduxDevtools = window.devToolsExtension;
//组合函数compose的使用 替换createStore(counter, applyMiddleware(thunk));
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
));
console.log(store.getState());

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Auth} />
                <Route path="/dashboard" component={Dashboard} />
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)

registerServiceWorker()