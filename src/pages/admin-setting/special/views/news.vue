<template>
  <div class="news-container">
    <van-notice-bar
      v-for="item in list.contents" :key="item.id"
      left-icon="info-o"
      color="#1989fa" 
      background="#f4f4f4"
      mode="link"
      :scrollable="false">
        <a
          style="text-decoration:none;color:#1989fa;" 
          :href="item.link" target="_blank">{{ item.title }}</a>
    </van-notice-bar>
  </div>
</template>

<script>
export default {
  name: 'News',
  props: ['data'],
  data() {
    return {
      list: {}
    }
  },
  updated() {
    this.list = this.data
  },
  mounted() {
    this.list = this.data
  }
}
</script>

<style lang="scss" scoped>
.news-container {
  padding: 5px;
}
</style>