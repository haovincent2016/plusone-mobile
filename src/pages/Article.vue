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
        size="small" 
        plain
        @click="likeArticle">
        点赞 {{ article.like }}
      </van-button>
      <van-button 
        icon="star-o" 
        class="like" 
        color="#ff9900"
        size="small" 
        plain
        @click="addArticle">
        收藏
      </van-button>
      <div class="view">浏览量 {{ article.view}}</div>
      <van-popup 
        v-model="show" 
        position="bottom" 
        :style="{ height: '40%' }" 
        closeable
        close-icon="close"
        round>
        <div class="col-wrapper">
          <van-cell 
            v-for="(item, index) in collections" 
            :key="item.id" 
            size="large" 
            :label="item.description">
            <template #title>
              <span class="col-title">{{ item.title }}</span>
              <van-tag plain :type="item.public ? 'primary' : 'warning'">{{ item.public | typeText }}</van-tag>
            </template>
            <template #default>
              <van-button 
                v-if="status[index]"
                plain 
                hairline 
                disabled
                type="default" 
                size="small">已添加</van-button>
              <van-button
                v-else
                plain 
                hairline 
                type="info" 
                size="small"
                @click="addToCollection(item)">添加</van-button>
            </template>
          </van-cell>
        </div>
        <div class="add-btn">
          <van-button
            icon="plus"
            type="primary" 
            round 
            @click="openModel">新建收藏夹</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 新建收藏夹 -->
    <van-dialog v-model="showModel" title="新建收藏夹" :show-confirm-button="false">
      <van-form @submit="onSubmit" @fail="onFailed">
        <van-field
          v-model="title"
          name="title"
          label="收藏夹名"
          clearable
          :rules="[{ required: true, message: '请填写收藏夹名' }]"
        />
        <van-field
          v-model="description"
          name="description"
          label="收藏夹描述"
          clearable
        />
        <van-field name="radio" label="是否公开">
          <template #input>
            <van-radio-group v-model="isPublic" direction="horizontal">
              <van-radio :name="true">公开</van-radio>
              <van-radio :name="false">私有</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="text-align:center;margin:15px">
          <van-button type="info" icon="plus" round native-type="submit">新建</van-button>
          <van-button type="default" icon="revoke" round @click="showModel=false">取消</van-button>
        </div>
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopPart from 'components/Home/TopPart'
import { getArticleById } from '@/api/article'
import { getCollectionsByOwner, addToCollectionB, collectionHasArticleB, createCollectionB } from '@/api/collection'

export default {
  data() {
    return {
      //显示收藏夹列表
      show: false,
      //显示新建表单
      showModel: false,
      //文章
      article: {},
      //用户收藏夹
      collections: [],
      //文章收藏状态
      status: [],
      title: '',
      description: '暂无描述~',
      isPublic: true
    }
  },
  computed: mapState([ 'userInfo' ]),
  filters: {
    typeText: function(val) {
      if(!val) {
        return '私有'
      } else {
        return '公开'
      }
    }
  },
  mounted() {
    this.getData()
    this.getCollections()
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
    //获取收藏夹
    getCollections() {
      getCollectionsByOwner({ author: this.userInfo.id }).then(res => {
        if(res.data.code === '0') {
          this.collections = JSON.parse(res.data.collections)
          this.hasArticle()
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
    //查询文章是否已在收藏夹
    hasArticle() {
      this.status = []
      this.collections.forEach(item => {
        collectionHasArticleB({ collectionId: item.id, articleId: this.article.id }).then(res => {
          if(res.data.code === '0') {
            this.status.push(res.data.detail)
          }
        }).catch(err => {
          this.$toast.fail(res.data.desc)
        })
      })
      console.log(this.status)
    },
    //加入收藏夹
    addToCollection(item) {
      addToCollectionB({ collectionId: item.id, articleId: this.article.id }).then(res => {
        if(res.data.code === '0') {
          this.$toast.success(res.data.desc)
        }
      }).catch(err => {
        this.$toast.fail(res.data.desc)
      })
    },
    openModel() {
      this.show = false
      this.showModel = true
    },
    onSubmit() {
      //新建收藏夹
      createCollectionB({
        title: this.title,
        description: this.description,
        isPublic: this.isPublic,
        ownerId: this.userInfo.id
      }).then(res => {
        if(res.data.code === '0') {
          this.$toast.success(res.data.desc)
          this.getCollections()
          this.showModel = false
          this.show = true
        }
      }).catch(err => {
        this.$toast.fail(res.data.desc)
      })
    },
    onFailed() {
      this.$toast.fail('新建失败，请稍后重试~')
    },
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
.van-cell__label
  height 18px
  overflow-y auto
</style>
<style lang="stylus" scoped>
.col-wrapper
  margin-top 35px
  height 190px
  overflow-y auto
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
  .article-footer
    display flex
    justify-content flex-start
    align-items center
    .like
      font-size 15px
      margin-right 8px
    .view
      font-size 15px
      color #aaa
</style>