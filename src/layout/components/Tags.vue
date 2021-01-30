<template>
  <div id="tags-view-container" class="tags-view-container">
    <router-link
      v-for="tag in visitedView"
      ref="tag"
      :key="tag.path"
      :class="isActive(tag)?'active':''"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      tag="span"
      class="tags-view-item"
      @click.middle.native="!isAffix(tag)? closeSelectedTag(tag) : ''"
      @contextmenu.prevent.native="openMenu(tag, $event)"
    >
      {{ tag.title }}
      <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
    </router-link>
    <!-- 右键tag出现操作菜单 -->
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <!-- <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li> -->
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭当前</li>
      <!-- <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags(selectedTag)">{{ $t('tagsView.closeAll') }}</li> -->
    </ul>
  </div>
</template>

<script>
import path from 'path'

export default {
  data() {
    return {
      visible: false,
      //当前tag
      selectedTag: {},
      //不可关闭tag
      affixTags: [],
      //菜单位置
      top: 0,
      left: 0,
    }
  },
  watch: {
    //浏览新页面，添加tag, 高亮tag
    $route() {
      this.addTag()
      //this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  computed: {
    visitedView() {
      return this.$store.state.visitedView
    },
    routes() {
      return this.$store.state.routes
    }
  },
  mounted() {
    //初始化tag
    this.initTags()
    this.addTag()
  },
  methods: {
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          console.log(route)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    // 初始化tags，只包含不可关闭tag
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        if (tag.name) {
          this.$store.dispatch('addView', tag)
        }
      }
    },
    //浏览新页面，添加tag
    addTag() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
      return false
    },
    //高亮当前页
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    //是否为当前路径
    isActive(route) {
      return route.path === this.$route.path
    },
    //是否为不可删除的tag
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    //关闭tag，去上一个tag页面
    toLastView(visitedView) {
      const latestView = visitedView.slice(-1)[0]
      console.log(latestView)
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        this.$router.replace({ path: '/admin/dashboard' })
      }
    },
    //关闭tag
    closeSelectedTag(view) {
      this.$store.dispatch('delView', view).then(({ visitedView }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedView)
        }
      })
    },
    //右键打开菜单
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    //关闭菜单
    closeMenu() {
      this.visible = false
    },
  }
}
</script>

<style lang="scss" scoped>
 @import "~assets/css/variables.scss";

.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: $tagColor;
      color: #fff;
      border-color: $tagColor;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-container {
  .tags-view-item {
    .el-icon-close {
      width: 17px;
      height: 17px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b7c5e0;
        color: #fff;
      }
    }
  }
}
</style>