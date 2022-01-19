import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []
//  创建路由
const router = createRouter({
  // web hash模式
  history: createWebHashHistory(),
  routes
})

export default router
