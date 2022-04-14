import request from '@/utils/request'
// 获取所有分类
export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
// 获取广告数据
export const findBanner = () => {
  return request('/home/banner', 'get')
}

// 获取新鲜 好物数据
export const findNew = () => {
  return request('home/new', 'get')
}

export const findHot = () => {
  return request('home/hot', 'get')
}

export const findGoods = () => {
  return request('home/goods', 'get')
}

export const findSpecial = () => {
  return request('home/special', 'get')
}
