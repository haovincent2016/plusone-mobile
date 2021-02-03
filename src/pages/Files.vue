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
        <div>文件1 --- <span class="download" @click="downloadFile('11.png')">下载</span></div>
      </template>
      文件内容介绍
      <van-button class="pos" plain size="small" type="info" @click="downloadFile('11.png')">下载</van-button>
    </van-collapse-item>
    <van-collapse-item title="文件1" name="2">
      <template #title>
        <div>文件2 --- <span class="download" @click="downloadFile('22.png')">下载</span></div>
      </template>
      文件内容介绍
      <van-button class="pos" plain size="small" type="info" @click="downloadFile('22.png')">下载</van-button>
    </van-collapse-item>
    <van-collapse-item title="文件1" name="3">
      <template #title>
        <div>文件3 --- <span class="download" @click="downloadFile('备忘.txt')">下载</span></div>
      </template>
      文件内容介绍
      <van-button class="pos" plain size="small" type="info" @click="downloadFile('备忘.txt')">下载</van-button>
    </van-collapse-item>
  </van-collapse>
  <iframe name="myIframe" style="display:none"></iframe>
</div>

</template>

<script>
import TopPart from 'components/Home/TopPart'
import baseUrl from '@/utils/setting'

export default {
    data() {
      return {
        activeNames: []
      }
    },
    methods: {
      downloadFile(name) {
        window.open(baseUrl + '/download/' + name, 'myIframe')
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
.download
  color #1989fa
  
</style>