<template>
  <div class="goods-comment" v-if="commentInfo">
    <div class="head">
      <div class="data" >
        <p > <span>{{commentInfo.salesCount}}</span><span>人购买</span></p>
        <p><span>{{commentInfo.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a  v-for="(item,i) in commentInfo.tags"
            :key="item.title"
            href="javascript:;"
            :class="{active:currTagIndex===i}"
            @click="changeTag(i)"> {{item.title}}（{{item.tagCount}}）</a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;"  @click="changeSort('null')"
         :class="{active: reqParams.sortField=== 'null'}">默认</a>
      <a href="javascript:;"  @click="changeSort('praiseCount')"
         :class="{active: reqParams.sortField==='praiseCount'}">最新</a>
      <a href="javascript:;"  @click="changeSort('createTime')"
         :class="{active: reqParams.sortField==='createTime'}">最热</a>
    </div>
<!--    评价列表-->
    <div class="list" v-if="commentList.length" >
      <div class="item" v-for="item in commentList"  :key="item.id">
        <div v-if="item.member" class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
        <!-- 几颗星？-->
          <div class="score">
            <i  v-for="i in item.score" :key="i+'1'" class="iconfont icon-wjx01"></i>
            <i  v-for="i in 5-item.score" :key="i+'2'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">
            {{item.content}}
          </div>
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>100</span>
          </div>
        </div>
      </div>
    </div>
    <XtxPagination @current-change="changePager" :total="total"  :currentPage="reqParams.page"  />
  </div>
</template>
<script>
import { findCommentInfoByGoods } from '@/api/goods'
import { inject, reactive, ref, watch } from 'vue'
import GoodsCommentImage from './goods-comment-image'
const getCommentInfo = (goods) => {
  const commentInfo = ref(null)
  findCommentInfoByGoods(goods.id).then(data => {
    // type 的目的是将来点击可以区分点的是不是标签
    data.result.tags.unshift({ type: 'img', title: '有图', tagCount: data.result.hasPictureCount })
    data.result.tags.unshift({ type: 'all', title: '全部评价', tagCount: data.result.evaluateCount })
    commentInfo.value = data.result
  })
  return commentInfo
}
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup () {
    const goods = inject('goods')
    const commentInfo = getCommentInfo(goods.value)
    const currTagIndex = ref(0)
    const changeTag = (i) => {
      currTagIndex.value = i
      // 设置有图和标签条件、
      const currTag = commentInfo.value.tags[i]
      if (currTag.type === 'all') {
        reqParams.hasPicture = false
        reqParams.tag = null
      } else if (currTag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = false
        reqParams.tag = currTag.title
      }
      reqParams.page = 1
    }
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null
    })
    const commentList = ref([])

    const total = ref(0)
    watch(reqParams, async () => {
      const data = await findCommentInfoByGoods(goods.id, reqParams)
      commentList.value = data.result
      if (commentList.value.length) {
        total.value = data.result.counts
      }
    }, { immediate: true })

    const changeSort = (type) => {
      reqParams.sortField = type
      reqParams.page = 1
    }

    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }

    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '').trim()
    }
    // 改变分页函数
    const changePager = (np) => {
      reqParams.page = np
    }
    return { total, changePager, formatSpecs, formatNickname, commentList, reqParams, changeSort, goods, commentInfo, currTagIndex, changeTag }
  }

}
</script>
<style scoped lang="less">
.goods-comment{
  .head {
    display: flex;
    padding: 30px 0;
    .data{
      width: 340px;
      display: flex;
      padding: 20px;
      p{
        flex: 1;
        text-align: center;
        span{
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags{
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        >a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort{
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    >span{
      margin-left: 20px;
    }
    >a{
      margin-left: 30px;
      &.active, &:hover {
        color: @xtxColor;
      }
    }
  }
}

.list{
  .item{
    display: flex;
     padding: 25px 10px;
    .user{
      width: 200px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }
       span {
          padding-left: 10px;
          color: #666;
        }
    }
    .body{
      flex:1;
      .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        // 两端对齐
        justify-content: space-between;
        margin-top: 5px;
      }
  }
}

</style>
