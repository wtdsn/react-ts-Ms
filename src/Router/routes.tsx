import User from '@/view/user/index'
import Test from '@/view/test/index'
import Layout from '@/Layout/index'
import Login from '@/view/Login/index'
import NotFound from '@/view/NotFound'

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
        component: Test
      }, {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: NotFound
  }
]


export default routes