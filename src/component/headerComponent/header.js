import React, {useState} from 'react'

import {Layout, Button, Menu} from 'antd';
import '../headerComponent/header.css'
import logo from '../headerComponent/logo-white.png'
import {
    HOME_ROUTE,
} from "../../utils";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import jwtDecode from "jwt-decode";

export default function Header() {
    const location = useLocation();
    const {Header} = Layout;

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/signin');
    };

    const items = [
        {
            label: (
                <Link to={HOME_ROUTE}>Main page</Link>
            ),
            key: "/home",
        },
    ];

    const [current, setCurrent] = useState(location.pathname);
    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 999,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 0
            }}
        >
            <Link to={HOME_ROUTE}>
                <h1 style={{color: 'white'}}>LOGO</h1>
            </Link>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                theme="dark"
                items={items}
            />

            <Button onClick={logout} ghost style={{width: 'auto'}}>
                Выйти
            </Button>
        </Header>
    );
};
