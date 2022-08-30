
import { FC, useState, useEffect } from "react"
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import join from '@/utils/join'

import './index.less'
import { routeInter } from "@/Router/routeInters";

import { useAppSelector } from '@/Store/hook'
import { selectRoutes } from '@/Store/slices/route'

/* interface */
interface SideInter {
  collapsed: boolean
}
interface menuItemInter {
  key: string,
  label: string,
  icon?: JSX.Element,
  children?: menuItemInter[]
}

const SideBar: FC<SideInter> = (prop) => {

  /* 校准当前 active 的项 */
  const location = useLocation()
  const [curPath, setCurPath] = useState<string>(location.pathname)
  useEffect(() => {
    if (curPath !== location.pathname) {
      setCurPath(location.pathname)
    }
  }, [curPath, location])

  /* 点击 menu */
  const navi = useNavigate()
  function clickCb(arg: any) {
    navi(arg.key)
  }

  /* 处理 menu Items */
  const routes = useAppSelector(selectRoutes)
  const [menuItems, setMenuItems] = useState<menuItemInter[]>([])
  useEffect(() => {
    setMenuItems(generateMenu(routes, ''))
  }, [routes, curPath])

  return (<Layout.Sider trigger={null} collapsible collapsed={prop.collapsed}>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[curPath]}
      onClick={clickCb}
      items={menuItems}
    />
  </Layout.Sider>)
}

function generateMenu(routes: routeInter[], fatherPath = ''): menuItemInter[] {
  const menuItems: menuItemInter[] = []

  routes.forEach((v) => {
    /* 如果隐藏 */
    if (v?.meta && v.meta?.hidden) {
      /* 如果有孩子，仅取第一个，没有孩子则是非 menu 的页面 */
      if (v.children) {
        menuItems.push({
          key: join(fatherPath, v.path, v.children[0].path),
          label: v.children[0].meta.title
        })
      }
    } else {
      /* 非隐藏 有孩子 */
      if (v.children && v.children.length > 0) {
        menuItems.push({
          key: join(fatherPath, v.path),
          label: v.meta.title,
          children: generateMenu(v.children, join(fatherPath, v.path))
        })
      } else {
        /* 非隐藏无孩子 */
        menuItems.push({
          key: join(fatherPath, v.path),
          label: v.meta.title
        })
      }
    }
  })
  return menuItems
}

export default SideBar