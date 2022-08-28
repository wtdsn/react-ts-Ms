import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom'
import React from 'react';

import './index.less'


interface LFInter {
  toggleForm: (e?: any) => void
}
const LoginForm: React.FC<LFInter> = (props) => {
  const navi = useNavigate()
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let { username } = values
    if (username === 'admin') {
      localStorage.setItem('auth', 'admin')
    } else {
      localStorage.setItem('auth', 'editor')
    }

    navi('/')
  };

  return (
    <Form
      name="login_form"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <div className="login-form-forgot" >
          Forgot password
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <div onClick={props.toggleForm}>register now!</div>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;