<template>
  <van-nav-bar fixed>
    <template #title>
      <img @click="goHome" :src="logoUrl" class="logo" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  data() {
    return {
      logoUrl: require('../../../static/img/site-logo.png')
    }
  },
  methods: {
    goHome() {
      this.$router.push({name: 'Home'})
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
</style>