<template>
  <div class="container">
    <TopPart :isLogin="false" :isFunc="true" />
    <div class="article-header">
      <div class="title">{{ article.title }}</div>
    </div>
    <div class="article-info">
      <div class="author">{{ article.user.username }}</div>
      <img class="avatar" :src="article.user.avatar" />
    </div>
    <div class="article-body" v-html="article.content"></div>
    <div class="article-footer">
      <van-button 
        icon="good-job-o" 
        class="like" 
        type="info" 
        plain
        @click="likeArticle">
        点赞 {{ article.like }}
      </van-button>
      <van-button 
        icon="star-o" 
        class="like" 
        color="#ff9900" 
        plain
        @click="addArticle">
        收藏
      </van-button>
      <div class="view">浏览量 {{ article.view}}</div>
      <van-popup 
        v-model="show" 
        position="bottom" 
        :style="{ height: '30%' }" 
        closeable
        close-icon="close"
        round>
        <van-cell title="默认收藏夹" size="large" label="暂无描述信息~" style="margin-top:35px;">
          <template #default>
            <van-button 
              plain 
              hairline 
              type="info" 
              size="small"
              @click="addCollection">添加</van-button>
          </template>
        </van-cell>
        <div class="add-btn">
          <van-button
            icon="plus"
            type="primary" 
            round 
            @click="createCollection">新建收藏夹</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import TopPart from 'components/Home/TopPart'
import { getArticleById } from '../api/article'

export default {
  data() {
    return {
      show: false,
      article: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let data = { id: this.$route.params.id }
      getArticleById(data).then(res => {
        if(res.data.code === '0') {
          this.$toast.success(res.data.desc)
          this.article = JSON.parse(res.data.detail)
        } else {
          this.$toast.fail(res.data.desc)
        }
      }).catch(err => {
        this.$toast.fail(res.data.desc)
      })
    },
    //点赞
    likeArticle() {

    },
    //打开收藏
    addArticle() {
      this.show = true
    },
    //加入收藏夹
    addCollection() {

    },
    //新建收藏夹
    createCollection() {

    }
  },
  components: {
    TopPart
  }
}
</script>
<style lang="stylus">
.img
  width 100%
  height auto
</style>
<style lang="stylus" scoped>
.add-btn 
  position absolute
  text-align center
  width 100%
  bottom 15px
.container 
  margin-top 66px
  font-weight 300
  padding 15px
  .article-header
    display flex 
    justify-content center 
    .title
      font-size 20px
  .article-info
    display flex
    justify-content flex-start
    align-items flex-end
    margin-top 15px
    .author 
      margin-right 6px
      font-size 18px
      color #a3a3a3
      font-weight 300
    .avatar
      width 22px
      height 22px
      border-radius 50%
  .article-body
    margin 15px 0
    border 1px solid #f5f5f5
    padding 15px
  .article-footer
    display flex
    justify-content flex-start
    align-items center
    .like
      font-size 14px
      margin-right 8px
    .view
      color #a3a3a3
</style>