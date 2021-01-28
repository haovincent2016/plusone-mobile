<template>
  <div :class="{'hasLogo' : 'isLogoView'}">
    <logo v-if="isLogoView" :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :background-color="menuBg"
        :text-color="menuText"
        :unique-opened="false"
        :active-text-color="menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>
        </el-submenu>
        <el-menu-item index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">普通用户</el-menu-item>
            <el-menu-item index="2-2">管理员</el-menu-item>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">文章列表</el-menu-item>
            <el-menu-item index="3-2">收藏夹列表</el-menu-item>
            <el-menu-item index="3-3">文章创作</el-menu-item>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>打卡管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">打卡列表</el-menu-item>
            <el-menu-item index="4-2">打卡设置</el-menu-item>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item index="5">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>其他设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">设置一</el-menu-item>
            <el-menu-item index="5-2">设置二</el-menu-item>
          </el-menu-item-group>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Logo from './Logo'

export default {
  data() {
    return {
      activeMenu: 1
    }
  },
  computed: {
    ...mapState({
      isLogoView: state => state.isLogoView,
      isCollapse: state => state.sideMenu.opened
    })
  },
  components: {
    Logo
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/css/variable"
</style>