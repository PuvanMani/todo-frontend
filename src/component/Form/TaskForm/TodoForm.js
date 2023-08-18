import { Button, Col, Form, Input, Layout, Row, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../../../Config/axiosConfig';
import moment from 'moment/moment';
const { Title } = Typography;
const { Content } = Layout;
const { Item } = Form;

function AddTodoForm() {
    const params = useParams()
    const nav = useNavigate()
    const [selectedOption, setSelectedOption] = useState("Active")
    const [Name, setName] = useState("")
    const [Discription, setDiscription] = useState("")
    const [Disabe, setDisabe] = useState(false)
    const [ErrorObj, setErorObj] = useState({
        Name: false,
        Discription: false
    })




    const handleSelectChange = (val) => {
        setSelectedOption(val)
    }

    const ListByID = () => {
        Axios.post("/task/listbyid", { TaskID: params.id }).then((res) => {
            if (res.data.Status) {
                if (res.data.Message.length > 0) {
                    setName(res.data.Message[0].TaskName ? res.data.Message[0].TaskName : "")
                    setDiscription(res.data.Message[0].Description ? res.data.Message[0].Description : "")
                    setSelectedOption(res.data.Message[0].Status ? res.data.Message[0].Status : "")
                } else {
                    nav('/')
                }
            }
        })
    }

    const handileSumbit = () => {
        let error = {
            Name: Name.trim() == "",
            Discription: Discription.trim() == ""
        }
        if (Object.values(error).some((val) => val == true)) {
            setErorObj(error)
        } else {
            setErorObj(error)
            if (params.action == 'edit') {
                let data = {
                    TaskName: Name,
                    TaskID: params.id,
                    Description: Discription,
                    Status: selectedOption,
                    UserID: localStorage.getItem("userid"),
                    UpdatedDate: moment(new Date()).format("YYYY-MM-DD")
                }
                Axios.post("task/update", data).then((res) => {
                    if (res.data.Status) {
                        nav("/")
                    } else {
                        console.log(res.data.Message)
                    }
                })
            } else {
                let data = {
                    TaskName: Name,
                    Description: Discription,
                    Status: selectedOption,
                    UserID: localStorage.getItem("userid"),
                    CreatedDate: moment(new Date()).format("YYYY-MM-DD")
                }
                Axios.post("task/insert", data).then((res) => {
                    if (res.data.Status) {
                        nav("/")
                    } else {
                        console.log(res.data.Message)
                    }
                })
            }
        }
    }


    useEffect(() => {
        if (params.action == "edit") {
            ListByID()
            setDisabe(false)
        } else if (params.action == "view") {
            ListByID()
            setDisabe(true)
        }
        else {
            setDisabe(false)
            setSelectedOption("Active")
            setName("")
            setDiscription("")
        }
    }, [params.action])

    return (
        <Content
            style={{
                padding: 24,
                paddingLeft: "20px",
            }}
        >
            <Title level={3}>Add Todo</Title>
            <Form layout='vertical'>
                <Row gutter={20}>
                    <Col xs={24} sm={12} >
                        <Item label="Name" required
                            validateStatus={ErrorObj.Name ? 'error' : ''}
                            help={ErrorObj.Name ? 'Please enter a description' : ''}>
                            <Input disabled={Disabe} placeholder='Name' onChange={(e) => setName(e.target.value)} value={Name} />
                        </Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Item label="Discription"
                            validateStatus={ErrorObj.Discription ? 'error' : ''}
                            help={ErrorObj.Discription ? 'Please enter a description' : ''}>
                            <Input disabled={Disabe} placeholder='Discription' onChange={(e) => setDiscription(e.target.value)} value={Discription} />
                        </Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Item label="Status" required>
                            <Select
                                style={{ width: "100%" }}
                                value={selectedOption}
                                disabled={Disabe}
                                onChange={handleSelectChange}
                                options={[
                                    { value: 'Active', label: 'Active' },
                                    { value: 'Completed', label: 'Completed' },
                                ]}
                            />
                        </Item>
                    </Col>
                    {
                        Disabe ? "" : <Col xs={24} style={{ marginTop: "20px" }}>
                            <Button type='primary' onClick={handileSumbit}>{params.action ? "Save" : "Create"}</Button>
                        </Col>
                    }
                </Row>
            </Form>
        </Content>
    )
}

export default AddTodoForm
