<template>
  <div :class="{'hasLogo' : isLogoView}">
    <logo v-if="isLogoView" :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        :router="true"
        mode="vertical"
      >
        <el-menu-item index="/admin/dashboard" class="submenu-title-noDropdown">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="/admin-user">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin-user/user">普通用户</el-menu-item>
            <!-- <el-menu-item index="/admin-user/operator">管理员</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/admin-article">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin-article/article">文章列表</el-menu-item>
            <!-- <el-menu-item index="/admin-article/write">文章创作</el-menu-item> -->
            <el-menu-item index="/admin-article/collection">收藏夹列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/admin-task">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>打卡管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin-task/task">打卡列表</el-menu-item>
            <el-menu-item index="/admin-task/setting">打卡设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/admin-assets">
          <template slot="title">
            <i class="el-icon-picture-outline"></i>
            <span>资源管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin-assets/list">资源管理</el-menu-item>
            <el-menu-item index="/admin-assets/upload">资源上传</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/admin-tests">
          <template slot="title">
            <i class="el-icon-trophy"></i>
            <span>测试管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin-tests/grade">成绩管理</el-menu-item>
            <el-menu-item index="/admin-tests/list">测试管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/admin-setting">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>网站设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin-setting/common">常规设置</el-menu-item>
            <el-menu-item index="/admin-setting/special-list">主页设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="/admin-messages">
          <template slot="title">
            <i class="el-icon-chat-dot-square"></i>
            <span>消息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin-messages/list">消息列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Logo from './Logo'
import variables from '../../../assets/css/variables.scss'

export default {
  computed: {
    ...mapState({
      isLogoView: state => state.isLogoView,
      isCollapse: state => state.sideMenu.opened
    }),
    variables() {
      return variables
    },
    activeMenu() {
      const route = this.$route
      const { path } = route
      return path
    }
  },
  components: {
    Logo
  }
}
</script>