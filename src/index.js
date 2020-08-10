import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import burguerBuilderReducer from './store/reducers/burguerBuilder'

import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(burguerBuilderReducer, composeEnhancers(
    applyMiddleware(thunk)
));
 
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
