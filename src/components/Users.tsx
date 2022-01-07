import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import { Container } from "react-bootstrap";

const Users = (props: any) => {
    const [users, setUsers] = useState([]);
   

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Document',
            dataIndex: 'document',
            key: 'document',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Salary Base',
            dataIndex: 'salaryBase',
            key: 'salaryBase',
            render: (item: any) => props.user?.roles.includes('n2') ? item : '-'
        },
    ]

    useEffect(() => {
        fetch(`${props.url}/users`)
          .then(function (response) {
            return response.json();
          })
          .then(setUsers);
      }, [props.url]);


    return (
        <Container>
            <h1>Users</h1>
            <Table 
                columns={columns} 
                dataSource={users} 
                pagination={{ pageSize: 5 }}
                size="middle"
            > 
            </Table>
        </Container>
    );
}

export default Users;