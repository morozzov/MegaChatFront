import React, {useState} from 'react'
import {Layout, Button, Form, Input, Card, Alert, Typography, Modal} from 'antd';
import {login} from "../http/UserApi";
import {Link, useNavigate} from 'react-router-dom';
import { SIGNUP_ROUTE} from '../utils';

const {Paragraph} = Typography;

export default function Signin() {
    const {Content} = Layout;
    const navigate = useNavigate();

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertDisabledVisible, setAlertDisabledVisible] = useState(false);
    const handleClose = () => {
        setAlertVisible(false);
    };
    const handleDisabledClose = () => {
        setAlertDisabledVisible(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo);
    }

    const onFinish = async (values) => {
        let credentials = {
            username: username,
            password: password
        }
        await login(username, password).then(
            response => {
                let token = response.data
                navigate('/home')

            }).catch(
            error => {
                if (error.response && error.response.status === 403) {
                    setAlertDisabledVisible(true);
                } else {
                    setAlertVisible(true);
                }
            }
        )
    };

    return (
        <Content
            className="site-layout"
            style={{
                padding: 0,
            }}
        >
            <div
                style={{
                    minHeight: '100vh',
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Card className="signin"
                      title={<div>
                          Sign in</div>}
                      style={{display: "inline-block", margin: "auto"}}
                >
                    {alertVisible && (
                        <Alert message="Incorrect username or password" type="error" closable
                               afterClose={handleClose}
                               style={{marginBottom: '1vw',}}/>
                    )}
                    {alertDisabledVisible && (
                        <Alert message="Your account was banned" type="error" closable
                               afterClose={handleDisabledClose}
                               style={{marginBottom: '1vw',}}/>
                    )}
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                            name="username"
                            initialValue={username}
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter the username',
                                }
                            ]}
                        >
                            <Input
                                onChange={event => {
                                    setUsername(event.target.value)
                                }}
                                name="username"
                                type="text"
                                placeholder="Username"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            initialValue={password}
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter the password',
                                },
                            ]}
                        >
                            <Input.Password
                                onChange={event => {
                                    setPassword(event.target.value)
                                }}
                                onBlur={password.handleBlur}
                                name="password"
                                type="password"
                                placeholder="Password"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '100%',
                            }}>
                            Sign in
                        </Button>
                        <Link to={SIGNUP_ROUTE}>Create an account</Link><br/>
                    </Form>
                </Card>
            </div>
        </Content>
    )
}
