import { useEffect } from 'react'
import { useNavigate, useMatch, Outlet } from 'react-router-dom'
import { FC } from 'react'

interface LayoutInter {
  redirect: string
  basePath: string
}

const Layout: FC<LayoutInter> = (props) => {
  const { redirect, basePath = '' }: { redirect: string, basePath: string } = props

  /* useNavigaet 将返回一个函数，用于跳转 */
  const nav = useNavigate()
  /* useMatch 传入通过 pattern 于当前路径匹配。如果匹配成功返回 true */
  const match = useMatch(basePath)
  useEffect(() => {
    if (redirect && match) {
      nav(redirect)
    }
  })
  return (
    <div>
      <div>Layout</div>
      <Outlet />
    </div>
  )
}

export default Layout