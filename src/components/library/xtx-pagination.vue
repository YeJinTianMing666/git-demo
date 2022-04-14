<template>
<!--  分页组件-->
  <div class="xtx-pagination">
    <a  v-if="currPage<=1" href="javascript:;"  class="disabled">上一页</a>
    <a @click="changePage(currPage-1)" v-else href="javascript:;">上一页</a>
    <span  v-if="pager.start>1">...</span>
    <a @click="changePage(i)" href="javascript:;" :class="{active:i===currPage}" v-for="i in pager.btnArr" :key="i">{{i}}</a>
    <span v-if="pager.end<pager.pageCount">...</span>
    <a v-if="currPage>=pager.pageCount" href="javascript:;" class="disabled">下一页</a>
    <a  @click="changePage(currPage+1)" v-else href="javascript:;">下一页</a>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup (props, { emit }) {
    // 总条数目
    const myTotal = ref(0)
    // 每页条数
    const PageSzie = ref(10)
    // 当前第几页
    const currPage = ref(1)
    // 按钮个数
    const btnCount = ref(5)
    const pager = computed(() => {
      // 总共有多少页
      const pageCount = Math.ceil(myTotal.value / PageSzie.value)
      let start = currPage.value - Math.floor(btnCount.value / 2)
      let end = start + btnCount.value - 1
      if (start < 1) {
        start = 1
        end = (start + btnCount.value - 1) > pageCount ? pageCount : (start + btnCount.value - 1)
      }
      if (end > pageCount) {
        end = pageCount
        start = (end - btnCount.value + 1) < 1 ? 1 : (end - btnCount.value + 1)
      }
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return { pageCount, start, end, btnArr }
    })
    const changePage = (newPage) => {
      if (currPage.value !== newPage) {
        currPage.value = newPage
        emit('current-change', newPage)
      }
    }

    watch(props, () => {
      myTotal.value = props.total
      PageSzie.value = props.pageSize
      currPage.value = props.currentPage
    }, { immediate: true })

    return { pager, currPage, changePage }
  }
}
</script>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
