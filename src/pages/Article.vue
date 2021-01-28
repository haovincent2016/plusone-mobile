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
    <div class="article-body">{{ article.content }}</div>
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
    </div>
  </div>
</template>

<script>
import TopPart from 'components/Home/TopPart'
import { getArticleById } from '../api/article'

export default {
  data() {
    return {
      article: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      console.log(this.$route.params.id)
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
    //收藏
    addArticle() {

    }
  },
  components: {
    TopPart
  }
}
</script>

<style lang="stylus" scoped>
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
    margin 10px 0
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
    margin 25px 0
    border 1px solid #f1f1f1
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