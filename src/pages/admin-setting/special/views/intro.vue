<template>
  <div class="intro-container">
    <p v-for="item in intros.contents" :key="item.id" style="font-size:14px;">{{ item }}</p>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  props: ['data'],
  data() {
    return {
      intros: {}
    }
  },
  updated() {
    this.intros = this.data
  },
  mounted() {
    this.intros = this.data
  }
}
</script>

<style lang="scss" scoped>
  .intro-container {
    text-align: center;
    padding: 5px 0;
  }
</style>