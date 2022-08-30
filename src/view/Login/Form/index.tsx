import { LockOutlined, UserOutlined, BugOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';

import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';

import { generateRoutes } from '@/Router/index'
import VeriCode from '@/components/VeriCode/veriCode';

import './index.less'


interface LFInter {
  toggleForm: (e?: any) => void
}
const LoginForm: React.FC<LFInter> = (props) => {
  const [loginForm] = Form.useForm();

  /* 完成登录 */
  const navi = useNavigate()
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let { username, veriCode } = values

    if (veriCode.toLowerCase() !== code.toLowerCase()) {
      setRefresh(Date.now())
      message.error("验证码错误！")
      loginForm.setFieldsValue({ veriCode: '' })
      return
    }
    message.success("登录成功！")
    if (username === 'admin') {
      localStorage.setItem('auth', 'admin')
      localStorage.setItem('routes', JSON.stringify(generateRoutes('admin')))
    } else {
      localStorage.setItem('auth', 'editor')
      localStorage.setItem('routes', JSON.stringify(generateRoutes('editor')))
    }


    navi('/')
  };


  /* 验证码 */
  const [code, setCode] = useState<string>('')
  const [refresh, setRefresh] = useState(Date.now())
  function getCode(code: string) {
    setCode(code)
  }

  return (
    <Form
      name="loginForm"
      form={loginForm}
      className="login_form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {/* 用户名 */}
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      {/* 密码 */}
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* 验证码 */}
      <div className="veri_code_part">
        <Form.Item
          name="veriCode"
          rules={[{ required: true, message: 'Please input veriCode!' }, {
            len: 4, message: 'length must be 4 !'
          }]}
        >
          <Input
            className='veri_input'
            prefix={<BugOutlined />}
            type="text"
            placeholder="veriCode"
          />
        </Form.Item>
        {/* 验证码 canvas */}
        <div className="veri_code_box">
          <VeriCode getCode={getCode} width={80} height={32} refresh={refresh} />
        </div>
      </div>
      {/* 记住密码 */}
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <div className="login-form-forgot" >
          Forgot password
        </div>
      </Form.Item>

      {/* 登录 */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <div className='like_a' onClick={props.toggleForm}>register now</div>
      </Form.Item>
    </Form >
  );
};



export default LoginForm;