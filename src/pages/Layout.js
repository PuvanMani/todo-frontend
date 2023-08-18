import { Col, Layout, Row, Typography, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar';
import Menubar from '../component/Menubar';
import AllRouter from '../router/AllRouter';
import LoginForm from '../component/Form/AuthForm/LoginForm';
import RegisterForm from '../component/Form/AuthForm/registerForm';
import { useNavigate } from 'react-router-dom';

function MainLayout() {
    let nav = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            {localStorage.getItem("token") ? <Layout><Menubar />
                <Layout>
                    <Navbar colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} collapsed={collapsed} />
                    <AllRouter colorBgContainer={colorBgContainer} />
                </Layout>
            </Layout> : <AllRouter />}
        </Layout>

    )
}

export default MainLayout
