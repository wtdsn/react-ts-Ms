import { useEffect, useRef, useState } from 'react'
let b = 1;
function User() {


  const countObj = useRef({ count: 1 })
  const [a, setA] = useState(1);
  const add = () => {
    let c = a;
    setA(++c);
    console.log(a);

  }
  const add2 = () => {
    countObj.current.count++;
    console.log(countObj.current.count);
  }
  const add3 = () => {
    b++;
    console.log(b);
  }
  useEffect(() => {
    console.log(a, countObj.current.count, b);
  })

  return (
    <>
      <div onClick={add}>
        User Page {a}
      </div>
      <div onClick={add2}>
        User Page {countObj.current.count}
      </div>
      <div onClick={add3}>
        {b}
      </div>
    </>
  )
}

export default User