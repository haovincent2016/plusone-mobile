<template>
  <div class="container" :class="classObj">
    <!-- 手机打开侧边栏显示drawer背景 -->
    <div v-if="device === 'mobile' && sideMenu.opened" class="drawer"></div>
    <!-- 左菜单 -->
    <side-menu class="sidemenu-container" />
    <!-- 顶部导航栏是否带有Breadcrumb -->
    <div :class="{hasTags : isTagsView}" class="main-container">
      <!-- 是否固定顶部导航栏 -->
      <div :class="{fixedTop : isFixedView}">
        <!-- 顶部导航栏 -->
        <navbar />
        <!-- Breadcrumb，待做 -->
        <tags v-if="isTagsView" />
      </div>
      <!-- 主内容部分 -->
      <main-content />
      <!-- 右设置 -->
      <!-- <setting /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SideMenu from './components/SideMenu'
import Navbar from './components/Navbar'
import MainContent from './components/MainContent'
import Tags from './components/Tags'

export default {
  computed: {
    ...mapState({
      sideMenu: state => state.sideMenu,
      device: state => state.device,
      isTagsView: state => state.isTagsView,
      isFixedView: state => state.isFixedView
    }),
    classObj() {
      return {
        hideMenu: !this.sideMenu.opened,
        openMenu: this.sideMenu.opened,
        mobile: this.device === 'mobile'
      }
    }
  },
  components: {
    SideMenu,
    Navbar,
    Tags,
    MainContent,
    // Setting
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/css/mixin.scss";
  @import "~assets/css/variables.scss";

  .container {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openMenu {
      position: fixed;
      top: 0;
    }
  }

  .drawer {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixedTop {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideMenuWidth});
    transition: width 0.28s;
  }

  .hideMenu .fixedTop {
    width: calc(100% - 54px)
  }

  .mobile .fixedTop {
    width: 100%;
  }
</style>