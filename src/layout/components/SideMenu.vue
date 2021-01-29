<template>
  <div :class="{'hasLogo' : 'isLogoView'}">
    <logo v-if="isLogoView" :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-menu-item index="1" class="submenu-title-noDropdown">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">普通用户</el-menu-item>
            <el-menu-item index="2-2">管理员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">文章列表</el-menu-item>
            <el-menu-item index="3-2">收藏夹列表</el-menu-item>
            <el-menu-item index="3-3">文章创作</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>打卡管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">打卡列表</el-menu-item>
            <el-menu-item index="4-2">打卡设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>其他设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">设置一</el-menu-item>
            <el-menu-item index="5-2">设置二</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
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
      activeMenu: '1'
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