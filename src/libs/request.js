import axios from 'axios'
import store from '@/store'
import config from '@/config'
import { setToken } from '@/libs/util'
import { LoadingBar, Message } from 'iview'

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? config.apiBaseUrl.dev : config.apiBaseUrl.pro,
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    LoadingBar.start()
    // 在请求头部加入授权token
    if (store.getters.token) {
      config.headers['Token'] = store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.err_code === 100) {
      setToken('')
      LoadingBar.error()
      window.location.href = '/login'
    } else if (res.err_code === 200) {
      LoadingBar.error()
      Message.warning({
        content: '没有操作权限！',
        duration: 3
      })
      return Promise.reject(res)
    } else {
      LoadingBar.finish()
      return res
    }
  },
  error => {
    LoadingBar.error()
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
