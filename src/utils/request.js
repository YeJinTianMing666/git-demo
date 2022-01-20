// 创建一个新的axio实例
//
// 请求拦截器
// 响应拦截器
// 导出一个函数 ， 调用当前 axiso 实例 发请求

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址， 其他地方不是通过axis发送请求的
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // axiso的配置
  baseURL: baseURL,
  timeout: 1000
})

instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置修改
  // 如果本地有token 就在头部携带
  const profile = store.state.user.profile // 获取用户信息对象
  if (profile.token) {
    // 设置 token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(res => { return res.data },
  error => {
  // 401 状态码 处理
    if (error.response && error.response.status === 401) {
      // 清空无效信息
      store.commit('user/setUser', {})
      // 进入到登录页 ， // 携带当前路由 ， 传参当前路由地址
      // 组件中获取当前地址 $router.fullPath
      // JS模块中 router.currentRouter.value.fullPath
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath) // 转义url ，防止解析出问题
      router.push('/login?redirectUrl=' + fullPath) // 重是定向地址
    }
    return Promise.reject(error)
  })
// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求 ， 请求地址 ， 方式 ， 提交的数据
  return instance({
    url,
    method,
    // get ,s使用 params 传参 ?a=b&c=10
    // 非get用 data 传递
    // [] 设置一个动态key ， 写JS 表达式 ， 表达式的结果用作key
    [method.toLowerCase() === 'get' ? 'param' : 'data']: submitData
  })
}
