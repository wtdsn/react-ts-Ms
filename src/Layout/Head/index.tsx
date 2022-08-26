import { FC, createElement } from 'react'
import { Layout } from 'antd'
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
    {createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => props.setCollapsed(!props.collapsed),
    })}
  </Header>)
}

export default Head 