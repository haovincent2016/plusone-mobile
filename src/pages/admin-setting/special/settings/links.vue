<template>
<!-- 视频设置编辑器 -->
<!-- 目前问题：更新链接后显示不刷新 -->
  <div class="video-content">
    <el-form label-width="80px">
      <el-form-item label="视频链接">
        <el-input v-model="videoData.link" placeholder="iframe链接，链接中有iframe" clearable></el-input>
      </el-form-item>
       <el-form-item style="text-align:center;">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button type="" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <iframe frameborder="0" :style="result.videoStyle" :src="result.link" allowFullScreen="true"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Links',
  props: ['data', 'className'],
  data() {
    return {
      videoData: {},
      result: {
        link: 'https://player.youku.com/embed/XNTA5NzE0MDUzNg==',
        videoStyle: 'width:100%;height:310px;'
      }
    }
  },
  mounted() {
    this.videoData = this.data
  },
  methods: {
    confirm() {
      this.result = this.videoData
    },
    cancel() {
      //恢复原始数据
      this.videoData = {
        link: 'https://player.youku.com/embed/XNTA5NzE0MDUzNg==',
        videoStyle: 'width:100%;height:310px;'
      }
    }
  }
}
</script>

<style lang="scss" coped>
video-content {
  padding: 20px;
}
</style>