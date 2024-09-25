import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {routes} from "./routes";
import {
    SIGNIN_ROUTE,
    HOME_ROUTE,
    SIGNUP_ROUTE,
} from "./utils";

const AppRouter = () => {
    const user = true
    return (
        <Routes>
            {user === true && routes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            <Route path={"*"} element={<Navigate to={SIGNIN_ROUTE}/>}/>
            <Route path={"signin"} element={<Navigate to={SIGNIN_ROUTE}/>}/>
            <Route path={"signup"} element={<Navigate to={SIGNUP_ROUTE}/>}/>
            <Route path={"home"} element={<Navigate to={HOME_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;