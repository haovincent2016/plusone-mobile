<template>
  <div class="video">
    <div style="text-align:center">
    <iframe v-if="link" frameborder="0" :style="videoStyle" :src="link" allowFullScreen="true"></iframe>
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
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.link = this.data.link
    this.videoStyle = this.data.videoStyle
  },
  methods: {
    reload() {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>