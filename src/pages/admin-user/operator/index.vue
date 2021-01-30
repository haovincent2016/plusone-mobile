<template>
<div class="wrapper">
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchForm" class="search-container" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="searchForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="searchForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户电话">
        <el-input v-model="searchForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="searchForm.type" placeholder="请选择用户类型">
          <el-option label="普通用户" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="帐号状态">
        <el-select v-model="searchForm.type" placeholder="请选择帐号状态">
          <el-option label="正常" :value="true"></el-option>
          <el-option label="封禁" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getTableList()" type="primary" plain round icon="el-icon-search">查询</el-button>
        <el-button @click="batchDelete()" type="danger" plain round icon="el-icon-delete">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单区 -->
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
        prop="username"
        label="用户名"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="用户头像"
        header-align="center"
        align="center"
        width="150">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="avatar" />
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="用户类型"
        header-align="center"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type === 'user'">普通用户</el-tag>
          <el-tag type="success" v-if="scope.row.type === 'admin'">管理员</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="帐号状态"
        header-align="center"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status">正常</el-tag>
          <el-tag type="danger" v-if="!scope.row.status">封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="points"
        label="打卡积分"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="days"
        label="签到天数"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="description"
        label="用户描述"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建日期"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新日期"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-button plain icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button plain icon="el-icon-edit" size="mini">监控</el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTableList" />
</div>
</template>

<script>
import { getAdminUsers } from '@/api/admin'
import Pagination from '@/components/Common/Pagination'

export default {
  data() {
    return {
      searchForm: {},
      tableList: null,
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
    convertTime: function(val) {
      return new Date(val).toLocaleDateString()
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    convertTime(val) {
      return new Date(val).toLocaleDateString()
    },
    //获取表单数据
    getTableList() {
      this.tableListLoading = true
      let data = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      getAdminUsers(data).then(res => {
        if(res.data.code === '0') {
          this.$message.success(res.data.desc)
          this.tableList = JSON.parse(res.data.users)
          this.total = res.data.count
          this.tableList.forEach(item => {
            item.createdAt = this.convertTime(item.createdAt)
            item.updatedAt = this.convertTime(item.updatedAt)
          })
        } else {
          this.$message.error(res.data.desc)
        }
        this.tableListLoading = false
      }).catch(err => {
        this.$message.error(res.data.desc)
        this.tableListLoading = false
      })
    },
    //批量删除数据
    batchDelete() {

    },
    //数据多选
    handleSelectionChange(val) {
      this.selectedData = val
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px;
}
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 4px;
}
</style>