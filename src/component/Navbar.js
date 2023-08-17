import { Layout, Typography } from 'antd';
import React from 'react';
const { Title } = Typography;
const { Header } = Layout;


function Navbar() {

    return (
        <Header style={{
            padding: 0,
            margin: "0",
            background: "#DAFFFB",
            display: "flex",
            alignItems: "center",
        }}>
            <Title level={5} style={{ margin: "0px", paddingLeft: "20px" }}>Todo </Title>
        </Header>
    )
}

export default Navbar
