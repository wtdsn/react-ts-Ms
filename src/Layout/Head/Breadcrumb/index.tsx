import { routeInter } from '@/Router/routeInters';
import { Breadcrumb as AntBread } from 'antd'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import './index.less'

interface breakInter {
  name: string,
  href?: string,
  path?: string
}

function Breadcrumb() {

  const location = useLocation()
  const [routesStr, setRoutesStr] = useState("")
  const [routeMap, setRoutesMap] = useState<Map<string, string>>()
  const [breakList, setBreakList] = useState<breakInter[]>([])

  /* 路由变化时，检测路由表是否变化 */
  useEffect(() => {
    let str = localStorage.getItem('routes')
    if (str && str !== routesStr) {
      setRoutesStr(str)

      /* 如果路由表变化了，更新 route 的 Map 映射 path-> title（name） 的映射 */
      let m = getRoutesMap(str)
      setRoutesMap(m)
      setBreakList(getBreakList(m, location.pathname))
    } else {
      /* 根据映射 和 当前路由生成 面包屑 */
      setBreakList(getBreakList(routeMap, location.pathname))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (<AntBread separator=">">
    {breakList.map((v, i) => {
      if (v.path) {
        return <AntBread.Item key={v.path}>{v.name}</AntBread.Item>
      } else if (v.href) {
        return <AntBread.Item key={v.href} href={v.href}>{v.name}</AntBread.Item>
      } else {
        return <AntBread.Item key={i} >{v.name}</AntBread.Item>
      }
    })}
  </AntBread >)
}

/* 获取面包屑 */
function getBreakList(routesMap: any, path: string): breakInter[] {
  let paths = path.split('/'), breakList: breakInter[] = []

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
function getRoutesMap(routesString: string) {
  let routesMap = new Map(), routes = JSON.parse(routesString)
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