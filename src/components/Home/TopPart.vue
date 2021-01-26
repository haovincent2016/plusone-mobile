<template>
  <van-nav-bar
    class="custom-top" 
    fixed
    @click-right="goLogin"
    @click-left="goBack">
    <template #left>
      <!-- 登录页 -->
      <span v-show="isLogin" class="func-title">首页</span>
      <!-- 各功能页返回个人页 -->
      <van-icon color="#fff" v-show="isFunc" name="arrow-left" size="18" />
      <span v-show="isFunc" class="func-title">返回</span>
    </template>
    <template #right>
      <!-- 非登录页 && 未登录-->
      <van-icon color="#fff" v-show="!isLogin && !logined" name="user-circle-o" size="18" />
      <span v-show="!isLogin && !logined" class="func-title">登录</span>
    </template>
    <template #title>
      <img @click="goHome" :src="logoUrl" class="logo" />
    </template>
  </van-nav-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    // 是否位于登录页
    isLogin: Boolean,
    isFunc: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState([ 'logined' ]),
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
        return
      }
      if(this.isFunc) {
        this.$router.push({name: 'User'})
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.custom-top
  background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
.logo
  width 30px
  height 30px
  border-radius 50%
  padding 5px 15px
.func-title
  margin-left 3px
  color #fff
</style>