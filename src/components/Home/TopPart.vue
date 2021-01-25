<template>
  <van-nav-bar 
    fixed
    @click-right="goLogin"
    @click-left="goBack">
    <template #left>
      <van-icon v-show="isLogin" name="arrow-left" size="18" />
      <span v-show="isLogin" class="func-title">返回</span>
    </template>
    <template #right>
      <van-icon v-show="!isLogin" name="user-circle-o" size="18" />
      <span v-show="!isLogin" class="func-title">登录</span>
    </template>
    <template #title>
      <img @click="goHome" :src="logoUrl" class="logo" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: {
    isLogin: Boolean
  },
  data() {
    return {
      logoUrl: require('../../../static/img/site-logo.png')
    }
  },
  created() {

  },
  methods: {
    goHome() {
      this.$router.push({name: 'Home'})
    },
    goLogin() {
      if(!this.isLogin) {
        this.$router.push({name: 'Login'})
      }
    },
    goBack() {
      if(this.isLogin) {
        this.$router.push({name: 'Home'})
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.logo
  width 30px
  height 30px
  border-radius 50%
  padding 5px 15px
.func-title
  margin-left 3px
  color #1989fa
</style>