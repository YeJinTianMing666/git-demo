// 用户模块
export default {
  namespaced: true,
  state: () => {
    return {
      // 用来存储用户信息，与后台保持一致
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
