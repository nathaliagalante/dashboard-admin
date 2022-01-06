import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

const Login = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [islogged, setIsLogged] = useState(false);

    let navigate = useNavigate();

    const handleSubmit = () => {
        let res = props.autenticar(email, password);

        if(res){
            setIsLogged(true);

            if(islogged){
                navigate('/home/home/users');
            }
        }else alert('incorrect email or password');
    }


    return (
        <Container>
            <Form name="normal_login" className="login-form" onFinish={handleSubmit}>
                <Form.Item
                    name="email"
                  rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                     placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
              </Form.Item>
  
              <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                  <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                  />
              </Form.Item>
             
              <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                  </Button>
                      
              </Form.Item>
          </Form>
  
        </Container>
    )

}

export default Login;