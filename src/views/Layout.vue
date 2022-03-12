<template>
<!--  顶部通栏-->
  <AppNavbar/>
<!--  头部组件-->
  <AppHeader/>
<!--  内容容器-->
  <div class="main">
    <!--    二级路由-->
    二级路由
    <RouterView />
  </div>
<!--  底部组件-->
  <APPFooter/>
</template>

<script>
import AppNavbar from '@/components/app-navbar'
import AppHeader from '@/components/app-header'
import APPFooter from '@/components/app-footer'
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    APPFooter
  }
}
</script>

<style scoped>
.main{
  min-height:600px ;
}
</style>
