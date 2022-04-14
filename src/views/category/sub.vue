<template>
  <div class="sub-category">
    <div class="container">
      <SubBread></SubBread>
      <SubFilter @filter-change="changeFilter" />
<!--   结果区域-->
      <div class="goods-list">
        <SubSort @sort-change ="changeSort" ></SubSort>
<!--   列表-->
       <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <GoodsItem :goods="item" />
          </li>
        </ul>
<!--       加载 -->
        <XtxInfiniteLoading :loading ='loading' :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from '@/views/category/sub-bread'
import SubFilter from '@/views/category/sub-filter'
import XtxInfiniteLoading from '@/components/xtx-infinite-loading'
import GoodsItem from './components/goods-item'
import SubSort from '@/views/category/components/sub-sort'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'SubCategory',
  components: { XtxInfiniteLoading, GoodsItem, SubSort, SubBread, SubFilter },
  setup () {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      reqParams.categoryid = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 没有数据返回了，已经加载完毕
          finished.value = true
        }
        loading.value = false // 请求结束
      })
    }

    // 切换二级分类重新加载
    watch(() => route.params.id, (newVal) => {
      if (newVal && route.path === ('/category/sub/' + newVal)) {
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
        finished.value = false
      }
    })

    function compareAsc (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return parseFloat(value1) - parseFloat(value2)
      }
    }
    function compareDesc (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return parseFloat(value2) - parseFloat(value1)
      }
    }

    const changeFilter = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }
    // 监听排序改变
    const changeSort = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams }
      console.log('changeSort', reqParams)
      reqParams.page = 1
      console.log('goodsList.value', goodsList.value)
      reqParams.sortMethod === 'desc' ? goodsList.value = goodsList.value.sort(compareDesc('price')) : goodsList.value = goodsList.value.sort(compareAsc('price'))

      // goodsList.value = []
      // finished.value = false
    }

    return { loading, finished, goodsList, getData, changeFilter, changeSort }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
