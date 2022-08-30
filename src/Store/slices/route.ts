import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { routeInter } from '@/Router/routeInters'

/* 定义 state 类型 */
interface routesState {
  routes: any[],
  addRoutes: any[],
  arr: any[]
}

const initialState: routesState = {
  routes: [],
  addRoutes: [],
  arr: []
}

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setAddRoutes: (state, action: PayloadAction<any>) => {
      /* 对象 / 数组的操作。需要使用数组方法等！ */
    },
    setRoutes: (state, action: PayloadAction<any>) => {
      state.arr.push(action.payload)
      /*     console.log(action.payload);
          console.log(p); */
      /*       state.routes.push(...action.payload) */
      // state.routes = [...p]

      /*       let _state: routesState = {
              routes: p,
              addRoutes: []
            }
            return _state */
      /*    state.routes.push(action.payload) */
      /*   return state.routes */
      /*    state.routes.splice(0, 0, action.payload) */
      /*     console.log("@")
          console.log(state.routes);
    
          console.log(action.payload);
          state.routes.concat(action.payload)
          console.log(state.routes); */

    }
  }
})

/* 导出获取 state 数据的方法 */
export const selectRoutes = (state: RootState) => state.route.routes
export const selectAddRoutes = (state: RootState) => state.route.addRoutes

/* 导出 actions */
export const { setAddRoutes, setRoutes } = routeSlice.actions

/* 导出 reducer */
export default routeSlice.reducer