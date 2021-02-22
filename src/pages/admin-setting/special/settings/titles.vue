<template>
<!-- 新闻设置编辑器 -->
  <div>
    <el-form v-for="item in newsData.contents" :key="item.id" label-width="80px">
      <!-- 新闻链接 -->
      <el-form-item label="新闻链接">
        <el-input v-model="item.link" placeholder="请填写新闻链接" clearable></el-input>
      </el-form-item>
      <!-- 新闻标题 -->
      <el-form-item label="新闻标题">
        <el-input v-model="item.title" placeholder="请填写新闻链接" clearable></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button type="" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Titles',
  props: ['data'],
  data() {
    return {
      newsData: {},
    }
  },
  mounted() {
    //console.log(this.data)
    this.newsData = this.data
  },
  methods: {
    reset() {
      console.log("重置")
      //恢复原始数据
      this.$set(this.newsData, 'contents', [
        {title: '拜登总统就任典礼签署17项行政命令，留学生移民迎来新时代...', link: 'https://mp.weixin.qq.com/s/j3Tvn7lZuAwexgTf4oUUng'},
        {title: '拜登欢迎留学生：博士直接拿绿卡，扩大就业签证配额...', link: 'https://mp.weixin.qq.com/s/9YYTOtWiHTVsIEE962xbqQ'}
      ])
    }
  }
}
</script>

<style>

</style>