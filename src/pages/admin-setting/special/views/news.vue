<template>
  <div class="news-container">
    <div v-for="item in list.contents" :key="item.id"> 
      <a
        style="text-decoration:none;color:#1989fa;" 
        :href="item.link" target="_blank">{{ item.title }}</a>
    </div>
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