import React, {useState, useEffect} from 'react'
import {Layout} from 'antd';
import {useNavigate} from 'react-router-dom';
import Home from "../component/homeComponent";
import Header from "../component/headerComponent/header";
import {isTokenValid} from "../utils/authUtils";
import {SIGNIN_ROUTE} from "../utils";

export default function HomePage() {

    const navigate = useNavigate();
    let [isAuth, setAuth] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null && isTokenValid(token)) {
            setAuth(true);
        } else {
            localStorage.removeItem("token");
            setAuth(false);
            navigate(SIGNIN_ROUTE)
        }
    }, [navigate]);

    return (
        isAuth
            ?
            <Layout>
                <Header/>
                <Home/>
                {/*<Footer/>*/}
            </Layout>
            :
            <p/>
    );
};