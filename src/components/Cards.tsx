import React, { useEffect, useState } from "react";
import { Button, Space, Table } from 'antd';
import { Container } from "react-bootstrap";

const Cards = (props: { url: any; }) => {
    const [cards, setCards] = useState([]);
    // const [disabled, setDisabled] = useState(false);

    // const getCards = () => {
    //     fetch(`${props.url}/cards`)
    //       .then(response => response.json())
    //       .then(data => setCards(data));
    // }

    const changeCardStatus = (id: any, type: any) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: type === 'a' ? 'Approved' : 'Rejected' })
        };
        fetch(`${props.url}/cards/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // getCards();
                // setDisabled(true);
            })
            .catch(error => console.log(error));
        
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User Name',
            dataIndex: 'metadatas',
            key: 'name',
            render: (item: { name: any; }) => item.name,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
                <Space size="middle">
                    <Button  type="primary" onClick={() => changeCardStatus(record.id, 'a')}>
                    Approve
                    </Button>
                    <Button  danger onClick={() => changeCardStatus(record.id, 'r')}>
                    Reject
                    </Button>
                </Space>
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
        </Container>
    );
}

export default Cards;