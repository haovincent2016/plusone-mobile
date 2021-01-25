<template>
  <div class="container">
    <TopPart :isLogin="true" />
    <van-button 
      v-if="userLogin" 
      @click="goLogin" 
      class="custom-btn" 
      color="linear-gradient(to right, #ff6034, #ee0a24)">
      登录/注册解锁更多功能~
    </van-button>
    <div class="user-content" v-else>
      <!-- 个人中心头部 -->
      <div class="user-header">
        <!-- 头像 -->
        <img :src="avatarUrl" class="avatar" />
        <div class="nickname">Vincent</div>
      </div>
      <!-- 个人中心功能栏 -->
      <div class="user-function">
        <van-row gutter="20">
          <van-col class="func-title" span="8">打卡</van-col>
          <van-col class="func-title" span="8">课程</van-col>
          <van-col class="func-title" span="8">资讯</van-col>
        </van-row>
      </div>
      <!-- 个人中心列表栏 -->
      <div class="user-body">
        <van-cell title="单元格" icon="location-o" value="展示信息" />
        <van-cell title="单元格" icon="location-o" value="展示信息" />
        <van-cell title="单元格" icon="location-o" value="展示信息" />
        <van-cell title="单元格" icon="location-o" value="展示信息" />
        <van-cell title="单元格" icon="location-o" value="展示信息"  />
      </div>
    </div>
  </div>
</template>

<script>
import TopPart from 'components/Home/TopPart'
export default {
  data() {
    return {
      //暂时赋值
      userLogin: false,
      avatarUrl: require('../../static/img/vince.jpg'),
    }
  },
  methods: {
    goLogin() {
      this.$router.push({name: 'Login'})
    }
  },
  components: {
    TopPart
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
  bottom 18%
  border-radius 15px


.user-content
  background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
  width 100%
  text-align center
.user-header
  margin-top 46px
  .avatar
    margin 16px 0
    width 80px
    height 80px
    border-radius 50%
    box-shadow 0 1px 5px 0 #e0e0e0
  .nickname
    font-weight 400
    font-size 18px
    color white
.user-function
  margin 16px 0
.user-body
  padding 8px
.func-title
  color #fff
.van-cell__title
  text-align left
</style>