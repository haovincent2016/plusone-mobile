<template>
<!-- 视频设置编辑器 -->
<!-- 已解决问题：更新链接后显示不刷新 -->
  <div class="video-content">
    <el-form label-width="80px">
      <!-- 视频链接 -->
      <el-form-item label="视频链接">
        <el-input v-model="videoData.link" placeholder="iframe链接，链接中有iframe" clearable></el-input>
      </el-form-item>
      <!-- 待做：视频尺寸 -->
      <el-form-item style="text-align:center;">
        <el-button type="" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <iframe frameborder="0" :style="videoData.videoStyle" :src="videoData.link" allowFullScreen="true"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Links',
  props: ['data', 'className'],
  data() {
    return {
      videoData: {},
    }
  },
  created() {
    this.videoData = this.data
  },
  methods: {
    reset() {
      //恢复原始数据
      this.$set(this.videoData, 'link', 'https://player.youku.com/embed/XNTA5NzE0MDUzNg==')
      this.$set(this.videoData, 'videoStyle', 'width:100%;height:310px;')
    }
  }
}
</script>

<style lang="scss" coped>
video-content {
  padding: 20px;
}
</style>