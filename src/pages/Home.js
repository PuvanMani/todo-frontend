import React from 'react'
import DataTable from '../component/DataTable';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';

function Home() {
    const row = [
        {
            key: '1',
            Name: 'Puvan',
            Discription: "Dashboard Task",
            Status: 'Active',
        },
        {
            key: '2',
            Name: 'Suresh',
            Discription: "Loging Page",
            Status: 'Completed',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Status',
            dataIndex: 'Discription',
            key: 'Discription',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: (a) => a == "Active" ? <Tag icon={<SyncOutlined spin />} color="processing">
                Active
            </Tag> : a == "Completed" ? <Tag icon={<CheckCircleOutlined />} color="success">
                Completed
            </Tag> : <Tag icon={<ClockCircleOutlined />} color="warning">
                Created
            </Tag>
        },
        {
            title: 'Action',
            render: (val) => <Link to={`/edit/${val.key}`}><Button type='primary'><EditOutlined /></Button></Link>,
        },
    ];
    return (
        <>
            <div>
                <Link to='/add'><Button type="primary" style={{ margin: "16px 8px" }}>Add Todo</Button></Link>
            </div>
            <DataTable row={row} columns={columns} />
        </>
    )
}

export default Home
