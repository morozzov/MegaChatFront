import React, {useState, useEffect} from 'react'
import {Layout} from 'antd';
import {useNavigate} from 'react-router-dom';
import Signup from "../component/signupComponent";
import {isTokenValid} from "../utils/authUtils";
import {HOME_ROUTE} from "../utils";

export default function RegisterPage() {

    const navigate = useNavigate();
    let [isAuth, setAuth] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null || !isTokenValid(token)) {
            localStorage.removeItem("token");
            setAuth(false);
        } else {
            setAuth(true);
            navigate(HOME_ROUTE);
        }
    }, [navigate]);

    return (
        !isAuth
            ?
            <Layout>
                <Signup/>
            </Layout>
            :
            <p/>
    );
};