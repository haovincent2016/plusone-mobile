<template>
  <!-- 主页布局拖拽式设置 -->
  <!-- https://github.com/wsydxiangwang/Visualization-Page -->
  <!-- 中间view, 右侧传入view，右侧修改view，双向绑定-->
  <div class="special-wrapper">
    <div class="left-content">
      <div 
        class="content-wrapper"
        @dragstart="dragStart"
        @dragend="dragEnd">
        <div 
          class="content-item"
          v-for="(val, key, index) in typeList"
          draggable 
          :data-type="key"
          :key="index + 1">
          <span :class="val.icon"></span>
          <p>{{val.name}}</p>
        </div>
      </div>
    </div>
    <div class="center-content">
      <!-- 固定头部 -->
      <div class="center-header" @click="selectType(0)">
        <img src="/static/img/navbar.png">
        <span class="header-title">{{ info.title }}</span>
      </div>
      <!-- 可删内容 -->
      <div class="center-body">
        <div 
          class="view-content"
          @drop="drop"
          @dragover="dragOver"
          :style="{ backgroundColor: info.backgroundColor }">
          <Draggable
            v-model="view"
            draggable=".item">
            <template v-for="(item, index) in view">
              <div
                v-if="index > 0"
                :data-index="index"
                :key="index"
                class="item"
                @click="selectType(index)">
                  <!-- waiting -->
                  <template v-if="item.status && item.status == 2">
                    <div class="wait" v-if="item.type == 'nav'">头部组件</div>
                    <div class="wait" v-if="item.type == 'banner'">轮播图组件</div>
                  </template>
                  <template v-else>
                    <component 
                      :is="typeList[item.type]['com']" 
                      :data="item"
                      :class="className[item.tabType]">
                    </component>
                  </template>
                  <i @click="deleteItem($event, index)" class="el-icon-error"></i>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
    </div>
    <div class="right-content">
      <Editor
        :data="props"
        v-if="showRight"
      ></Editor>
    </div>
    <div class="submit-btn">
      <el-button @click="uploadData" type="primary" plain round>保存</el-button>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Banner from './banner'
import Editor from './editor'
import Images from "./images"
import Nav from "./nav"
export default {
  data() {
    return {
      index: null,
      view: [
        {
          type: 'nav',
          title: '标题'
        }
      ],
      //类型（左侧）
      typeList: {
        banner: {
          name: '轮播图',
          icon: 'el-icon-picture',
          com: 'Banner'
        }
      },
      //向表单传值（右侧）
      props: {},
      //显示右侧组件
      showRight: false,
      //拖拽的组件类型（左侧）
      type: null,
      //组件是否已添加到（中间）
      isAdded: false,
      className: {
        1: 'one',
        2: 'two',
        3: 'three'
      }
    }
  },
  computed: {
    info() {
      return this.view[0]
    }
  },
  methods: {
    uploadData() {
      console.log(this.view)
    },
    //开始拖拽
    dragStart(e) {
      this.type = e.target.dataset.type
    },
    //结束拖拽
    dragEnd(e) {
      this.$delete(this.view[this.index], 'status')
      this.isAdded = false
      this.type = null
    },
    //放到指定位置
    drop(e) {
      if (!this.type) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      this.dragEnd(e)
    },
    //到达指定位置
    dragOver(e) {
      if (!this.type) { 
        return
      }
      e.preventDefault()
      e.stopPropagation()

      let className = e.target.className
      let name = className !== 'view-content' ? 'item' : 'view-content'
      const defaultData = {
        type: this.type,    // 组件类型
        status: 2,          // 默认状态
        data: [],           // 数据
        options: {}         // 选项操作
      }
      if (name == 'view-content') {
        //父组件容器
        if (!this.isAdded) {
          this.index = this.view.length
          this.isAdded = true
          this.view.push(defaultData)
        }
      } else if (name == 'item') {
        //子组件
        let target = e.target
        let [ y, h, curIndex ] = [ e.offsetY, target.offsetHeight, target.dataset.index ]
        let direction = y < (h / 2)

        if (!this.isAdded) {
          //放到子组件上部还是下部
          if (direction) {
            if (curIndex == 0) {
                this.view.unshift(defaultData)
            } else {
                this.view.splice(curIndex, 0, defaultData)
            }
          } else {
            curIndex = +curIndex + 1
            this.view.splice(curIndex, 0, defaultData)
          }
        } else {
          //移动
          if (direction) {
            var i = curIndex == 0 ? 0 : curIndex - 1
            var result = this.view[i]['status'] == 2
          } else {
            var i = +curIndex + 1
            var result = this.view.length > i && this.view[i]['status'] == 2
          }

          if (result) return

          const temp = this.view.splice(this.index, 1)
          this.view.splice(curIndex, 0, temp[0])
        }
        this.index = curIndex
        this.isAdded = true
      }

    },
    //切换视图（右侧）
    selectType(index) {
      this.showRight = false
      this.props = this.view[index]
      this.$nextTick(() => {
        this.showRight = true
      })
    },
    //删除组件（中间）
    deleteItem(e, index) {
      e.preventDefault()
      e.stopPropagation()
      this.view.splice(index, 1)
      this.props = {}
      this.showRight = false
    }
  },
  components: {
    Draggable,
    //轮播图显示组件
    Banner,
    //总编辑组件
    Editor,
    //轮播图编辑组件
    Images,
    //头部编辑组件
    Nav
  }
}
</script>

