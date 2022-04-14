<template>
<!--  新鲜好物组件-->
  <div class="home-hot" >
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <template #right>
          <XtxMore path="/" />
        </template>
        <!--      动画的父容器需要定位，防止定位跑偏-->
      <div  ref="target" style="position: relative;   height: 426px;">
  <!--    面本内容-->
         <Transition name="fade">
          <ul  v-if="goods.length" ref="pannel" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="'/product/${item.id}'">
              <img v-lazyload="item.picture" alt="">
              <p class="name ellipsis"> {{item.name}}</p>
              <p class="desc">{{item.alt}}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
         </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '@/views/home/components/home-panel'
import HomeSkeleton from './home-skeleton'
import XtxMore from '@/components/library/xtx-more'
import { useLazyData } from '@/hooks'
import { findHot } from '@/api/home'
export default {
  name: 'HomeHot',
  components: { XtxMore, HomePanel, HomeSkeleton },
  setup () {
    // 懒加载效果
    const { target, result } = useLazyData(findHot)
    const goods = result
    return { goods, target }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .desc {
      color: #666666;
    }
  }
}
</style>
