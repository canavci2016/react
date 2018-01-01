import React from 'react';
import  ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import  {Router,Route,browserHistory} from  'react-router';
import reducer from "./reducers";
import  App from './components/App';
import  SignIn from './components/SignIn';
import  {socket} from "./constants/socket-io-client";


socket.emit('isLogin',{},function (res) {
    if (res===101) //authenticed
    {
        browserHistory.push('app');
    }
    else
    {
        browserHistory.replace('signin');

    }

});


const  store=createStore(reducer);


ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/app" component={App}/>
            <Route path="/signin" component={SignIn}/>

        </Router>
    </Provider>
    ,document.getElementById('root'));