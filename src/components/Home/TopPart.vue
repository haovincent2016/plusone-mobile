<template>
  <van-nav-bar
    left-text="返回"
    right-text="详情"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <template #title>
      <img src="/static/img/site-logo.png" class="logo" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
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