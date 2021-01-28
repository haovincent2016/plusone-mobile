<template>
  <div class="container">
    <TopPart :isLogin="true" />
    <div v-if="!logined" class="common-content">
    <van-button 
      @click="goLogin" 
      class="custom-btn" 
      color="linear-gradient(to right, #ff6034, #ee0a24)">
      注册/登录解锁更多功能~
    </van-button>
    </div>
    <div class="user-content" v-else>
      <!-- 个人中心头部 -->
      <div class="user-header">
        <!-- 头像 -->
        <img :src="userInfo.avatar" class="avatar" />
        <div class="nickname">{{ userInfo.nickname? userInfo.nickname : userInfo.username }}</div>
      </div>
      <!-- 个人中心功能栏 -->
      <div class="user-function">
        <van-row gutter="20">
          <van-col class="func-title" span="6" @click="goDetail('1')">打卡</van-col>
          <van-col class="func-title" span="6" @click="goDetail('2')">测试</van-col>
          <van-col class="func-title" span="6" @click="goDetail('3')">收藏</van-col>
          <van-col class="func-title" span="6" @click="goDetail('4')">资料</van-col>
        </van-row>
      </div>
      <!-- 个人中心列表栏 -->
      <div class="user-body">
        <van-cell title="我的收藏" is-link value="更多" :to="{ name: 'Collection' }" />
        <van-cell 
          v-for="item in articles" 
          :key="item.id" 
          :title="item.title" 
          icon="label-o" 
          is-link 
          :url="`/#/Articles/${item.id}`"
          value="详情" />
      </div>
      <van-button 
      @click="goLogout" 
      class="logout-btn" 
      color="linear-gradient(to right, #ff6034, #ee0a24)">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import TopPart from 'components/Home/TopPart'
import { mapState, mapMutations } from 'vuex'
import { getArticles } from '../api/article'

export default {
  data() {
    return {
      articles: []
    }
  },
  computed: mapState([ 'logined', 'userInfo' ]),
  created() {
    this.getData()
  },
  methods: {
    ...mapMutations(['userLogout']),
    getData() {
      let data = { limit: 5 }
      getArticles(data).then(res => {
        if(res.data.code === '0') {
          this.$toast.success(res.data.desc)
          this.articles = JSON.parse(res.data.articles)
        } else {
          this.$toast.fail(res.data.desc)
        }
      }).catch(err => {
        this.$toast.fail(res.data.desc)
      })
    },
    goLogin() {
      this.$router.push({name: 'Login'})
    },
    goLogout() {
      this.userLogout()
      this.$toast.success("成功退出登录")
    },
    goDetail(index) {
      switch(index) {
        case '1':
          this.$router.push({ name: 'Task' })
          break
        case '2':
          this.$router.push({ name: 'Quiz' })
          break
        case '3':
          this.$router.push({ name: 'Collection' })
          break
        case '4':
          this.$router.push({ name: 'Files' })
          break
      }
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

.common-content 
  background-image linear-gradient(45deg, #0081ff, #1cbbb4)
  width 100%
  height 100vh
  display flex 
  justify-content center 
  align-items center
  .custom-btn 
    font-size 16px
    padding 16px 18px
    border-radius 20px
.user-content
  background-image linear-gradient(45deg, #0081ff, #1cbbb4)
  width 100%
  height 100vh
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
.logout-btn
  margin 25px 0
  border-radius 20px
  padding 0 25px
</style>