import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Table, Tooltip, Modal, Select, Input } from 'antd';
import { Container } from "react-bootstrap";
import { DeleteOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';

import { UserContext } from "../services/UserContext";

const { Option } = Select;

const Cards = (props: { url: any; }) => {
    //@ts-ignore
    const {user} = useContext(UserContext);
    const [cards, setCards] = useState([]);
    const [validUsers, setValidUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [record, setRecord] = useState();
    const [username, setUsername] = useState();

    const showModal = () => {
        setVisible(true);
    };

    const showModalEditing = (item: any, type: string) => {
        setVisible(true);
        if(type === 'editing') {
            setIsEditing(true)
            setRecord(item);
        };
    }; 

    const save = (item: any, username: any) => {
        const date = getDate();

        const data = {
            id: item.id,
            metadatas: { name : item.metadatas.name = username},
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: date
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        fetch(`${props.url}/cards/${item.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                getCards();
            })
            .catch(err => console.log(err));

            setConfirmLoading(true);
            setTimeout(() => {
              setVisible(false);
              setConfirmLoading(false);
              setIsEditing(false);
            }, 2000);
    }
    
    const handleOk = (user: any) => {
        const date = getDate();

        const card = { metadatas : { name: user.name}};

        const data = {
            id: user.id,
            metadatas: { name: card.metadatas.name = user.name },
            status: 'requested',
            createdAt: date,
            updatedAt: null
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`${props.url}/cards`, requestOptions)
        .then(res => res.json())
        .then(data => {
            getCards();
            generateLogs(date, 'card-create', data.status);
        })
        .catch(err => console.log(err));

        setConfirmLoading(true);
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
        }, 2000);
    };
    
    const handleCancel = () => {
        setVisible(false);
    };

    const handleSelectChange = (value: any) => {
        console.log(value);
        setSelectedUser(value);
    }

    const getDate = () => {
        const today = new Date();
        return `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
    }

    // refreshs the component after requests with HTTP methods
    const getCards = () => {
        fetch(`${props.url}/cards`)
          .then(response => response.json())
          .then(data => setCards(data));
    }

    const changeCardStatus = (item: any, type: any) => {
        const date = getDate();

        const data = {
            id: item.id,
            metadatas: { name : item.metadatas.name},
            status: type === 'a' ? 'Approved' : 'Rejected',
            createdAt: item.createdAt,
            updatedAt: date
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        fetch(`${props.url}/cards/${item.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                getCards();
                generateLogs(date, 'card-status-change', data.status);
            })
            .catch(err => console.log(err));
        
    }

    const deleteCard = (item: any) => {
        const date = getDate();

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        
        fetch(`${props.url}/cards/${item.id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            getCards();
            generateLogs(date, 'card-deleted', data.status)
        })
        .catch(err => console.log(err))
    }

    const generateLogs = (date: any, type: string, status: any) => {
        const data = {
            createdAt: date,
            type: type,
            after: status,
            requestedBy: user.id
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`${props.url}/audits`, requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'User Name',
            dataIndex: 'metadatas',
            key: 'name',
            render: (item: { name: any; }) => item === null ? '-' : item.name,
        },
        {
            title: 'Card Limit',
            dataIndex: 'metadatas',
            key: 'limit',
            render: (item: { limit: any; }) => user.roles.includes('n2') ? item.limit : '-',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Last update',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (item: null) => item === null ? '-' : item
        },
        {
            title: 'Actions',
            key: '6',
            render: (record: any) => (
                <>
                    {user.roles.includes('n2') ? 
                        <Space size="middle">
                            <Tooltip title="Approve">
                        <Button type="primary" icon={<CheckOutlined />} onClick={() => changeCardStatus(record, 'a')}></Button>
                        </Tooltip>
                        
                        <Tooltip title="Reject">
                            <Button type="dashed" icon={<CloseOutlined />} onClick={() => changeCardStatus(record, 'r')}></Button>
                        </Tooltip>

                        <Tooltip title="Edit">
                            <Button type="default" icon={<EditOutlined />} onClick={() => showModalEditing(record, 'editing')} ></Button>
                        </Tooltip>

                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined/>} onClick={() => deleteCard(record)} ></Button>
                        </Tooltip>   
                        </Space>
                    :

                    <Space size="middle">
                        <Tooltip title="Approve">
                            <Button  type="primary" icon={<CheckOutlined />} onClick={() => changeCardStatus(record, 'a')}></Button>
                        </Tooltip>
                    
                        <Tooltip title="Reject">
                            <Button  type="dashed" icon={<CloseOutlined />} onClick={() => changeCardStatus(record, 'r')}></Button>
                        </Tooltip>

                        <Tooltip title="Edit">
                            <Button type="default" icon={<EditOutlined />} onClick={() => showModalEditing(record, 'editing')} ></Button>
                        </Tooltip>
                    </Space>
                    
                    }
                </>
            ),
        }
    ]

    useEffect(() => {
        fetch(`${props.url}/cards`)
          .then(function (response) {
            return response.json();
          })
          .then(setCards);
    }, [props.url]);

    useEffect(() => {
        fetch(`${props.url}/users`)
          .then(response => response.json())
          .then(data => {
              setValidUsers(data.filter((u: any) => u.enabledFeatures.includes(0)))
          })
          .catch(err => console.log(err));
    }, [props.url]);


    return (
        <Container>
            <h1>Cards</h1>
            <Table 
                columns={columns} 
                dataSource={cards} 
                pagination={{ pageSize: 5 }}
                size="middle"
                rowKey="id"
            > 
            </Table>
            <Button type="primary" size="large" onClick={showModal}>Create new</Button>

            {isEditing ? 
                <Modal 
                title="Change user name"
                visible={visible}
                onOk={() => save(record, username)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                >

                    <Input value={username} onChange={(e: any) => setUsername(e.target.value)} placeholder="User name" />
                </Modal> : 

                <Modal
                title="Create new card"
                visible={visible}
                onOk={() => handleOk(selectedUser)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                >
                    <h5>Select an user</h5>
                    <Select defaultActiveFirstOption style={{ width: 120 }} onChange={handleSelectChange}>
                        {validUsers && validUsers.map((user: any) => {
                            return (
                                <Option value={user.name}>{user.name}</Option>
                            )
                        })}
                    </Select>
                </Modal>
            }
        </Container>
    );
}

export default Cards;