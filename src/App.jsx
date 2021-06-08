import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/core/header';
import LoginDialog from './components/core/auth/login-dialog';
import SignUpDialog from './components/core/auth/signup-dialog';

import './App.scss';
import {AuthPage} from "./components/core/auth/auth-page";
import {PrivateRoute} from "./components/core/auth/private-route";
import {MainView} from "./components/core/main-view";

const privateRoutes = [
    {
        path: '/',
        component: MainView,
        exact: true
    },
];


function App() {
    return (
        <>
            <div className="app-wrapper">
                <BrowserRouter>
                    <LoginDialog/>
                    <SignUpDialog/>
                    <Switch>
                        <Route exact path="/login" component={AuthPage}/>
                        {privateRoutes.map((route) => {
                                return (
                                    <>
                                        <Header/>
                                        <PrivateRoute exact={route.exact} path={route.path} component={route.component}/>
                                    </>
                                )
                            }
                        )}
                    </Switch>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
