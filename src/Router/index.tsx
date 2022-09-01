import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { routeInter } from './routeInters'
import { constRoutes, asyncRoutes } from '@/Router/routes'
import { useEffect, createContext, useState } from "react"

/* 获取用户 auth */
import { useAppSelector, useAppDispatch } from "@/Store/hook"
import { selectUserAuth, getUserInfoBytokenThunk } from "@/Store/slices/user"


import Cookies from 'js-cookie'


/* 路由组件 */
export const Groutes = createContext(constRoutes)

const Router = () => {
  const loaction = useLocation()
  const navi = useNavigate()

  const [routes, setRoutes] = useState<routeInter[]>([])
  const [addRoutes, setAddRoutes] = useState<routeInter[]>([])

  /* 渲染前，判断是否有权限 */
  /* 通过权限更新路由等 */
  const auth = useAppSelector(selectUserAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let _auth = auth

    if (!_auth) {
      _auth = Cookies.get('auth') || ''
      if (_auth) {
        /* redux 中用户的信息被刷新清空了，可以通过 cookie 或 token 重新获取 */
        dispatch(getUserInfoBytokenThunk())
      }
    }

    /* 如果没有权限 */
    if (!_auth) {
      /* 清除路由记录 */
      setRoutes([...constRoutes])
      setAddRoutes([])

      /* 跳转到登录 */
      if (loaction.pathname !== '/login') {
        navi("/login")
      }

    } else {
      if (_auth) {
        /* 有权限 */
        if (loaction.pathname === '/login') {
          navi('/')
        } else if (addRoutes.length === 0) {
          let routes = generateRoutes(_auth)
          setRoutes(routes)
          setAddRoutes(routes)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaction.pathname])

  return (
    <Groutes.Provider value={routes} >
      <Routes>
        {routes.map(mapRoutes)}
      </Routes>
    </Groutes.Provider>
  )
}

/* map 函数回调 ，根据 路由 生成 route 组件 */
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

/* 根据权限动态生成路由表 */
export function generateRoutes(auth: string): routeInter[] {
  if (auth === '') {
    return [...constRoutes]
  }

  function _generateRoutes(routes: routeInter[]): routeInter[] {
    const route: routeInter[] = []
    routes.forEach(v => {
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
