<template>
  <div class="top-category">
  <!--    分类组件的顶部-->
  <!--    面包屑-->
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
          <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{topCategory.name}}</XtxBreadItem>
          </transition>
      </XtxBread>
  <!--    轮播图-->
      <XtxCarousel :sliders="sliders" style="height: 500px"></XtxCarousel>
  <!--    所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`" >
            <img :src="item.picture" >
            <p>{{item.id + item.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods"  v-for="item in subList" :key="item.id">
          <div class="head">
            <h3>- {{item.name}} -</h3>
            <p class="tag">{{item.desc}}</p>
            <XtxMore />
          </div>
          <div class="body">
            <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import XtxBread from '@/components/library/xtx-bread'
import XtxBreadItem from '@/components/library/xtx-bread-item'
import XtxCarousel from '@/components/library/xtx-carousel'
import GoodsItem from './components/goods-item'
export default {
  name: 'TopCategory',
  components: { GoodsItem, XtxCarousel, XtxBreadItem, XtxBread },
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    // 分类数据
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {}
      const item = store.state.catergory.list.find(item => {
        return item.id === route.params.id
      })
      if (item) cate = item
      return cate
    })
    // 推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    console.log('route.path:', route.path)
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/${newVal}` === route.path) getSubList() // 得到id之后主动触发一次
      console.log('subList[0]:', subList.value)
    }, { immediate: true })

    return { sliders, topCategory, subList }
  }
}
</script>

<style scoped lang="less">
  .top-category{
    h3{
    font-size: 28px;
    color: #666;
    text-align: center;
    line-height: 100px;
    }
    .sub-list{
    margin-right: 20px;
    background-color: #fff;
    ul{
      display: flex;
      padding: 0px 32px;
      flex-wrap: wrap;
      li{
        width: 168px;
        height: 160px;
        a{
          text-align: center;
          display: block;
          font-size: 16px;
          img{
            width: 100px;
            height: 100px;
          }
          p{
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
</style>
