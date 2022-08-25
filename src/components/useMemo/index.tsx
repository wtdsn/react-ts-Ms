import { useMemo, useState } from "react";

export default function TestUseMemo() {
  const [personInfo, setInfo] = useState({
    name: "Jack",
    age: 18,
    gender: 1
  })

  function getGender(genderNum: Number): String {
    console.log("计算性别");

    if (genderNum === 1) {
      return "男"
    } else {
      return "女"
    }
  }


  /* 
     useMemo 的参数和 useEffect 一样，一个函数 ，第二个是数组。
     useMemo 会再第一次渲染组件时执行此函数 ，之后仅再数组里的变量变化时才重新调用。
     第一个函数参数的返回值作为 useMemo 调用的返回值。
     
     不使用 useMemo 时 ，是这样子的 gender = getGender(...)
     useMemo 的作用在于 ，我判断这个 gender 需不需要重新去计算！
     再计算量很大时 ，可能并不是每次更新组件时，都需要重新计算！
  
     那与 useEffect 的区别是什么呢？
     
     其实 useEffect 同样可以做到。
     只不过来说 ， useEffect 更偏向与副作用。它代替了类式编程的 mounted ,updated ,unmounted 生命回调。
     使用 useEffect 更多的是比如在项目初始化时 ，做一些基本的操作 ，比如请求接口 ，初始化数据。
     用户做了某些操作时 ，需要更新数据
     组件或页面销毁时 ， 做一些操作，防止内存泄漏！

     把 useMemo 和 useEffect 根据不同目的去使用 ，才能使用代码逻辑更清晰  ，可维护性提高 ，可复用率提高！
     
     这有时候 ，就像不划分组件同样可以写页面一样！
  */
  const gender = useMemo(() => getGender(personInfo.gender), [personInfo.gender])



  return (
    <>
      <div>{`Name = ${personInfo.name}`}</div>
      <div>{`age = ${personInfo.age}`}</div>
      <button onClick={() => setInfo({ ...personInfo, age: personInfo.age + 1 })}>change Age</button>
      <div>{`Name = ${gender}`}</div>
      <button onClick={() => setInfo({ ...personInfo, gender: (personInfo.gender + 1) % 2 })}>change</button>
    </>
  )
}