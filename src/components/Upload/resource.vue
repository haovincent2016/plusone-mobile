<template>
 <!-- 选择网站资源上传dialog -->
  <el-dialog
    title="选择资源"
    :visible="visible"
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
                @click="allCheck">
                全选
              </el-button>

              <el-button 
                plain
                icon="el-icon-minus"
                size="mini"
                @click="reverseCheck">
                反选
              </el-button>

              <el-button 
                plain
                icon="el-icon-refresh-left"
                size="mini"
                @click="cancelCheck">
                取消
              </el-button>
            </el-button-group>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              placeholder="输入资源名搜索"
              @keyup.enter.native="handleSearch()"
              clearable
              size="small"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="handleSearch"
              ></el-button>
            </el-input>
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
        <a style="cursor: pointer;" @click="switchDirectory(0)">资源管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in naviData" :key="item.storage_id">
        <a style="cursor: pointer;" @click="switchDirectory(item.storage_id)">{{ item.name }}</a>
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
                  :label="item.type"
                  class="check"
                  >&nbsp;</el-checkbox>
                <el-image
                  fit="fill"
                  :src="item.link"
                  @click.native="handleOpen(index)"
                  lazy
                />
              </div>
              <el-tooltip
                placement="top"
                :enterable="false"
                :open-delay="300"
              >
                <div slot="content">
                  <span>名称：{{ item.name }}</span><br />
                  <!-- <span v-if="item.type === 0" >尺寸：{{`${item.pixel["width"]},${item.pixel["height"]}`}}</span> -->
                  <span>类型：<i :class="item.type || getFileTypeIcon" /></span>
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
      <el-button type="primary" @click="handleConfirm">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getFilesB } from '@/api/files'
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
      naviData: [],
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
    //0-图片，1-文件，2-文件夹，3-视频，4-其他
    getFileTypeIcon(val) {
      switch (val) {
        case 0:
          return 'el-icon-picture-outline'

        case 1:
          return 'el-icon-document'

        case 2:
          return 'el-icon-folder'

        case 3:
          return 'el-icon-video-camera'

        default:
          return 'el-icon-warning-outline'
      }
    }
    
  },
  methods: {
    //获取资源数据
    getTableList() {
      getFilesB().then(res => {
        let list = []
        res.data.content.forEach(item => {
          let type = this.checkType(item.link)
          list.push({name: item.name, link: this.fileUrl+item.link.slice(7), type: type})
        })
        this.tableData = list
        console.log(res)
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    checkType(link) {
      let i = link.lastIndexOf('.')
      if(i !== -1) {
        //item.link.substr(i+1)
        console.log('111')
        return 0
      } else {
        return 2
      }

    },
    //打开dialog
    openDialog() {
      this.visible = true
      this.getTableList()
    },
    //搜索
    handleSearch() {

    },
    //全选
    allCheck() {

    },
    //反选
    reverseCheck() {

    },
    //取消选择
    cancelCheck() {

    },
    //切换文件夹
    switchDirectory() {

    },
    //打开图片
    handleOpen() {

    },
    //确认
    handleConfirm() {

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
</style>