import { FC, createElement } from 'react'
import { Layout } from 'antd'
import Logout from './Logout/Logout'
import Breadcrumb from './Breadcrumb/index'
import FullScreen from '@/components/FullScreen'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

import './index.less'

const { Header } = Layout

interface HeadInter {
  collapsed: boolean
  setCollapsed: Function
}
const Head: FC<HeadInter> = (props) => {
  return (<Header className='head'>
    <div className='left_tools'>
      {/* 折叠 */}
      {createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => props.setCollapsed(!props.collapsed),
      })}
      {/* 面包屑 */}
      <Breadcrumb />
    </div>

    <div className='right_tools'>
      <FullScreen />
      <Logout />
    </div>
  </Header>)
}

export default Head 