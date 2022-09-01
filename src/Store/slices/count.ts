import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";

/* state 的接口类型定义 */
interface countInter {
  value: number
}

/* 定义初始的 count 的 state  */
const initialState: countInter = {
  value: 0
}

/* 创建 thunk 并导出 */
/* thunk 有4种状态 
请求尚未开始
请求正在进行中
请求成功，我们现在有了我们需要的数据
请求失败，可能有错误信息

在 reducer 中 ，在被触发（dispatch）后 ，会有 3种情况
即进行中 ， 成功 和 失败
在 addCase 就是分别以
asyncAdd.pending
async.fulfilled
async.rejected  
三种 reducer 。 

如果 dispatch 报错。可尝试降低 redux 版本到 7 
*/
export const asyncAdd = createAsyncThunk(
  "count/asyncAdd",
  async (amount: number) => {
    console.log("amount", amount);

    const res = await (new Promise((resolve) => {
      setTimeout(() => {
        resolve(amount)
      }, 1000)
    }))

    return {
      code: 1,
      data: res
    }
  }
)

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
  },
  /* 添加  extraReducers 处理异步的 action */
  /* 通过 addCase 触发不同的 reducer . 相当于 switch case */
  extraReducers(builder) {
    builder.addCase(asyncAdd.pending, (state, action) => {
      console.log("执行中");

    }).addCase(asyncAdd.fulfilled, (state, action) => {
      console.log("执行成功！");

      console.log(action);
    })
  }
})



/* 导出 reducer 对应的 acrions */
export const { increment, decrement, incrementByAmount } = countSlice.actions

/* 导出 selector 用于获取 state 中的值 */
export const selectorCount = (state: RootState) => state.counter.value

/* 导出 reducer , 用于在 store 中配置 */
export default countSlice.reducer