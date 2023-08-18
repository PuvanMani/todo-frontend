import React, { useEffect, useState } from 'react'
import DataTable from '../component/Table/DataTable';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { Axios } from '../Config/axiosConfig';


function Home() {

    const [TaskList, setTaskList] = useState([])
    const statusValue = {
        Completed: 2,
        Active: 1,
    };

    const customStatusSorter = (a, b) => {
        return statusValue[a] - statusValue[b];
    };
    const ListTodo = () => {
        Axios.post("/task/list", { UserID: localStorage.getItem("userid") }).then((res) => {
            if (res.data.Status) {
                setTaskList([...res.data.Message])
            }
        })
    }
    const DeleteRow = (TaskID) => {
        Axios.post("/task/delete", { TaskID }).then((res) => {
            if (res.data.Status) {
                ListTodo()
            }
        })
    }

    useEffect(() => {
        ListTodo()
    }, [])


    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'TaskName',
            key: 'TaskName',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            sorter: (a, b) => customStatusSorter(a.Status, b.Status),
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
            render: (val) => <>
                <Link to={`/view/${val.TaskID}`}><Button type='primary'><EyeOutlined /></Button></Link>
                <Link to={`/edit/${val.TaskID}`} style={{ margin: "0px 10px" }}><Button type='primary' ><EditOutlined /></Button></Link>
                <Button onClick={() => DeleteRow(val.TaskID)} type='primary' danger><DeleteOutlined /></Button>
            </>,
        },
    ];
    return (
        <>
            <div>
                <Link to='/add'><Button type="primary" style={{ margin: "16px 8px" }}>Add Todo</Button></Link>
            </div>
            <DataTable row={TaskList} columns={columns} pagination={false} />
        </>
    )
}

export default Home;
