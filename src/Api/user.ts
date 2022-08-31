import Cookies from "js-cookie"

/* 模拟请求 */

export function login(params: any) {
  const { username, veriCode, code } = params

  let res = {
    code: 1,
    msg: '',
    data: {}
  }
  if (veriCode.toLowerCase() !== code.toLowerCase()) {
    res.code = 0
    res.msg = "验证码错误"
  } else {
    if (username === 'admin') {
      res.code = 1
      res.msg = "登录成功！"
      res.data = {
        userName: "WTDSN",
        userId: '1111',
        userAuth: "admin",
        /* token 密匙可以放 userId , 因为 userId 基本不变 */
        token: "1111"
      }
    } else if (username === 'editor') {
      res.code = 1
      res.msg = "登录成功！"
      res.data = {
        userName: "WTDSN2",
        userId: '2222',
        userAuth: "editor",
        token: "2222"
      }
    } else {
      res.code = 1
      res.msg = "登录成功！"
      res.data = {
        userName: "WTDSN3",
        userId: '3333',
        userAuth: "normal",
        token: "3333"
      }
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res)
    }, 1000)
  })
}

export function getUserInfoBytoken() {
  /* 使用全局请求拦截带上 token , 通过 token 获取信息 */
  let token = Cookies.get("token")
  let res = {
    code: 1,
    msg: '',
    data: {}
  }
  if (token === '1111') {
    res.code = 1
    res.msg = "获取成功！"
    res.data = {
      userName: "WTDSN",
      userId: '1111',
      userAuth: "admin",
    }
  } else if (token === '2222') {
    res.code = 1
    res.msg = "获取成功！"
    res.data = {
      userName: "WTDSN2",
      userId: '2222',
      userAuth: "editor"
    }
  } else {
    res.code = 1
    res.msg = "获取成功！"
    res.data = {
      userName: "WTDSN3",
      userId: '3333',
      userAuth: "normal"
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res)
    }, 1000)
  })
}