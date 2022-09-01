import React, { FC, useCallback, useEffect, useState } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router'

import './logout.less'
import avatar from '@/assets/img/head/avatar.jpg'

/* userState */
import { useAppDispatch, useAppSelector } from '@/Store/hook'
import { selectUserInfo, clearUserInfo } from '@/Store/slices/user'

import Cookies from 'js-cookie'

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

  /* userInfo */
  const userInfo = useAppSelector(selectUserInfo)

  /* 登出 */
  const dispatch = useAppDispatch()
  const navi = useNavigate()
  const logOut = () => {
    dispatch(clearUserInfo())
    Cookies.remove("auth")

    /* remove token if has */
    Cookies.remove("token")

    message.success("登出成功！")
    navi('/login')
  }

  return (
    <div onClick={stopPropagation} className={`logout_box ${dropDown ? 'logout' : ''}`} >
      <img onClick={toggleDrop} src={avatar} className="avatar" alt='avatar' />
      <div className='drop_box' >
        <div className="user_name">{userInfo.userName || 'loading'}</div>
        <div className='user_identty'>{userInfo.userAuth || 'loading'}</div>
        <div className="logout_btn" onClick={logOut}>登出</div>
      </div>
    </div >
  )
}

export default Logout