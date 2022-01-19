<template>
  <div id="nav">
    <!--    使用跟模块的 state数据-->
    <p>{{$store.state.ModelA.username}}</p>
    <p>{{$store.getters.newName}}</p>

    <!--    带命名空间的-->
    <p>{{$store.getters['ModelB/newName']}}</p>
    <button @click="mutationsFn">mutationsFn</button>
    <button @click="actionsFn">actionsFn</button>
  </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import { useStore } from 'vuex'
export default {
  name: 'APP',
  setup: function () {
    const store = useStore()
    const actionsFn = () => {
      // 2.4 调用 B 模块的actions
      store.dispatch('ModelB/updateName')
    }
    const mutationsFn = () => {
      store.commit('ModelB/updateName')
    }
    return { mutationsFn, actionsFn }
  }
}
</script>
<style lang="less">
</style>
