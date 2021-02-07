<template>
  <div>
    <RouterView />
    <van-tabbar v-if="!isAdmin" route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/Price" icon="gold-coin-o">价格</van-tabbar-item>
      <van-tabbar-item replace to="/About" icon="smile-o">师资</van-tabbar-item>
      <van-tabbar-item replace to="/Contact" icon="phone-circle-o">联系</van-tabbar-item>
      <van-tabbar-item replace to="/User" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState([ 'isAdmin' ]),
  created() {
    // 保存vuex信息，数据保存在当前会话，刷新页面数据不会被清除，结束会话（关闭浏览器、关闭页面、跳转页面）数据失效。
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="stylus" scoped>
</style>
