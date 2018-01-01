import React from 'react';
import  ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import  {Router,Route,browserHistory} from  'react-router';
import reducer from "./reducers";
import  App from './components/App';

const  store=createStore(reducer);


ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/app" component={App}/>

        </Router>
    </Provider>
    ,document.getElementById('root'));