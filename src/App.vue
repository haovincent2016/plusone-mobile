<template>
  <div class="container center-content">
    <RouterView />
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/Price" icon="gold-coin-o">价格</van-tabbar-item>
      <van-tabbar-item replace to="/About" icon="smile-o">师资</van-tabbar-item>
      <van-tabbar-item replace to="/Contact" icon="phone-circle-o">联系</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="stylus" scoped>

.container
  font-family 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
  max-width 1200px

</style>
