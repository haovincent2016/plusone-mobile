<template>
  <div class="container">
    <van-button @click="goLogin" class="custom-btn" color="linear-gradient(to right, #ff6034, #ee0a24)">
      登录/注册解锁更多功能~
    </van-button>
  </div>
</template>

<script>
export default {
    methods: {
      goLogin() {
        this.$router.push({name: 'Login'})
      }
    }
}
</script>

<style lang="stylus" scoped>
.container
  width 100%
  display flex
  align-items center
  justify-content center
.custom-btn
  position absolute
  bottom 90px
  border-radius 15px
</style>