import React from 'react';
import {
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    HOME_ROUTE,
} from "./utils";
import Signin from "./page/authPage";
import Signup from './page/registerPage';
import HomePage from './page/homePage';

export const routes = [
    {
        path: SIGNIN_ROUTE,
        Component: <Signin/>
    },
    {
        path: SIGNUP_ROUTE,
        Component: <Signup/>
    },
    {
        path: HOME_ROUTE,
        Component: <HomePage/>
    },
]