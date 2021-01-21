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
      <img style="margin-bottom:25px;" :src="qrUrl" width="220px" height="100%" />
    </div>

    <div class="title">加一英语&copy;2021</div>
    <vue-star animate="animated bounceIn" color="#F05654" class="my-heart">
      <i slot="icon" class="fa fa-thumbs-o-up"></i>
    </vue-star>
    <div class="sub-title">点个赞吧再走吧~</div>
  </div>
</template>

<script>
import TopPart from 'components/Home/TopPart'
import VueStar from 'vue-star'

export default {
  data() {
    return {
      topUrl: require('../../static/img/about.png'),
      qrUrl: require('../../static/img/wechatcode.jpg')
    }
  },
  components: {
    TopPart,
    VueStar
  }
}
</script>

<style lang="stylus" scoped>
.icon-style
 font-size 20px
 margin-right: 4px
.title
 text-align center
 font-size 16px
 color #aaa
.my-heart
 position relative!important
 display flex
 width 100%;
 align-items flex-start
 justify-content center
 font-size 20px
.sub-title
 text-align center
 margin-bottom 80px
 font-size 12px
 color #aaaaaa
 margin-top: -20px
</style>