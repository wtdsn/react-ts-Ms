import { useAppSelector, useAppDispatch } from '@/Store/hook'
import { decrement, increment, selectorCount, asyncAdd } from '@/Store/slices/count'

function Test() {
  const count = useAppSelector(selectorCount)
  const dispatch = useAppDispatch()


  async function dis() {
    /* 对于异步的 thunk , dispatch 后返回一个封装后的 promise , 通过调用 unwrap 可以获取 thunk 内异步函数的返回值
      并且可以通过 try catch 拦截错误！
    */
    let disr = await dispatch(asyncAdd(10)).unwrap()
    console.log("@@@,", disr);
  }

  return (<div style={{ height: '200%' }}>Test Page
    :{count}
    <div></div>
    <button onClick={() => dispatch(increment())}>+</button>
    <button onClick={() => dispatch(decrement())}>-</button>
    <button onClick={() => dis()}>+async</button>
  </div>)
}

export default Test