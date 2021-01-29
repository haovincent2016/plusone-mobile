<template>
  <div class="content-wrapper">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedView">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    cachedView() {
      return this.$store.state.cachedView
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixedTop+.content-wrapper {
  padding-top: 50px;
}

.hasTags {
  .content-wrapper {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixedTop+.content-wrapper {
    padding-top: 84px;
  }
}
</style>
