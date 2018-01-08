import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import reducer from "./reducers";
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RoomJoin from './components/RoomJoin';
import NoMatch from './components/NoMatch';
import {socket} from "./constants/socket-io-client";
import {signedUser} from './actions';

const store = createStore(reducer);



const checkAuth = () => {
    socket.emit('isLogin', {});

    socket.on('isLogin', res => {
        console.log(res);

        if (res.code === 101) //authenticed
        {
            const userObject = {
                nick: res.nickname
            };
            store.dispatch(signedUser(userObject));
            return true;
        }
        else
            return false;


    });



};

const AuthRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/signin'}}/>
        )
    )}/>
);


ReactDOM.render(
    <Provider store={store}>
        <Router path="/">
            <Switch>
                <AuthRoute exact path="/app" component={App}/>
                <AuthRoute exact path="/join-room/:id" component={RoomJoin}/>
                <Redirect from="/awdawd" to='/ccc'/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));