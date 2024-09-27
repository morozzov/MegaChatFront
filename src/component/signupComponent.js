import React, {useState} from 'react'
import {Layout, Button, Form, Input, Card, Alert, Spin} from 'antd';
import {checkUsername} from "../http/UserApi";
import {registration} from "../http/UserApi";
import {Link, useNavigate} from 'react-router-dom';
import {SIGNIN_ROUTE} from '../utils';

export default function Signup() {

    const {Content} = Layout;
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");

    const [adding, setAdding] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const handleClose = () => {
        setAlertVisible(false);
    };

    const checkUsernameAvailability = async (rule, value) => {
        try {
            const response = await checkUsername(value);
            if (response.data) {
                return Promise.resolve();
            } else {
                return Promise.reject('Username is already busy');
            }
        } catch (error) {
            console.error(error);
            return Promise.reject('An error occurred when checking uniqueness');
        }
    };

    const checkPasswords = async (rule, value) => {
        try {
            if (password === password2) {
                return Promise.resolve();
            } else {
                return Promise.reject('Passwords do not match');
            }
        } catch (error) {
            console.error(error);
            return Promise.reject('An error occurred when checking passwords');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo);
    }

    const onFinish = async (values) => {
        setAdding(true);
        await registration(username, password, name).then(
            response => {
                let token = response.data
                navigate('/home')
            }).catch(
            error => {
                setAlertVisible(true);
                setAdding(false);
                console.log(error)
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
                <Card
                    title="Sign up"
                    style={{display: "inline-block", margin: "auto"}}
                >
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        labelCol={{span: 9}}
                        wrapperCol={{span: 15}}
                        layout="horizontal"
                    >
                        <Form.Item
                            name="username"
                            label="Username"
                            initialValue={username}
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter the username',
                                },
                                {
                                    validator: checkUsernameAvailability,
                                },
                            ]}
                        >
                            <Input
                                onChange={event => {
                                    setUsername(event.target.value)
                                }}
                                onBlur={username.handleBlur}
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
                            label="Password"
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
                        <Form.Item
                            name="password2"
                            label="Password again"
                            initialValue={password}
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter the password',
                                },
                                {
                                    validator: checkPasswords,
                                },
                            ]}
                        >
                            <Input.Password
                                onChange={event => {
                                    setPassword2(event.target.value)
                                }}
                                name="password2"
                                type="password"
                                placeholder="Password confirmation"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Name"
                            initialValue={name}
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter the name',
                                },
                            ]}
                        >
                            <Input
                                onChange={event => {
                                    setName(event.target.value)
                                }}
                                onBlur={name.handleBlur}
                                name="name"
                                type="text"
                                placeholder="Name"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        {adding ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Spin/>
                            </div>
                        ) : (
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: '100%',
                                }}>
                                Sign up
                            </Button>
                        )}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <p>Already have an account? <Link to={SIGNIN_ROUTE}>Sign in</Link></p>
                        </div>
                    </Form>
                    {alertVisible && (
                        <Alert message="Error in creating an account" type="error" closable
                               afterClose={handleClose}
                               style={{marginTop: '1vw',}}/>
                    )}
                </Card>
            </div>
        </Content>
    )
}
