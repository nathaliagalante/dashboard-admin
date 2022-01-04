import React, { useEffect, useState } from "react";
import { Table } from 'antd';

const Audits = (props: { url: any; }) => {
    const [audits, setAudits] = useState([]);

    const columns = [
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'After',
            dataIndex: 'after',
            key: 'after',
        },
        {
            title: 'Requested By',
            dataIndex: 'requestedBy',
            key: 'requestedBy'
        },
    ]

    useEffect(() => {
        fetch(`${props.url}/audits`)
          .then(function (response) {
            return response.json();
          })
          .then(setAudits);
      }, [props.url]);


    return (
        <>
        <div>
            <h1>Audits</h1>
            <Table 
                columns={columns} 
                dataSource={audits} 
                pagination={{ pageSize: 5 }}
                size="middle"
            > 
            </Table>
        </div>
        </>
    );
}

export default Audits;