<style lang="scss" scoped>
.special-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #f7f8f9;
  position: relative;
  .left-content, .right-content {
    width: 300px;
    padding: 15px 0;
    background: #fff;
    margin: 0 5px;
  }
  .left-content {
    .content-wrapper {
      .content-item {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: default;
        list-style: none;
        font-size: 14px;
        color: #666;
        float: left;
        margin: 0 10px;
        border-radius: 6px;
        transition: all .3s;
        cursor: pointer;
        &:hover{
          background: #efefef;
        }
        span{
          display: block;
          font-size: 40px;
          margin-bottom: 8px;
          color: #999;
        }
        p{
          display: block;
          margin: 0;
          font-size: 12px;
        }
      }
    } 
  }
  .center-content {
    width: auto;
    max-width: 400px;
    position: relative;
    .center-header {
      position: absolute;
      top: 0;
      background: #fff;
      z-index: 7;
      transition: all .3s;
      & * {
        pointer-events: none;
      }
      &:hover {
        transform: scale(0.95);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px #afafaf;
      }
      .header-title {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
      }
      img {
        max-width: 100%;
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor;
      }
    }
    .center-body {
      .view-content {
        width: 400px;
        height: 700px;
        background: #f5f5f5;
        overflow-y: auto;
        overflow-x: hidden;
        padding-top: 72px;
        box-shadow: 0 2px 6px #ccc;
        &::-webkit-scrollbar{
          width: 6px;
        }
        &::-webkit-scrollbar-thumb{
          background: #dbdbdb;
        }
        &::-webkit-scrollbar-track{
          background: #f6f6f6;
        }
        
        .item{
          transition: all .3s;
          background: #fff;
          &:hover{
            transform: scale(0.95);
            border-radius: 10px;
            box-shadow: 0 0 10px #afafaf;
            .el-icon-error{
              display: block;
            }
          }
          div{
            pointer-events: none;
          }
          .wait{
            background: #e8f0fa;
            height: 35px;
            text-align: center;
            line-height: 35px;
            font-size: 12px;
            color: #666;
          }
          .el-icon-error{
            position: absolute;
            right: -10px;
            top: -6px;
            color: red;
            font-size: 25px;
            cursor: pointer;
            display: none;
            z-index: 8;
          }
        }
      }
    }
  }    
  .submit-btn{
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>