<template>
<!-- 选择网站资源上传dialog -->
  <el-dialog
    title="选择资源"
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="700px">
    <!-- 搜索框 -->
    <el-form :model="form" size="small" @submit.native.prevent>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item>
            <el-button-group>
              <el-button 
                plain
                icon="el-icon-plus"
                size="mini"
                @click="allCheck()">
                全选
              </el-button>

              <el-button 
                plain
                icon="el-icon-minus"
                size="mini"
                @click="reverseCheck()">
                反选
              </el-button>

              <el-button 
                plain
                icon="el-icon-refresh-left"
                size="mini"
                @click="cancelCheck()">
                取消
              </el-button>
            </el-button-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              placeholder="输入资源名搜索"
              @keyup.enter.native="handleSearch()"
              @clear="resetSearch()"
              clearable
              size="small"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button @click="handleSearch()" type="primary" round icon="el-icon-search">搜索</el-button>
            <el-button @click="resetSearch()" round icon="el-icon-refresh-right">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 面包屑开始 -->
    <el-breadcrumb
      class="breadcrumb cs-mb"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item>
        <a style="cursor: pointer;" @click="switchDirectory()">资源管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a style="cursor: pointer;" @click="switchDirectory('/'+naviData)">{{ naviData }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 资源列表开始 -->
    <el-checkbox-group v-model="checkList">
      <ul class="storage-list" v-loading="loading">
        <li v-for="(item, index) in tableData" :key="index">
          <dl class="pic-item">
            <dt>
              <div class="picture cs-m-5">
                <el-checkbox
                  v-if="item.type !== 2"
                  v-model="checkList"
                  :label="item.name"
                  class="check"
                  >&nbsp;</el-checkbox>
                <el-image
                  v-if="item.type === 0"
                  fit="fill"
                  :src="item.link"
                  @click.native="handleOpen(item)"
                  lazy
                />
                <div 
                  v-else
                  class="icon-wrapper" 
                  @click="handleOpen(item)">
                  <i style="font-size:30px;color:#ccc;" :class="item.type | getFileTypeIcon"></i>
                </div>
              </div>
              <el-tooltip
                placement="top"
                :enterable="false"
                :open-delay="300"
              >
                <div slot="content">
                  <span>名称：{{ item.name }}</span><br />
                  <!-- <span v-if="item.type === 0" >尺寸：{{`${item.pixel["width"]},${item.pixel["height"]}`}}</span> -->
                  <span>类型：<i :class="item.type | getFileTypeIcon" /></span>
                </div>
                <span class="storage-name cs-ml-5">{{ item.name }}</span>
              </el-tooltip>

            </dt>
          </dl>
        </li>
      </ul>
    </el-checkbox-group>

    <!-- 翻页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTableList" />
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleConfirm()">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getFilesB } from '@/api/files'
import { union, xor, difference } from 'lodash'
import baseUrl from '@/utils/setting'

export default {
  data() {
    return {
      //是否显示dialog
      visible: false,
      //列表加载
      loading: true,
      //选择列表
      checkList: [],
      //面包屑列表
      naviData: '',
      //资源列表
      tableData: [],
      //搜索表单
      form: {
        name: ''
      },
      //分页
      //分页参数
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      total: 0
    }
  },
  computed: {
    fileUrl() {
      return baseUrl
    }
  },
  filters: {
    //0-图片，1-文件，2-文件夹，3-音频，4-视频，5-其他
    getFileTypeIcon(val) {
      switch (val) {
        case 0:
          return 'el-icon-picture-outline'

        case 1:
          return 'el-icon-document'

        case 2:
          return 'el-icon-folder'

        case 3:
          return 'el-icon-headset'

        case 4:
          return 'el-icon-video-camera'

        default:
          return 'el-icon-warning-outline'
      }
    }
    
  },
  methods: {
    //获取资源数据
    getTableList(directory='') {
      let data = { directory: directory }
      this.naviData = directory.substring(1)
      getFilesB(data).then(res => {
        let list = []
        res.data.content.forEach(item => {
          //去掉link中'/public'部分
          list.push({name: item.name, link: this.fileUrl+item.link.slice(7), type: item.type})
        })
        this.tableData = list
        //console.log(res)
        this.loading = false
      }).catch(err => {
        //console.log(err)
        this.loading = false
      })
    },
    //打开dialog
    openDialog() {
      this.visible = true
      this.getTableList()
    },
    //(本地)搜索
    handleSearch() {
      let result = []
      for(const value of this.tableData) {
        if(value.name.indexOf(this.form.name) !== -1) {
          result.push(value)
        }
      }
      this.tableData = result
    },
    //重置搜索
    resetSearch() {
      this.getTableList()
    },
    //所有资源
    getStorageList() {
      let list = []
      for(const value of this.tableData) {
        if(value.type === 2) {
          continue
        }
        list.push(value.name)
      }
      return list
    },
    //全选
    allCheck() {
      this.checkList = union(this.checkList, this.getStorageList())
    },
    //反选
    reverseCheck() {
      this.checkList = xor(this.checkList, this.getStorageList())
    },
    //取消选择
    cancelCheck() {
      this.checkList = difference(this.checkList, this.getStorageList())
    },
    //切换文件夹
    switchDirectory(directory) {
      this.getTableList(directory)
    },
    //打开目录或文件
    handleOpen(item) {
      if(item.type === 2) {
        this.switchDirectory('/'+item.name)
      } else {
        this.previewFile()
      }
    },
    //预览文件
    previewFile() {

    },
    //确认
    handleConfirm() {
      let list = []
      for(const value of this.tableData) {
        if(this.checkList.indexOf(value.name) === -1) {
          continue
        }
        list.push(value)
      }
      this.$emit('confirm', list)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
    background-color: #fff;
    border: 1px solid #DCDFE6;
    padding: 10px !important;
}
.storage-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    margin: 0;
    border-style: solid;
    border-color: #DCDFE6;
    border-width: 1px 0 0 1px;
    background-color: #fff;
}
.pic-item {
    margin: 5px;
}
.storage-list li {
    float: left;
    opacity: 1;
    border-style: solid;
    border-color: #DCDFE6;
    border-width: 0 1px 1px 0;
}
.storage-list > li:hover {
    background-color: #f8f8f9;
}
.storage-list li dl dt .picture {
    border: none;
}
.storage-list li dl dt .covers .el-image,
.storage-list li dl dt .picture .el-image {
    background-color: #f5f7fa;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    width: 80px;
    height: 80px;
    overflow: hidden;
    cursor: pointer;
}
.storage-list li:after {
    content: "";
    height: 100%;
}
.storage-list li:after,
.storage-list li span {
    display: inline-block;
    vertical-align: middle;
}
.storage-list li span {
    line-height: normal;
    color: #909399;
    transition: color 0.15s linear;
}
.storage-list .storage-name {
    color: #303133;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    width: 80px;
    height: 20px;
}
.check {
    position: absolute;
    margin: 0 0 0 2px;
    width: 78px;
    height: 80px;
    z-index: 9;
}
.el-image ::v-deep .el-image__inner {
    width: auto;
    height: auto;
    max-width: 80px;
    max-height: 80px;
}
.icon-wrapper {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>