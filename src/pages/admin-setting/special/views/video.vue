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
  watch: {
    data: {
      handler(val){
        console.log(val)
        this.reload()
      },
      deep: true
    }
  },
  created() {
    this.link = this.data.link
    this.videoStyle = this.data.videoStyle
  },
  updated() {
    this.link = this.data.link
    this.videoStyle = this.data.videoStyle
  },
  methods: {
    reload() {
      //console.log('改变了')
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>