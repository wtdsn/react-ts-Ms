import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../index'

/* 
   请求 API
*/
import { login, getUserInfoBytoken } from '@/Api/user'


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


/* 创建异步 thunk */
export const loginThunk = createAsyncThunk(
  "user/login",
  async (params: any) => {
    const res = await login(params)
    return res
  }
)


/* set userInfo 参数的接口 针对有部分信息可以不存在 */
interface setUserIn {
  userName?: string,
  userId?: string,
  userAuth?: string
}

/* 设置 userInfo 的逻辑抽离 */
function _setUserInfo<T extends userIn>(state: T, userInfo: setUserIn): T {
  let { userName, userId, userAuth } = userInfo
  if (userName)
    state.userName = userName
  if (userId)
    state.userId = userId
  if (userAuth)
    state.userAuth = userAuth
  return state
}

/* 创建获取用户信息的 thunk */
export const getUserInfoBytokenThunk = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const res = await getUserInfoBytoken()
    console.log("GETRES", res);

    return res
  }
)




/* 创建 slice */
export const userSlice = createSlice({
  /* 为 slice 命名 */
  name: 'user',
  /* 初始 state */
  initialState,
  /* 定义 reducers ,toolkit 会根据 reducer 创建相关的 actions  */
  reducers: {
    setUserInfo: (state, action: PayloadAction<userIn>) => {
      return _setUserInfo<typeof state>(state, action.payload)
    },
    clearUserInfo: (state) => {
      state = {
        userName: '',
        userId: '',
        userAuth: ''
      }
      return state
    }
  },
  /* 添加  extraReducers 处理异步的 action */
  extraReducers(builder) {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        let res: any = action.payload
        if (res.code === 1) {
          const { userName, userId, userAuth } = res.data
          _setUserInfo<typeof state>(state, { userName, userId, userAuth })
        }
      })
      .addCase(getUserInfoBytokenThunk.fulfilled, (state, action) => {
        let res: any = action.payload
        if (res.code === 1) {
          _setUserInfo<typeof state>(state, res.data as userIn)
        }
      })
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