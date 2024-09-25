import React, {useState, useEffect} from 'react'
// import Footer from '../components/footerComponent/footer'
// import Home from '../components/homeComponent/homeComponent'
// import Header from '../components/headerComponent/header'
import {Layout} from 'antd';
import {useNavigate} from 'react-router-dom';
import jwtDecode from "jwt-decode";

export default function RegisterPage() {

    const navigate = useNavigate();
    let [isAuth, setAuth] = useState(false)

    return (
        // isAuth
        //     ?
        <Layout>
            {/*<Header/>*/}
            {/*<Home/>*/}
            {/*<Footer/>*/}
        </Layout>
        // :
        // <p/>
    );
};