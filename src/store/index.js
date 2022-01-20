// eslint-disable-next-line no-unused-vars
import { createStore } from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'
import cart from '@/store/modules/cart'
import user from '@/store/modules/user'
import catergory from '@/store/modules/catergory'

export default createStore({
  modules: {
    cart,
    user,
    catergory
  },
  plugins: [CreatePersistedState({
    // 默认存储在 locastage
    // 本地存储的名字
    key: 'erabbit-client-pc-store',
    // 指定需要存储的模块
    path: ['user', 'cart']
  })
  ]
})
