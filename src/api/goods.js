// 定义分类相关API
import request from '@/utils/request'
export const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}
export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}
// 获取商品的评价信息
export const findCommentInfoByGoods = (id) => {
  return request(`/goods/${id}/evaluate`, 'get', { id })
}
