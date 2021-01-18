<template>
  <van-nav-bar
    fixed
    right-text="更多"
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <template #title>
      <img :src="logoUrl" class="logo" />
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
    onClickLeft() {
      this.$toast('返回')
    },
    onClickRight() {
      this.$toast('详情')
    },
  },
}
</script>

<style lang="stylus" scoped>
.logo
  width 30px
  height 30px
  border-radius 50%
</style>