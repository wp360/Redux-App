import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import { counter, add, reduce, addAsync } from './redux/index';

import registerServiceWorker from './registerServiceWorker';

//const reduxDevtools = window.devToolsExtension;
//组合函数compose的使用 替换createStore(counter, applyMiddleware(thunk));
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
));

function render(){
    ReactDOM.render(<App store={store} add={add} reduce={reduce} addAsync={addAsync} />, document.getElementById('root'));
}

render();
//订阅
store.subscribe(render);

registerServiceWorker();
