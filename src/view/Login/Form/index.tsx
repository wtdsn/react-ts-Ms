import { LockOutlined, UserOutlined, BugOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';

/* 使用 cookie 保存 auth , 因为刷新会导致 redux 数据丢失 */
import Cookies from 'js-cookie'

/* 验证码 */
import VeriCode from '@/components/VeriCode/veriCode';

import { useAppDispatch } from '@/Store/hook';
import { setUserInfo } from '@/Store/slices/user';

// 请求 API
import { login } from '@/Api/user'


import './index.less'


interface LFInter {
  toggleForm: (e?: any) => void
}
const LoginForm: React.FC<LFInter> = (props) => {
  const [loginForm] = Form.useForm();

  const [loading, setLoading] = useState(false)

  /* 登录相关 */
  const navi = useNavigate()
  const dispatch = useAppDispatch()
  /* 提交登录 */
  const onFinish = async (values: any) => {
    setLoading(true)
    let { username, password, veriCode } = values

    const res: any = await login({
      username, password, veriCode, code
    })

    setLoading(false)

    if (res.code === 0) {
      /* 登录失败 */
      /* 这里仅记录验证码错误 */
      setRefresh(Date.now())
      loginForm.setFieldsValue({ veriCode: '' })
      message.error(res.msg)
    } else {
      message.success(res.msg)

      /* if you do not use redux or cookie, you can do like this */
      // localStorage.setItem('auth', 'admin')
      let userInfo = res.data
      /* 将 auth 放入 cookie , 解决 redux 刷新丢失问题  */
      Cookies.set('auth', userInfo.userAuth)

      /* 如果使用 token ,将 token 存入 cookie , 如果仅使用 cookie ,则游览器会自动保存 cookie */
      // Cookies.set('token', userInfo.userAuth)

      /* 使用 redux 存储用户信息，假如用户需要保存的信息有很多，比如头像 ，部门，等等 */
      dispatch(setUserInfo(userInfo))
      navi('/')
    }
  };



  /* 验证码 */
  const [code, setCode] = useState<string>('')
  const [refresh, setRefresh] = useState(Date.now())
  function getCode(code: string) {
    setCode(code)
  }

  /* 记住账号 */
  const [remember, setRem] = useState(false)
  const onRemChange = (e: CheckboxChangeEvent) => {
    setRem(e.target.checked)
  }

  return (
    <Form
      name="loginForm"
      form={loginForm}
      className="login_form"
      initialValues={{ remember }}
      onFinish={onFinish}
    >
      {/* 用户名 */}
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" autoComplete={remember ? 'on' : 'off'} />
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
            autoComplete="off"
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
          <Checkbox onChange={onRemChange}>Remember me</Checkbox>
        </Form.Item>

        <div className="login-form-forgot" >
          Forgot password
        </div>
      </Form.Item>

      {/* 登录 */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Log in
        </Button>
        <div className='like_a' onClick={props.toggleForm}>register now</div>
      </Form.Item>
    </Form >
  );
};



export default LoginForm;