<template>
  <div class="wrapper">
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchForm" class="search-container" label-width="55px">
      <el-form-item label="设置名">
        <el-input v-model="searchForm.title" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getTableList" type="primary" round icon="el-icon-search">查询</el-button>
        <el-button @click="resetSearch" round icon="el-icon-refresh-right">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作区 -->
    <el-row :gutter="10" class="operation-row">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="createSetting"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="selectedData.length === 0"
          @click="batchDelete"
        >批量删除</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableList"
      border
      v-loading="tableListLoading"
      @selection-change="handleSelectionChange"
      style="width:100%;"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="title"
        label="设置名"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="content"
        label="包含组件"
        header-align="center"
        align="center"
        width="400">
        <template slot-scope="scope">
          <el-tag v-for="item in JSON.parse(scope.row.content)" :key="item.id" class="tag-space">{{ item | getName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <!-- 跳转文章页 -->
          <el-button plain icon="el-icon-edit" size="mini" @click="editSetting(scope.row.id)">编辑</el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="deleteSetting(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTableList" />
  </div>
</template>

<script>
import { getAllSettingsB, deleteSettingB } from '@/api/admin'
export default {
  data() {
    return {
      searchForm: {
        //搜索设置名
        title: undefined
      },
      tableList: [],
      tableListLoading: false,
      //选择的数据
      selectedData: [],
      //分页参数
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      //总数
      total: 0
    }
  },
  filters: {
    getName: function(val) {
      switch (val.type) {
        case 'nav':
          return '轮播图'

        case 'video':
          return '视频'

        case 'course':
          return '内容'

        case 'news':
          return '新闻'
      }
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      getAllSettingsB().then(res => {
        if(res.data.code == 0) {
          this.$message.success(res.data.desc)
          this.tableList = JSON.parse(res.data.content)
        }
      }).catch(err => {
        this.$message.error(res.data.desc)
      })
    },
    resetSearch() {

    },
    createSetting() {
      this.$router.push({ path: '/admin-setting/create' })
    },
    batchDelete() {

    },
    editSetting(id) {
      this.$router.push({ path: '/admin-setting/edit/'+id })
    },
    deleteSetting(id) {
      this.$confirm('确定删除该设置？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSettingB({ id: id }).then(res => {
            if(res.data.code == 0) {
              this.$message.success(res.data.desc)
            }
          }).catch(err => {
            this.$message.error(res.data.desc)
          })
        }).catch(err => {
          
        })
    },
    //数据多选
    handleSelectionChange(val) {
      this.selectedData = val
    },
  }
}
</script>

<style lang="scss" scoped>
.tag-space {
  margin: 0 5px;
}
.wrapper {
  padding: 10px;
}
.operation-row {
  margin-bottom: 25px;
}
</style>