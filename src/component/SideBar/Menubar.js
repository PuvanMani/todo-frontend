import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const { Sider } = Layout;
const { Item } = Menu;


function Menubar() {
    const nav = useNavigate()



    const LogOut = () => {
        localStorage.clear()
        nav('/login')
    }
    let MenuText = [
        {
            key: '1',
            label: 'Home',
            path: "/"
        },
        {
            key: '2',
            label: 'Add Todo',
            path: "/add"
        },

    ]
    return (
        <Sider breakpoint="md" style={{ height: "100vh", backgroundColor: "#FFF" }} collapsedWidth="0" >
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
            >
                {MenuText.map((val) => {
                    return (<Item key={val.key}><Link to={val.path}>{val.label}</Link></Item>)
                })}
                <Item onClick={() => LogOut()}>Logout</Item>
            </Menu>
        </Sider>
    )
}

export default Menubar
