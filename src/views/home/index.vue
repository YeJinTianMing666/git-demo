<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
         <!-- 轮播图 -->
        <HomeBanner />
        <!--新鲜好物-->
        <HomeNew />
        <!--人气推荐-->
        <HomeHot />
        <!--品牌推荐-->
        <HomeBrand />
        <!-- 商品区域 -->
        <HomeProduct />
        <!-- 特殊区域 -->
        <HomeSpecial />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special'
export default {
  name: 'PageHome',
  components: { HomeSpecial, HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct }
}
</script>
<style scoped lang="less">

</style>
