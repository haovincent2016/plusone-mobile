<template>
  <div class="full-width">
    <TopPart />
    <img style="margin-top:46px;" :src="topUrl" width="100%" />
    <van-divider
    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      <van-icon class="icon-style" name="thumb-circle-o" color="#1989fa" />
      联系我们
    </van-divider>
    <van-cell title="微信" icon="chat-o" value="haovincent" />
    <van-cell title="qq邮箱" icon="comment-o" value="578336285@qq.com" />
    <van-cell title="电话" icon="phone-o" value="18639289962" />
    <van-cell title="公众号" icon="fire-o" value="请扫码关注" />
    <div style="text-align:center;">
      <img style="margin-bottom:80px;" :src="qrUrl" width="220px" height="100%" />
    </div>
  </div>
</template>

<script>
import TopPart from 'components/Home/TopPart'

export default {
  data() {
    return {
      topUrl: require('../../static/img/about.png'),
      qrUrl: require('../../static/img/wechatcode.jpg')
    }
  },
  components: {
    TopPart
  }
}
</script>

<style lang="stylus" scoped>
.icon-style
 font-size 20px
 margin-right: 4px
</style>