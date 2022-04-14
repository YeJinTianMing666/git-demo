<template>
<!--商品详情页-->
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
         <XtxBreadItem :to="'/category/'+goods.categories[0].id">{{goods.categories[0].name}}</XtxBreadItem>
         <XtxBreadItem :to="'/category/sub/'+goods.categories[1].id">{{goods.categories[1].name}}</XtxBreadItem>
         <XtxBreadItem >{{goods.name}}</XtxBreadItem>
      </XtxBread>
      <!--        商品信息-->
      <div class="good-info">
        <!--        大图片-->
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <GoodsSku :goods="goods" > </GoodsSku>
          <xtx-numbox label="数量" v-model="num" :max="goods.inventory"></xtx-numbox>
          <XtxButton type="primary" style="margin-top:20px;">加入购物车</XtxButton>
        </div>
      </div>
      <!--      商品推荐-->
      <GoodsRelative :goodsId="goods.id"></GoodsRelative>
      <!--     商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
           <!-- 商品+评价 -->
           <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
            <GoodsWarn></GoodsWarn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, provide, ref, watch } from 'vue'
import GoodsRelative from './components/goods-relevant'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsHot from './components/goods-hot'
import GoodsTabs from './components/goods-tabs'
import GoodsWarn from './components/goods-warn'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsWarn, GoodsTabs, GoodsHot, GoodsSku, GoodsRelative, GoodsImage, GoodsName, GoodsSales },
  setup () {
    // 获取商品详情
    // 出现路由地址商品ID发生变化，但是不会重新初始化组件
    const goods = ref(null)
    const route = useRoute()
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then(data => {
          // 让商品数据为null   让后使用v-if的组件可以重新销毁和创建
          goods.value = null
          nextTick(() => {
            goods.value = data.result
            console.log('goods.value==>', data.result)
          })
        })
      }
    }, { immediate: true })
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    const num = ref(1)
    provide('goods', goods)
    return { goods, changeSku, num }
  }
}

</script>

<style scoped lang="less">
.good-info{
  min-height: 600px;
  background: #cdcdcd;
  display: flex;
   .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer{
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.goods-tabs{
  min-height: 600px;
  background: #fff;
}
</style>
