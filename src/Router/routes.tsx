import { lazy } from 'react'

import Layout from '@/Layout/index'


import { routeInter } from './routeInters'

/*
path: string,
name?: string,
icon?: string | JSX.Element,
redirect?:string   you can use index instead , (the child's path is the same with the father's when using index)
index?: boolean,   when father element has many children .index is the default one
component: FC<any>,
children?: routeInter[]
*/

const routes: routeInter[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/test',
    children: [
      {
        path: 'test',
        component: lazy(() => import('@/view/test/index'))
      }, {
        path: 'user',
        component: lazy(() => import('@/view/user/index'))
      }
    ]
  },
  {
    path: '/login',
    component: lazy(() => import('@/view/Login/index'))
  }, {
    path: '*',
    component: lazy(() => import('@/view/NotFound/index'))
  }
]


const asyncRoutes: routeInter[] = [

]

export default routes