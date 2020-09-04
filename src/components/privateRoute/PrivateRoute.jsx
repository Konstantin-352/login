import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ authed, children, redirect, ...rest }) => {
    return (
        <div>
            <Route {...rest} render={ () => ( authed ? children : <Redirect to={redirect} />)}/>
        </div>
    )
};

export default PrivateRoute;