<template>
    <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span class="placeholder" v-show="!fullLocation">请选择配送地址</span>
      <span class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option"  v-if="visible">
     <div v-if="loading" class="loading"></div>
     <template v-else>
       <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}} </span>
     </template>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import { ref, computed, reactive } from 'vue'
import axios from 'axios'
export default {
  name: 'xtx-city',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 获取城市数据
    const getCityData = () => {
      return new Promise((resolve, reject) => {
        // 有缓存
        if (window.cityData) {
          resolve(window.cityData)
        } else {
          const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          axios.get(url).then(res => {
            window.cityData = res.data
            resolve(window.cityData)
          })
        }
      })
    }
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        closeDialog()
        emit('change', changeResult)
      }
    }

    const active = ref(false)
    const loading = ref(false)
    const cityData = ref([])
    const visible = ref(false)
    const open = () => {
      visible.value = true
      loading.value = true
      // 获取数据
      getCityData().then(data => {
        cityData.value = data
        console.log('cityDaya:===>', cityData)
        loading.value = false
      })
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    // 定义计算属性
    const currList = computed(() => {
      let currList = cityData.value
      // TODO 根据点击的省份城市获取对应的列表
      // 城市
      if (changeResult.provinceCode) {
        currList = currList.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 地区
      if (changeResult.cityCode) {
        currList = currList.find(c => c.code === changeResult.cityCode).areaList
      }
      console.log('currList:==>', currList)
      return currList
    })
    const openDialog = () => {
      active.value = true
      open()
    }
    const closeDialog = () => {
      active.value = false
      visible.value = false
    }
    // 切换展开收起
    const toggleDialog = () => {
      if (active.value) closeDialog()
      else openDialog()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      closeDialog()
    })
    return { changeItem, open, active, toggleDialog, currList, target, loading, visible }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
