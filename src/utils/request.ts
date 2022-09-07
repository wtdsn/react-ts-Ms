import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosPromise } from "axios";

const instance = axios.create({
  url: '',
  timeout: 5000
})


instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // you can add token here
  // config.headers.token = token

  return config
}, (err) => {
  console.log("请求拦截异常！");
  return Promise.reject(err)
})

export interface responseType<T = any> {
  code: number,
  msg: string,
  data?: T,
}

export type axiosPromise<T = any> = AxiosPromise<T>

instance.interceptors.response.use((res: AxiosResponse<responseType>): responseType | AxiosError => {
  // 全局错误提示
  // if (res.data.code !== 1) {
  //   console.error(res.data.msg)
  // }

  return res.data
}, (err: AxiosError) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log("请求出错");
        break;
      case 401:
        console.log("登录超时");
        // 删除本地缓存的 token
        break;
      case 500:
        console.log("参数错误或服务器出错");
        break;
      default:
        break;
    }
  }
  return Promise.reject(err);
})

export default instance