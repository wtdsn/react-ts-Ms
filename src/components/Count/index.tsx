import { useState, useEffect } from "react"
import './Count.less'

export default function Count() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("Fun Body");

    return () => {
      console.log("return");
    }
  })

  return (
    <div className="count_box">
      <button onClick={() => setCount(count - 1)}>-</button>
      &nbsp; <span>{count}</span>    &nbsp;
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}