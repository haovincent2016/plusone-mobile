<template>
  <!-- 粘性头部 -->
  <div :style="{height:height+'px', zIndex:zIndex}">
    <div
      :class="className"
      :style="{top:(isSticky ? stickyTop+'px' : ''), zIndex:zIndex, position:position, width:width, height:height+'px'}"
    >
      <slot>
      </slot>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    //sticky头部距离顶部距离
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      //用来判断是否变成sticky了，true则sticky()不再css赋值，false则handleReset()不再css赋值
      active: false,
      position: '',
      width: undefined,
      height: undefined,
      isSticky: false
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    //css赋值，使头部fixed
    sticky() {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
    },
    handleReset() {
      if (!this.active) {
        return
      }
      this.reset()
    },
    //css赋值，使头部不fixed
    reset() {
      this.position = ''
      this.width = 'auto'
      this.active = false
      this.isSticky = false
    },
    //滚动条滑动时
    handleScroll() {
      //返回元素的大小及其相对于视口的位置
      const width = this.$el.getBoundingClientRect().width
      this.width = width || 'auto'
      const offsetTop = this.$el.getBoundingClientRect().top
      //元素距离顶部距离 小于 sticky距离顶部距离
      if (offsetTop < this.stickyTop) {
        this.sticky()
        return
      }
      this.handleReset()
    },
    //尺寸变化时，头部宽度也变化
    handleResize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operation {
  background-color: #f5f5f5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  padding-right: 10px;
}
</style>