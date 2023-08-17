import { Button, Col, Form, Input, Layout, Row, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
const { Title } = Typography;
const { Content } = Layout;
const { Item } = Form;

function AddTodoForm() {
    const params = useParams()
    const [selectedOption, setSelectedOption] = useState("Created")
    const [Name, setName] = useState("")
    const [Discription, setDiscription] = useState("")
    const [ErrorObj, setErorObj] = useState({
        Name: false,
        Discription: false
    })
    const handleSelectChange = (val) => {
        setSelectedOption(val)
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
            console.log(Name, Discription, selectedOption)
        }
    }
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
                            <Input placeholder='Name' onChange={(e) => setName(e.target.value)} value={Name} />
                        </Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Item label="Discription"
                            validateStatus={ErrorObj.Discription ? 'error' : ''}
                            help={ErrorObj.Discription ? 'Please enter a description' : ''}>
                            <Input placeholder='Discription' onChange={(e) => setDiscription(e.target.value)} value={Discription} />
                        </Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Select
                            style={{ width: "100%" }}
                            value={selectedOption}
                            onChange={handleSelectChange}
                            options={[
                                { value: 'Created', label: 'Created' },
                                { value: 'Active', label: 'Active' },
                                { value: 'Completed', label: 'Completed' },
                            ]}
                        />
                    </Col>
                    <Col xs={24} style={{ marginTop: "20px" }}>
                        <Button type='primary' onClick={handileSumbit}>{params.action ? "Save" : "Create"}</Button>
                    </Col>
                </Row>
            </Form>
        </Content>
    )
}

export default AddTodoForm
