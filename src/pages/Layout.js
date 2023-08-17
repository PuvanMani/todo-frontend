import { Col, Layout, Row, Typography, theme } from 'antd';
import React, { useState } from 'react'
import Navbar from '../component/Navbar';
import Menubar from '../component/Menubar';
import AllRouter from '../router/AllRouter';
import LoginForm from '../component/Form/LoginForm';

function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            {true ? <LoginForm /> : (<div><Menubar />
                <Layout>
                    <Navbar colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} collapsed={collapsed} />
                    <AllRouter colorBgContainer={colorBgContainer} />
                </Layout></div>)
            }
        </Layout>

    )
}

export default MainLayout
