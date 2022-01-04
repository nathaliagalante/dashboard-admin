import React, { useEffect, useState } from "react";
import { Table } from 'antd';

const Cards = (props: { url: any; }) => {
    const [cards, setCards] = useState([]);

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
    ]

    useEffect(() => {
        fetch(`${props.url}/cards`)
          .then(function (response) {
            return response.json();
          })
          .then(setCards);
      }, [props.url]);


    return (
        <>
        <div>
            <h1>Cards</h1>
            <Table 
                columns={columns} 
                dataSource={cards} 
                pagination={{ pageSize: 5 }}
                size="middle"
            > 
            </Table>
        </div>
        </>
    );
}

export default Cards;