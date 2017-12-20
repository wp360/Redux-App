import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
//React-Redux 提供Provider组件，可以让容器组件拿到state
import { Provider } from 'react-redux';
import App from './App';
import { counter } from './redux/index';
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

//const reduxDevtools = window.devToolsExtension;
//组合函数compose的使用 替换createStore(counter, applyMiddleware(thunk));
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
));

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topics = () => (
    <div>
        <h2>Topics</h2>
    </div>
)

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>
                <hr />
                <Route exact path="/" component={App} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)

registerServiceWorker()