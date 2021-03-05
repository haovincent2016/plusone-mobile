<template>
  <div class="separator-container">
    <van-divider
      :style="{ color: customStyle.color, borderColor: customStyle.borderColor, paddingLeft: customStyle.paddingLeft+'px', paddingRight: customStyle.paddingRight+'px' }"
    >
      <van-icon class="icon-style" :name="customStyle.icon" :color="customStyle.iconColor" />
      {{ customStyle.name }}
    </van-divider>  
  </div>
</template>

<script>
export default {
  name: 'Separator',
  props: ['data'],
  data() {
    return {
      customStyle: {}
    }
  },
  updated() {
    this.customStyle = this.data
  },
  mounted() {
    this.customStyle = this.data
  }
}
</script>

<style lang="scss" scoped>
.separator-container {
  padding: 2px 0;
}
</style>