<template>
  <XtxBread>
     <XtxBreadItem to="/"> 首页 </XtxBreadItem>
     <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
    <XtxBreadItem v-if="category.sub" :to="`/category/${category.sub.id}`">{{category.sub.name}}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'SubBread',
  setup () {
    // 注意：setup中this不是当前vue实例
    const route = useRoute()
    console.log(route.params.id)
    const store = useStore()
    console.log(store)
    const category = computed(() => {
      const obj = {}
      store.state.catergory.list.forEach(top => {
        top.children && top.children.forEach(sub => {
          if (sub.id === route.params.id) {
            obj.sub = { id: sub.id, name: sub.name }
            obj.top = { id: top.id, name: top.name }
          }
        })
      })
      return obj
    })
    return { category }
  }
}
</script>

<style scoped lang="less">

</style>
