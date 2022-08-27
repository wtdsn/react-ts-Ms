import { useState } from "react"

function Test() {
  const [count, setCount] = useState(0)
  return (<div onClick={() => setCount(count + 1)}>Test Page
    {count}
  </div>)
}

export default Test