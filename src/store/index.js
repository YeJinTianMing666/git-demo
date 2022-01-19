import { createStore } from 'vuex'

// eslint-disable-next-line no-unused-vars
const ModelA = {
  // 不用命名空间 , 会被放到全局
  state: {
    username: 'ma'
  },
  getters: {
    newName (state) {
      return state.username + '!'
    }
  },
  mutations: {
    updateName (state) {
      state.username = 'ModelAAA'
    }
  }
}

// eslint-disable-next-line no-unused-vars
const ModelB = {
  namespaced: true,
  state: {
    username: 'mb'
  },
  getters: {
    newName (state) {
      return state.username + '!'
    }
  },
  mutations: {
    updateName (state) {
      state.username = 'ModelBBB'
    }
  },
  actions: {
    updateName: function (ctx) {
      // 发请求
      setTimeout(() => {
        ctx.commit('updateName')
      }, 1000)
    }
  }
}
export default createStore({
  modules: { ModelA, ModelB }
})
// 创建仓库 createStore 函数
// export default createStore({
//   state: {
//     username: 'zs'
//   },
//   getters: {
//     newName (state) {
//       return state.username
//     }
//   },
//   mutations: {
//     updateName (state) {
//       state.username = 'ls'
//     }
//   },
//   actions: {
//     updateName: function (ctx) {
//       // 发请求
//       setTimeout(() => {
//         ctx.commit('updateName')
//       }, 1000)
//     }
//   },
//   modules: {
//   }
// })
