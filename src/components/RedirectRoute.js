import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const RedirectRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('sitejetUser')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/register', state: { from: props.location } }} />
    )} />
);

export const RedirectRouteresults = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Object.keys(JSON.parse(localStorage.getItem('sitejetUser')).currentTestAnswersList).length
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);

export const RedirectRouteLoginRegister = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('sitejetUser')
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            : <Component {...props} />
    )} />
);