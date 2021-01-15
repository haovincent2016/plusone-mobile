<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">价格</van-tabbar-item>
      <van-tabbar-item icon="friends-o">关于</van-tabbar-item>
      <van-tabbar-item icon="setting-o">联系</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
