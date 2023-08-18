import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { Axios } from '../../../Config/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const nav = useNavigate()
    const [UserNameMsg, setUserNameMsg] = useState("Please input your Username!");
    const [PasswordMsg, setPasswordMsg] = useState("Please input your Password!");
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorObj, setErorObj] = useState({
        Username: false,
        Password: false
    })

    const handleSubmit = () => {
        let err = {
            Username: UserName.trim() == "",
            Password: Password.trim() == ""
        }
        if (Object.values(err).some((val) => val == true)) {
            setErorObj(err)
        } else {
            Axios.post("/auth/login", { UserName, Password }).then((res) => {
                if (res.data.Status) {
                    setErorObj(err)
                    localStorage.setItem("token", res.data.Message[0]?.token);
                    localStorage.setItem("username", res.data.Message[0]?.UserName);
                    localStorage.setItem("userid", res.data.Message[0]?.UserID);
                    nav("/")
                } else {
                    if (res.data.Message == "UserName Not Found") {
                        setErorObj({
                            Username: true,
                            Password: false
                        })
                        setUserNameMsg("User Not Found")
                    } else {
                        setErorObj({
                            Username: false,
                            Password: true
                        })
                        setPasswordMsg("Check Your Password")
                    }
                }
            })
        }


    };

    return (<Row style={{ width: "98vw", height: "98vh", alignItems: "center", justifyContent: "center" }}>
        <Col xs={20} md={16} lg={8}>
            <Typography.Title level={2} style={{ textAlign: "center" }}>Login</Typography.Title>
            <Form layout='vertical' name="basic" autoComplete="off" >
                <Form.Item
                    label="Username"
                    validateStatus={ErrorObj.Username ? 'error' : ''}
                    help={ErrorObj.Username ? UserNameMsg : ''}
                    required
                >
                    <Input onChange={(e) => setUserName(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    validateStatus={ErrorObj.Password ? 'error' : ''}
                    help={ErrorObj.Password ? PasswordMsg : ''}
                    required
                >
                    <Input.Password onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    style={{ textAlign: "center" }}
                >
                    <Link to='/register' style={{ textAlign: "right", display: "block", marginBottom: "10px" }}>I don't Have a Account. Register</Link>
                    <Button type="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>)
}
export default LoginForm;