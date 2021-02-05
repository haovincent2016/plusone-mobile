<template>
  <div class="video">
    <div style="text-align:center">
    <iframe frameborder="0" :style="videoStyle" :src="link" allowFullScreen="true"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contents',
  props: ['data'],
  data() {
    return {
      link: '',
      videoStyle: ''
    }
  },
  mounted() {
    this.link = this.data.link
    this.videoStyle = this.data.videoStyle
  }
}
</script>

<style lang="scss" scoped>

</style>