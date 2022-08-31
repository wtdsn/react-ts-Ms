import { configureStore } from "@reduxjs/toolkit";

/* 导入 reducer */
import countSliceReducer from "./slices/count";

/* 定义 store */
export const store = configureStore({
  reducer: {
    counter: countSliceReducer
  }
})

/* 从 store 中推出 rootState 类型 ，在获取 state 时可用于类型定义 */
export type RootState = ReturnType<typeof store.getState>

/*  根据 reducer 推断处 dispatch 的类型 */
export type AppDispatch = typeof store.dispatch