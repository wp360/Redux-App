import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import App from './App';
import { counter } from './redux/index';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(counter);

function render(){
    ReactDOM.render(<App store={store} />, document.getElementById('root'));
}

render();
//订阅
store.subscribe(render);

registerServiceWorker();
