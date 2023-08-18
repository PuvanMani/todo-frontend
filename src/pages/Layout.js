import { Col, Layout, Row, Typography, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar/Navbar';
import Menubar from '../component/SideBar/Menubar';
import AllRouter from '../router/AllRouter';
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
                    <div style={{ padding: "0px 10px" }}>

                        <AllRouter colorBgContainer={colorBgContainer} />
                    </div>
                </Layout>
            </Layout> : <AllRouter />}
        </Layout>

    )
}

export default MainLayout
