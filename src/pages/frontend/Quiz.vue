<template>
<div class="container">
  <TopPart :isLogin="false" :isFunc="true" />
  <!--测试区-->
  <!--列表-->
  <van-divider
    :style="{color:'#1989fa',borderColor:'#1989fa',padding:'0 16px'}"
  >
    <van-icon class="icon-style" name="apps-o" color="#1989fa" />
      测试专区（测测你的英语水平吧）
  </van-divider>
  <!--手机版暂时用问卷星-->
</div>
</template>

<script>
import TopPart from 'components/Home/TopPart'

export default {
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
</style>