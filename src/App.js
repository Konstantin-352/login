import React from 'react';
import './App.css';
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import PrivateRoute from './components/privateRoute/PrivateRoute'
import {Switch} from "react-router-dom";
import {connect} from "react-redux";

function App({token}) {
    const isLogged = () => !!token;

    return (
        <Switch>
            <PrivateRoute exact path='/' authed={!isLogged()} redirect='/profile'>
                <Login />
            </PrivateRoute>
            <PrivateRoute exact path='/profile' authed={isLogged()} redirect='/'>
                <Profile token={token}/>
            </PrivateRoute>
        </Switch>
    );
}

const mapStateToProsp = state => ({
    token: state.authorization.token.accessToken
});

export default connect(mapStateToProsp)(App);
