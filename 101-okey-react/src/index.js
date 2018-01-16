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
import jwt_decode from 'jwt-decode';
import {socket} from "./constants/socket-io-client";


const store = createStore(reducer);


const checkAuth = () => {
    const state = store.getState();
    let jwtRes = jwt_decode(state.user.token);
    let Now = Math.round(+new Date() / 1000);

    if (state.user.token != null && jwtRes.exp > Now) {
        //online kullanıcılar olarak ekler
        socket.emit('logIntoUsers', jwtRes.data.nick);
        return true;
    }

    return false;
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