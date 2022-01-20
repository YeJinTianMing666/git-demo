import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const routes = [
  // 一 级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home }
    ]
  }
]
//  创建路由
const router = createRouter({
  // web hash模式
  history: createWebHashHistory(),
  routes
})

export default router
