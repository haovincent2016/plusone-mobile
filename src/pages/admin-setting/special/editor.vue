<template>
  <div class="form-wrapper">
    <div class="tab-content">
      <h2>{{ type && list[type]['tit'] }}</h2>
      <div class="tab" v-if="type === 'banner'">
        <span
          v-for="(val, key, index) in tabType"
          :key="index"
          @click="tab(key)"
          :class="{active: val}"
        ><i class="el-icon-s-data"></i>{{ key }}</span>
      </div>
    </div>
    <component 
      :is="type && list[type]['com']" 
      :data="data"
      @changeTab="tab"
    ></component>
  </div>
</template>

<script>
import Images from "./settings/images"
import Nav from "./settings/nav"
import Links from './settings/links'
import Contents from './settings/contents'
import Titles from './settings/titles'
import IntroSetting from './settings/introsetting'
import SepSetting from './settings/sepsetting'

export default {
  name: 'Editor',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      type: '',
      list: {
        'nav': {
          tit: '页面信息',
          com: 'Nav'
        },
        'banner': {
          tit: '轮播图',
          com: 'Images'
        },
        'video': {
          tit: '视频设置',
          com: 'Links'
        },
        'course': {
          tit: '内容设置',
          com: 'Contents'
        },
        'news': {
          tit: '新闻设置',
          com: 'Titles'
        },
        'intro': {
          tit: '教师简介',
          com: 'IntroSetting'
        },
        'separator': {
          tit: '分栏行',
          com: 'SepSetting'
        }
      },
      tabType: {
          1: true,
          2: false,
          3: false
      }
    }
  },
  mounted() {
    this.type = this.data.type
    //console.log(this.type)
    //console.log(this.list[this.type]['com'])
    if (this.data.tabType) {
      this.tab(this.data.tabType)
    }
  },
  methods: {
    tab(key) {
      for (let i in this.tabType) {
        if (key == i) {
          this.tabType[key] = true
          this.$set(this.data, 'tabType', key)
        } else {
          this.tabType[i] = false
        }
      }
    }
  },
  components: {
    Nav,
    Images,
    Links,
    Contents,
    Titles,
    IntroSetting,
    SepSetting
  }
}
</script>

<style scoped lang="scss">
.form-wrapper {
    padding: 0 5px;
    height: 740px;
    background: #fff;
    overflow-y: auto;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    &::-webkit-scrollbar{
      width: 6px;
    }
    &::-webkit-scrollbar-thumb{
      background: #dbdbdb;
    }
    &::-webkit-scrollbar-track{
      background: #f6f6f6;
    }
}
.tab-content{
    padding: 0 15px;
    h2{
        font-size: 16px;
        color: #333;
    }
    .tab{
        display: flex;
        justify-content: space-around;
        border: 1px solid #ddd;
        border-radius: 6px;
        span{
            width: 33.33%;
            text-align: center;
            font-size: 14px;
            color: #666;
            display: block;
            height: 36px;
            line-height: 36px;
            cursor: pointer;
            &.active{
                color: #fff;
                background: #409eff;
                border-radius: 2px;
            }
            &:nth-of-type(2) {
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
            }
        }
    }
}
</style>