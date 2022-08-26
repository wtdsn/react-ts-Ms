
import { FC } from "react"
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import './index.less'


interface SideInter {
  collapsed: boolean
}

const { Sider } = Layout
const routes = [{
  key: '/test',
  path: '/test',
  icon: <UploadOutlined />,
  label: 'test',
}, {
  key: '2',
  icon: <UserOutlined />,
  label: 'users',
  children: [
    {
      key: '/user',
      path: '/user',
      icon: <VideoCameraOutlined />,
      label: 'user',
    },
  ]
}]
const SideBar: FC<SideInter> = (prop) => {
  const navi = useNavigate()
  function clickCb(arg: any) {
    console.log(arg);
    navi(arg.key)
  }
  return (<Sider trigger={null} collapsible collapsed={prop.collapsed}>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      onClick={clickCb}
      items={routes}
    />
  </Sider>)
}

export default SideBar