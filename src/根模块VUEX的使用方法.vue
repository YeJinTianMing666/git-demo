<template>
  <div id="nav">
    <!--    使用跟模块的 state数据-->
    <p>{{$store.state.username}}</p>
    <p> {{$store.getters.newName}}</p>
    <button @click="mutationsFn">mutationsFn</button>
  </div>

</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'APP',
  setup () {
    // 使用vue仓库
    const store = useStore()
    console.log(store.username)
    // 使用 跟模块的getter属性
    console.log(store.getters.newName)
    // 提交跟模块 mutations函数
    const mutationsFn = () => {
      // store.commit('updateName')
      store.dispatch('updateName')
    }
    return { mutationsFn }
  }
}

</script>
<style lang="less">
</style>
