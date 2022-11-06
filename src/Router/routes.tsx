import { lazy } from 'react'
import { PieChartFilled, HddFilled, HighlightFilled, ProfileFilled, PayCircleFilled, SkinFilled, TagsFilled, WalletFilled } from '@ant-design/icons'

import Layout from '@/Layout/index'


import { routeInter } from './routeInters'

/*
path: string,
icon?:  JSX.Element,
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
        icon: <HighlightFilled />,
        element: lazy(() => import('@/view/test/index')),
        meta: {
          title: 'test',
        }
      }
    ]
  }, {
    path: '/echarts',
    element: Layout,
    icon: <PieChartFilled />,
    meta: {
      title: 'echarts'
    },
    redirect: '/echarts/normal',
    children: [
      {
        path: 'normal',
        icon: <PieChartFilled />,
        meta: {
          title: 'normal'
        },
        element: lazy(() => import('@/view/Echarts/index'))
      }, {
        path: 'chinaChart',
        icon: <PieChartFilled />,
        meta: {
          title: 'chinaEchart'
        },
        element: lazy(() => import('@/view/Echarts/ChinaChart/index'))
      },
      {
        path: 'radar',
        icon: <PieChartFilled />,
        meta: {
          title: 'radarEchart'
        },
        element: lazy(() => import('@/view/Echarts/Radar/index'))
      }
    ]
  },
  {
    path: '/antd',
    element: Layout,
    redirect: '/antd/from',
    icon: <HddFilled />,
    meta: {
      title: 'antd'
    },
    children: [
      {
        path: 'from',
        icon: <ProfileFilled />,
        meta: {
          title: 'from'
        },
        element: lazy(() => import('@/view/Antd/index'))
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
        icon: <PayCircleFilled />,
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
    redirect: '/asynList/async2',
    icon: <SkinFilled />,
    meta: {
      title: 'asyncList',
      auth: ['editor', 'admin']
    },
    children: [
      {
        path: 'async2',
        icon: <TagsFilled />,
        meta: {
          title: 'async2',
          auth: ['admin']
        },
        element: lazy(() => import('@/view/AsyncP2/index'))
      }, {
        path: 'async3',
        icon: <WalletFilled />,
        meta: {
          title: 'async3',
          auth: ['editor', 'admin']
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