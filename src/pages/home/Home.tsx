import React, { useContext, } from "react";
import { Link, Route, Routes } from 'react-router-dom';

import Users from "../../components/Users";
import Cards from "../../components/Cards";
import Audits from "../../components/Audits";

import { Button, Layout, Menu } from 'antd';
import { TeamOutlined } from '@ant-design/icons';


import { UserContext } from "../../services/UserContext";

import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const Home = (props: any) => {
    //@ts-ignore
    const {user, setUser} = useContext(UserContext);

    let navigate = useNavigate();
    
    const logout = () => {
        setUser(null);
        navigate('/');
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="2">{user.email}</Menu.Item>
                    <Menu.Item key="3">
                        <Button type="text" style={{color: "white"}} onClick={logout}>Logout</Button>
                    </Menu.Item>
                </Menu>
            </Header>

            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1" icon={<TeamOutlined />}>
                            <Link to="home/users">Users</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="home/cards">Cards</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="home/audits">Audits</Link>
                        </Menu.Item>
                        
                    </Menu>
                </Sider>

                <Layout style={{ padding: '24px' }}>
                    <Content style={{
                        padding: 24,
                        margin: '29px 16px',
                        minHeight: 280,
                        background: 'white'
                        }}
                    >
                        <Routes>
                            <Route path="home/users" element={<Users url={props.url} />}></Route>
                            <Route path="home/cards" element={<Cards url={props.url} />}></Route>
                            <Route path="home/audits" element={<Audits url={props.url} />}></Route>
                        </Routes>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Home;