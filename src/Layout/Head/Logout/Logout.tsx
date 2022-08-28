import React, { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './logout.less'
import avatar from '@/assets/img/head/avatar.jpg'


const Logout: FC = () => {
  /* 是否 dropdwom */
  const [dropDown, setDrop] = useState(false)

  const toggleDrop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setDrop(!dropDown)
    return false
  }
  /* 点击外界 */
  const handleClickOuter = useCallback(() => {
    setDrop(false)
  }, [])
  /* 事件监听器的添加和移除 ，监听点击外界 */
  useEffect(() => {
    if (dropDown) {
      document.body.addEventListener('click', handleClickOuter)
    } else {
      document.body.removeEventListener('click', handleClickOuter)
    }
    return () => {
      document.body.removeEventListener('click', handleClickOuter)
    }
  }, [dropDown, handleClickOuter])
  /* 阻止冒泡 */
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    return false
  }

  /* 登出 */
  const navi = useNavigate()
  const logOut = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('routes')
    navi('/login')
  }

  return (
    <div onClick={stopPropagation} className={`logout_box ${dropDown ? 'logout' : ''}`} >
      <img onClick={toggleDrop} src={avatar} className="avatar" alt='avatar' />
      <div className='drop_box' >
        <div className="user_name">XXX</div>
        <div className='user_identty'>Admin</div>
        <div className="logout_btn" onClick={logOut}>登出</div>
      </div>
    </div >
  )
}

export default Logout