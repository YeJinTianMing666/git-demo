// eslint-disable-next-line no-unused-vars
import { createStore } from 'vuex'
import cart from '@/store/modules/cart'
import user from '@/store/modules/user'
import catergory from '@/store/modules/catergory'

export default {
  modules: {
    catergory: {
      cart, user, catergory
    }
  }
}
