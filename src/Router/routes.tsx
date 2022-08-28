import { lazy } from 'react'

import Layout from '@/Layout/index'


import { routeInter } from './routeInters'

/*
path: string,
icon?: string | JSX.Element,
redirect?:string   you can use index instead , (the child's path is the same with the father's when using index)
index?: boolean,   when father element has many children .index is the default one
element: FC<any>,
children?: routeInter[],
meta?:[
  title?:string
  auth:['admin','xxx']    who can entry this page
]
*/

const constRoutes: routeInter[] = [
  {
    path: '/',
    element: Layout,
    redirect: '/test',
    meta: {
      hidden: true  // father is hidden ,but son may
    },
    children: [
      {
        path: 'test',
        element: lazy(() => import('@/view/test/index')),
        meta: {
          title: 'test',
        }
      }
    ]
  },
  {
    path: '/users',
    element: Layout,
    meta: {
      title: 'users'
    },
    children: [
      {
        path: 'user',
        meta: {
          title: 'user'
        },
        element: lazy(() => import('@/view/user/index'))
      }
    ]
  },
  {
    path: '/login',
    meta: {
      hidden: true
    },
    element: lazy(() => import('@/view/Login/index'))
  }, {
    path: '*',
    meta: {
      hidden: true
    },
    element: lazy(() => import('@/view/NotFound/index'))
  }
]


const asyncRoutes: routeInter[] = [
  {
    path: '/',
    element: Layout,
    meta: {
      hidden: true,
      auth: ['admin']
    },
    children: [
      {
        path: '/async1',
        meta: {
          title: 'async1',
          auth: ['admin']
        },
        element: lazy(() => import('@/view/AsyncP1/index'))
      }
    ]
  }, {
    path: '/asynList',
    element: Layout,
    meta: {
      title: 'asyncList',
      auth: ['editor', 'admin']
    },
    children: [
      {
        path: 'async2',
        meta: {
          title: 'async2',
          auth: ['admin']
        },
        element: lazy(() => import('@/view/AsyncP2/index'))
      }, {
        path: 'async3',
        meta: {
          title: 'async3',
          auth: ['editor']
        },
        element: lazy(() => import('@/view/AsyncP3/index'))
      }
    ]
  }, {
    path: '*',
    meta: {
      hidden: true
    },
    element: lazy(() => import('@/view/NotFound/index'))
  }
]

export { asyncRoutes, constRoutes }