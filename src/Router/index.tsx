import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { routeInter } from './routeInters'
import { constRoutes, asyncRoutes } from '@/Router/routes'
import { useEffect, useState } from "react"

const Router = () => {
  const loaction = useLocation()
  const navi = useNavigate()
  const [routes, setRoutes] = useState<routeInter[]>(constRoutes)
  const [addRoutes, setAddRoutes] = useState<routeInter[]>([])

  /* 渲染前，判断是否有权限 */
  /* 通过权限更新路由等 */
  useEffect(() => {
    let auth = localStorage.getItem('auth')

    /* 如果没有权限 */
    if (!auth && loaction.pathname !== '/login') {
      setRoutes(constRoutes)
      setAddRoutes([])
      localStorage.removeItem('routes')
      navi("/login")
    } else {
      if (auth) {
        /* 有权限 */
        if (loaction.pathname === '/login') {
          navi('/')
        } else if (addRoutes.length === 0) {
          let routes = generateRoutes(auth)
          localStorage.setItem('routes', JSON.stringify(routes))
          setRoutes(routes)
          setAddRoutes(routes)
        }
      }
    }
  }, [loaction, addRoutes, navi])

  return (
    <Routes>
      {routes.map(mapRoutes)}
    </Routes>
  )
}

function mapRoutes(route: routeInter, i: number): JSX.Element {
  /* when having children */
  if (route.children && route.children.length > 0) {
    let props: any = {}
    if (route.redirect) {
      props.redirect = route.redirect
      props.basePath = route.path
    }
    return (<Route key={route.path} path={route.path} element={<route.element {...props} />}>
      {route.children.map(mapRoutes)}
    </ Route >)
  }

  if (route.index) {
    /* index and path can not be used at the same time */
    return (<Route key={i} index element={<route.element />}></ Route >)
  }
  return (<Route key={route.path} path={route.path} element={<route.element />}></ Route >)
}

function generateRoutes(auth: string): routeInter[] {
  function _generateRoutes(routes: routeInter[]): routeInter[] {
    const route: routeInter[] = []
    routes.forEach(v => {
      console.log("v", v)
      if (!v.meta || !v.meta.auth || v.meta.auth.includes(auth)) {
        let r = { ...v }
        if (v.children && v.children.length > 0) {
          r.children = _generateRoutes(v.children)
        }
        route.push(r)
      }
    })
    return route
  }

  return [...constRoutes, ..._generateRoutes(asyncRoutes)]
}





export default Router
