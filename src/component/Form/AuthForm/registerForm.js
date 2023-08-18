import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { Axios } from '../../../Config/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const nav = useNavigate()
    const [UserNameMsg, setUserNameMsg] = useState("Please input your Username!");
    const [PasswordMsg, setPasswordMsg] = useState("Please input your Password!");
    const [ConfirmpassdMsg, setConfirmpassdMsg] = useState("Please input your Confirm Password!");

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const [ErrorObj, setErorObj] = useState({
        Name: false,
        Email: false,
        Username: false,
        Password: false,
        ConfirmPassword: false
    })

    const handleSubmit = () => {
        let err = {
            Name: Name.trim() == "",
            Email: Email.trim() == "",
            Username: UserName.trim() == "",
            Password: Password.trim() == "",
            ConfirmPassword: ConfirmPassword.trim() == "" || !(ConfirmPassword == Password),
        }
        if (Object.values(err).some((val) => val == true)) {
            setErorObj(err)
            setConfirmpassdMsg(!(ConfirmPassword == Password) ? "Password and Confirm Password Not Match" : ConfirmpassdMsg)
        } else {
            let data = {
                Name, UserName, Password, Email
            }

            Axios.post("/user/insert", data).then((res) => {
                if (res.data.Status) {
                    setErorObj(err)
                    nav('/login')
                } else {
                    if (res.data.Message == "Username Aldready Exist") {
                        setErorObj({
                            Username: true
                        })
                        setUserNameMsg("Username Aldready Exist ")
                    }
                }
            })
        }


    };

    return (<Row style={{ width: "98vw", height: "98vh", alignItems: "center", justifyContent: "center" }}>
        <Col xs={20} md={16} lg={8}>
            <Typography.Title level={2} style={{ textAlign: "center" }}>Register</Typography.Title>
            <Form layout='vertical' name="basic" autoComplete="off" >
                <Form.Item
                    label="Name"
                    validateStatus={ErrorObj.Name ? 'error' : ''}
                    help={ErrorObj.Name ? "Please input your Name!" : ''}
                    required
                >
                    <Input onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    validateStatus={ErrorObj.Email ? 'error' : ''}
                    help={ErrorObj.Email ? "Please input your Email!" : ''}
                    required
                >
                    <Input onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="User Name"
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
                    label="Confim Password"
                    validateStatus={ErrorObj.ConfirmPassword ? 'error' : ''}
                    help={ErrorObj.ConfirmPassword ? ConfirmpassdMsg : ''}
                    required
                >
                    <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    style={{ textAlign: "center" }}
                >
                    <Link to='/login' style={{ textAlign: "right", display: "block", marginBottom: "10px" }}>I Aldready Have a Account. Login</Link>
                    <Button type="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>)
}
export default RegisterForm;