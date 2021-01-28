<template>
  <div>
    <TopPart :isLogin="false" :isFunc="true" />
    <div v-if="logined">
      <!-- 收藏页顶部 -->
      <div class="col-header">
        <img :src="backgroundUrl" class="background" />
        <div class="wrapper">
          <img :src="avatarUrl" class="avatar" />
        </div>
        <div class="username">
          <div class="content">{{ userInfo.usernmae }}</div>
          <van-button class="custom-btn" round type="info">编辑我的信息</van-button>
        </div>
      </div>
      <!-- 收藏页tab -->
      <div class="col-tab">
        <van-tabs v-model="active">
        <van-tab title="收藏">
          <div class="col-body" v-for="item in collections" :key="item.id">
            <div class="col-title">{{ item.title }}</div>
            <div class="col-date">创建日期：{{ item.createdAt | convertTime }}</div>
          </div>
        </van-tab>
        <van-tab title="热门">
          <div class="list">
            <div class="list-item" v-for="item in articles" :key="item.id" @click="goDetail(item.id)">
              <div class="item-title">
                {{ item.title }}
              </div>
              <div class="item-author">
                <div class="author-name">作者：{{ item.user.username }}</div>
                <img :src="item.user.avatar" />
              </div>
              <div class="item-content">
                {{ item.content }}
              </div>
              <div class="item-func">
                <van-button icon="good-job-o" class="like" type="info" plain>点赞 {{ item.like }}</van-button>
                <van-button icon="star-o" class="like" color="#ff9900" plain>收藏</van-button>
              </div>
            </div>
          </div>
      </van-tab>
    </van-tabs>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import TopPart from 'components/Home/TopPart'
import { getCollectionsByOwner } from '../api/collection'
import { getArticles } from '../api/article'

export default {
  data() {
    return {
      active: 0,
      collections: [],
      articles: [],
      backgroundUrl: require('../../static/img/bg1.png'),
      avatarUrl: require('../../static/img/vince.jpg'),
    }
  },
  filters: {
    convertTime: function(val) {
      return new Date(val).toLocaleDateString()
    }
  },
  computed: mapState([ 'logined', 'userInfo' ]),
  // created() {
  //   this.getData()
  // },
  watch: {
    active: {
      handler(val) {
        this.getData(val)
      },
      immediate: true
    }
  },
  methods: {
    getData(val) {
      if(val === 0) {
        let data = {
          author: this.userInfo.id
        }
        getCollectionsByOwner(data).then(res => {
          if(res.data.code === '0') {
            this.$toast.success(res.data.desc)
            this.collections = JSON.parse(res.data.collections)
          } else {
            this.$toast.fail(res.data.desc)
          }
        }).catch(err => {
          this.$toast.fail(res.data.desc)
        })
      } else {
        getArticles().then(res => {
          if(res.data.code === '0') {
            this.$toast.success(res.data.desc)
            this.articles = JSON.parse(res.data.articles)
          } else {
            this.$toast.fail(res.data.desc)
          }
        }).catch(err => {
          this.$toast.fail(res.data.desc)
        })
      }
    },
    goDetail(id) {
      this.$router.push('/articles/'+id)
    }
  },
  components: {
    TopPart
  }
}
</script>

<style lang="stylus" scoped>
.col-header
  border-radius 4px
  background #fff
  box-shadow 0 1px 3px rgba(18,18,18,.1)
  .background
    margin-top 46px
    width 100%
  .wrapper
    margin -60px 40px 0 40px
    display flex
    justify-content center
    align-items center
    .avatar
      width 120px
      height 120px
      border-radius 50%
      border 1px solid #fff
  .username
    text-align center
    .content
      margin 15px
      font-weight 400
      font-size 18px
    .custom-btn
      margin-bottom 15px
.col-tab
  margin 15px 0 80px 0
  border-radius 4px
  background #fff
  box-shadow 0 1px 3px rgba(18,18,18,.1)
.col-body
  border-radius 4px
  background #fafafa
  box-shadow 0 1px 3px rgba(18,18,18,.1)
  margin 15px 10px
  .col-title
    padding 15px
  .col-date
    padding 0 15px 15px 15px
.list
  padding 15px
  .list-item
    box-shadow 0 1px 3px rgba(18,18,18,.1)
    margin 8px 0
    padding 8px 0
    .item-title
      font-size 18px
    .item-author
      margin 10px 0
      display flex
      align-items center
      justify-content flex-start
      .author-name
        color #a1a1a1
      img
        width 20px
        height 20px
        border-radius 50%
        margin-left 6px
    .item-content
      max-height 120px
      margin-bottom 10px
    .item-func
      display flex
      justify-content flex-start
      align-items center
      .like
        font-size 16px
        margin-right 8px

</style>