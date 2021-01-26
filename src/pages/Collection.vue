<template>
  <div>
    <TopPart :isLogin="false" :isFunc="true" />
    <!-- 收藏页顶部 -->
    <div class="col-header">
      <img :src="backgroundUrl" class="background" />
      <div class="wrapper">
        <img :src="avatarUrl" class="avatar" />
      </div>
      <div class="username">
        <div class="content">vincent</div>
        <van-button class="custom-btn" round type="info">编辑我的信息</van-button>
      </div>
    </div>
    <!-- 收藏页tab -->
    <div class="col-tab">
      <van-tabs v-model="active">
      <van-tab title="收藏">
        <div class="col-body">
          <div class="col-title">默认收藏夹</div>
          <div class="col-date">收藏日期：2021-01-26</div>
        </div>
      </van-tab>
      <van-tab title="热门">
        <div class="list">
          <div class="list-item">
            <div class="item-title">
              Spring Boot要如何学习？
            </div>
            <div class="item-author">
              作者：vincent
            </div>
            <div class="item-content">
               Spring Boot 是由 Pivotal 团队提供的全新框架，其设计目的是用来简化新 Spring 应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。采用 Spring Boot 可以大大的简化你的开发模式，所有你想集成的常用框架，它都…
            </div>
            <div class="item-func">
              <van-button type="info">点赞</van-button>
              <van-icon style="margin-left:8px;font-size:20px;" name="star-o" /><span style="color:#a1a1a1">收藏</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    </div>
  </div>  
</template>

<script>
import TopPart from 'components/Home/TopPart'

export default {
  data() {
    return {
      active: 0,
      backgroundUrl: require('../../static/img/bg1.png'),
      avatarUrl: require('../../static/img/vince.jpg'),
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
    .item-title
      font-size 18px
    .item-author
      margin 10px 0
      color #a1a1a1
    .item-content
      max-height 120px
      margin-bottom 10px
    .item-func
      display flex
      justify-content flex-start
      align-items center


</style>