import { Route, Routes } from "react-router-dom"
import { routeInter } from './routeInters'
import routes from '@/Router/routes'

const Router = () => {
  /* 渲染前，判断是否有权限 */
  /* 通过权限更新路由等 */
  return (
    <Routes>
      {routes.map(MapCallBack)}
    </Routes>
  )
}

function MapCallBack(route: routeInter, i: number): JSX.Element {

  /* when having children */
  if (route.children && route.children.length > 0) {
    let props: any = {}
    if (route.redirect) {
      props.redirect = route.redirect
      props.basePath = route.path
    }
    return (<Route key={route.path} path={route.path} element={<route.component {...props} />}>
      {route.children.map(MapCallBack)}
    </ Route >)
  }

  if (route.index) {
    /* index and path can not be used at the same time */
    return (<Route key={i} index element={<route.component />}></ Route >)
  }
  return (<Route key={route.path} path={route.path} element={<route.component />}></ Route >)
}

export default Router
