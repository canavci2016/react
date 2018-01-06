import React from 'react';
import  ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import  {Router,Route,browserHistory,Redirect} from  'react-router';
import reducer from "./reducers";
import  App from './components/App';
import  SignIn from './components/SignIn';
import  RoomJoin from './components/RoomJoin';
import  NoMatch from './components/NoMatch';
import  {socket} from "./constants/socket-io-client";
import   {signedUser,setSocket} from './actions';

const  store=createStore(reducer);

store.dispatch(setSocket(socket));

socket.emit('isLogin',{});

socket.on('isLogin',function(res){

    if (res.code===101) //authenticed
    {
        const  userObject={
            nick:res.nickname
        };
        store.dispatch(signedUser(userObject));
        browserHistory.push('/app');
    }
    else
        browserHistory.replace('/signin');

});


ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Redirect from="/awdawd" to='/ccc'/>
            <Route path="/app" component={App}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="join-room/:id" component={RoomJoin}/>
            <Route path="*" component={NoMatch}/>
        </Router>
    </Provider>
    ,document.getElementById('root'));