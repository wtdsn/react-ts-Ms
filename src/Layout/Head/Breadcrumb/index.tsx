import { routeInter } from '@/Router/routeInters';
import { Breadcrumb as AntBread } from 'antd'
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './item.less'

import { Groutes } from '@/Router/index'

interface breakInter {
  name: string,
  href?: string,
  path?: string
}

function Breadcrumb() {

  /* location 监听 导航栏路径的变化 */
  const location = useLocation()
  /* routeMap 记录 path 和 title 的映射 ，快速查找对应的标题 */
  const [routeMap, setRoutesMap] = useState<Map<string, string>>()

  /* 面包屑数据 */
  const [breakList, setBreakList] = useState<breakInter[]>([])

  /* 面包屑动画相关操控变量 */
  const [isMoveIn, setMoveDir] = useState(true)
  const [moveRange, setMoveRange] = useState(-1)

  /* 路由变化时，检测路由表是否变化 */
  const routes = useContext(Groutes)

  useEffect(() => {
    setRoutesMap(getRoutesMap(routes))
  }, [routes])

  useEffect(() => {
    let newList = getBreakList(routeMap, location.pathname)

    /* 获取并设置动画的下标范围 */
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].name !== breakList[i].name) {
        setMoveRange(i - 1)
        break
      }
    }

    /* 面包屑动画 */
    setMoveDir(false)
    let timer = setTimeout(() => {
      setMoveDir(true)
      /* 根据映射 和 当前路由生成 面包屑 */
      setBreakList(newList)
    }, 200)

    /* 清除 定时器 ，防止内存泄漏 */
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, routeMap])


  /* 点击面包屑跳转 */
  const navi = useNavigate()
  function naviTo(index: number) {
    let path = ''
    breakList.some((v, i) => {
      if (i > index) return true
      path += v.path
      return false
    })
    if (path !== location.pathname) {
      navi(path)
    }
  }

  /* 动画 class 设置  */
  const getClass = (i: number): string => {
    if (moveRange < i) {
      return `item ${isMoveIn ? 'move_in' : 'move_out'}`
    }
    return 'item'
  }

  return (<AntBread className='bread_crumb' separator="">
    {breakList.map((v, i) => {
      let returnEl
      if (v.path) {
        returnEl = <AntBread.Item onClick={() => naviTo(i)} className={getClass(i)} key={v.path}>{v.name}</AntBread.Item>
      } else if (v.href) {
        returnEl = <AntBread.Item onClick={() => naviTo(i)} className={getClass(i)} key={v.href} href={v.href}>{v.name}</AntBread.Item>
      } else {
        returnEl = <AntBread.Item onClick={() => naviTo(i)} className={getClass(i)} key={i} >{v.name}</AntBread.Item>
      }
      if (i !== breakList.length - 1) {
        return [returnEl, < AntBread.Separator children={<span className={getClass(i)}>{'>'}</span>} />]
      }
      return returnEl
    })}
  </AntBread >)
}

/* 获取面包屑 */
function getBreakList(routesMap: any, path: string): breakInter[] {
  let paths = path.split('/'), breakList: breakInter[] = []
  if (!routesMap) return []

  paths.forEach(v => {
    if (routesMap.has('/' + v)) {
      breakList.push({
        path: '/' + v,
        name: routesMap.get('/' + v)
      })
    } else if (routesMap.has(v)) {
      breakList.push({
        path: '/' + v,
        name: routesMap.get(v)
      })
    }
  })

  return breakList
}

/* 获取 路由 Map  */
/* 对于仅有 params 参数的路由不好处理 */
function getRoutesMap(routes: routeInter[]) {
  let routesMap = new Map()
  function _setMap(route: routeInter) {
    if (route?.meta?.title) {
      routesMap.set(route.path, route.meta.title)
    }
    if (route.children) {
      route.children.forEach(_setMap)
    }
  }

  routes.forEach(_setMap)
  return routesMap
}



export default Breadcrumb