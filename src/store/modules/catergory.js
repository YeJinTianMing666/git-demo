// 存储分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合, 依赖 topCategory ，保证初始化数据
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类 函数
  mutations: {
    // payload 所有分类的集合
    setList (state, payload) {
      state.list = payload
    },
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getlist ({ commit }) {
      // 获取分类数据
      const data = await findAllCategory()
      // 为每一个一级类别添加开关
      data.result.forEach(item => {
        item.open = false
      })
      commit('setList', data.result)
    }
  }
  //
}
