import SideBar from './SideBar'
import Head from './Head'
import Suspense from '@/components/Suspense'

import { useEffect, useState } from 'react'
import { useNavigate, useMatch, Outlet } from 'react-router-dom'
import { FC } from 'react'
import { Layout as AntdLayout } from 'antd';
import './index.less'

interface LayoutInter {
  redirect: string
  basePath: string
}

const { Content } = AntdLayout;

const Layout: FC<LayoutInter> = (props) => {
  const { redirect, basePath = '' }: { redirect: string, basePath: string } = props

  /* useNavigaet 将返回一个函数，用于跳转 */
  const nav = useNavigate()
  /* useMatch 传入通过 pattern 于当前路径匹配。如果匹配成功返回 true */
  const match = useMatch(basePath)

  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (redirect && match) {
      nav(redirect)
    }
  })

  return (
    <AntdLayout className='layout_con'>
      <SideBar collapsed={collapsed} />
      <AntdLayout>
        <Head collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className='layout_main'>
          <Suspense>
            <Outlet />
          </Suspense>
        </Content>
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout