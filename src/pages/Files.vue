<template>
<div class="container">
  <TopPart :isLogin="false" :isFunc="true" />
  <!--文件下载区-->
  <!--列表-->
  <van-divider
    :style="{color:'#1989fa',borderColor:'#1989fa',padding:'0 16px'}"
  >
    <van-icon class="icon-style" name="apps-o" color="#1989fa" />
      资料下载专区
  </van-divider>
  <van-collapse v-model="activeNames">
    <van-collapse-item title="文件1" name="1">
      <template #title>
        <div>文件1 --- 下载</div>
      </template>
      文件内容介绍
      <van-button class="pos" plain size="small" type="info">下载</van-button>
    </van-collapse-item>
    <van-collapse-item title="文件1" name="2">
      <template #title>
        <div>文件2 --- 下载</div>
      </template>
      文件内容介绍
      <van-button class="pos" plain size="small" type="info">下载</van-button>
    </van-collapse-item>
    <van-collapse-item title="文件1" name="3">
      <template #title>
        <div>文件3 --- 下载</div>
      </template>
      文件内容介绍
      <van-button class="pos" plain size="small" type="info">下载</van-button>
    </van-collapse-item>
  </van-collapse>
</div>

</template>

<script>
import TopPart from 'components/Home/TopPart'

export default {
    data() {
      return {
        activeNames: []
      }
    },
    components: {
        TopPart
    }
}
</script>

<style lang="stylus" scoped>
.container 
  margin-top 46px
  font-weight 300
  width 100%
.icon-style
  font-size 20px
  margin-right: 4px
.pos
  position absolute
  right 15px
  bottom 5px
</style>