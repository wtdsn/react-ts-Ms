import { useAppSelector, useAppDispatch } from '@/Store/hook'
import { decrement, increment, selectorCount } from '@/Store/slices/count'

function Test() {
  const count = useAppSelector(selectorCount)
  const dispatch = useAppDispatch()

  return (<div>Test Page
    :{count}
    <div></div>
    <button onClick={() => dispatch(increment())}>+</button>
    <button onClick={() => dispatch(decrement())}>-</button>
  </div>)
}

export default Test