import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

/* state 的接口类型定义 */
interface countInter {
  value: number
}

/* 定义初始的 count 的 state  */
const initialState: countInter = {
  value: 0
}

/* 创建 */
export const countSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /* 具体定义 reducer 函数 ，此函数改变 state */
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    /* reducer 第一个参数接收 state , 第二个参数接收 action ,action 是 slice 根据 reducert 创建的
        导出的 action 可以通过 dispatch 去出发，然后执行响应的 reducer 函数。并且同时可以传递参数
    */
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

/* 导出 reducer 对应的 acrions */
export const { increment, decrement, incrementByAmount } = countSlice.actions

/* 导出 selector 用于获取 state 中的值 */
export const selectorCount = (state: RootState) => state.counter.value

/* 导出 reducer , 用于在 store 中配置 */
export default countSlice.reducer