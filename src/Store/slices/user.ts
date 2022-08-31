import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

/* 定义 state 接口 */
interface userIn {
  userName: string,
  userId: string,
  userAuth: string
}

/* 初始的 state */
const initialState: userIn = {
  userName: '',
  userId: '',
  userAuth: ''
}

/* 创建 slice */
export const userSlice = createSlice({
  /* 为 slice 命名 */
  name: 'user',
  /* 初始 state */
  initialState,
  /* 定义 reducers ,toolkit 会根据 reducer 创建相关的 actions  */
  reducers: {
    setUserInfo: (state, action: PayloadAction<userIn>) => {
      let { userName, userId, userAuth } = action.payload
      if (userName)
        state.userName = userName
      if (userId)
        state.userId = userId
      if (userAuth)
        state.userAuth = userAuth
      return state
    },
    clearUserInfo: (state) => {
      state = {
        userName: '',
        userId: '',
        userAuth: ''
      }
      return state
    }
  }
})

/* 导出 action , 通过 dispatch action 可以执行对应的 reducer */
export const { setUserInfo, clearUserInfo } = userSlice.actions

/* 导出 selector 用于抽离获取 staet 的方法，避免重复的代码 */
export const selectUserInfo = (state: RootState) => state.user
export const selectUserName = (state: RootState) => state.user.userName
export const selectUserId = (state: RootState) => state.user.userId
export const selectUserAuth = (state: RootState) => state.user.userAuth

/* 导出 reducer , 用于在 store 中配置 */
export default userSlice.reducer