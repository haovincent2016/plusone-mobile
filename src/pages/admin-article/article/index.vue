<template>
  <div class="wrapper">
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchForm" class="search-container" label-width="80px">
      <el-form-item label="文章名">
        <el-input v-model="searchForm.title" clearable></el-input>
      </el-form-item>
      <!-- 待做：搜索 -->
      <el-form-item label="作者">
        <el-input v-model="searchForm.authorId" clearable></el-input>
      </el-form-item>
      <!-- 待做：搜索 -->
      <el-form-item label="收藏夹">
        <el-input v-model="searchForm.colId" clearable></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="searchForm.status" placeholder="请选择用户类型" clearable>
          <el-option label="待审核" :value="1"></el-option>
          <el-option label="审核中" :value="2"></el-option>
          <el-option label="审核通过" :value="3"></el-option>
          <el-option label="审核不过" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getTableList()" type="primary" round icon="el-icon-search">查询</el-button>
        <el-button @click="resetSearch()" round icon="el-icon-refresh-right">重置</el-button>
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
          @click="createArticlePage()"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="selectedData.length === 0"
          @click="batchDelete()"
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
        label="文章名"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="user"
        label="作者"
        header-align="center"
        align="center"
        width="150">
        <template slot-scope="scope">
          <img :src="scope.row.user.avatar" class="avatar" />
          <div class="author">{{ scope.row.user.username }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="collection"
        label="收藏夹"
        header-align="center"
        align="center"
        width="150">
        <template slot-scope="scope">
          <div class="col-name">{{ scope.row.collection.title }}</div>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="picture"
        label="文章大图"
        header-align="center"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            trigger="click">
            <img :src="scope.row.picture" style="width:500px">
            <img slot="reference" :src="scope.row.picture" class="bg-img">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核状态"
        header-align="center"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.status === 1">待审核</el-tag>
          <el-tag v-if="scope.row.status === 2">审核中</el-tag>
          <el-tag type="success" v-if="scope.row.status === 3">审核通过</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 4">审核不过</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="view"
        label="浏览量"
        header-align="center"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="like"
        label="点赞数"
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
        width="200">
        <template slot-scope="scope">
          <!-- 跳转文章页 -->
          <el-button plain icon="el-icon-edit" size="mini" @click="editArticlePage(scope.row.id)">编辑</el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="deleteArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTableList" />
    <!-- 待做：审核功能 -->
  </div>
</template>

<script>
import { getArticlesB, createArticleB, editArticleB, deleteArticleB, batchDeleteArticlesB } from '@/api/admin'

export default {
  data() {
    return {
      searchForm: {
        title: undefined,
        status: undefined,
        colId: undefined,
        authorId: undefined,
      },
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
        searchForm: this.searchForm,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      getArticlesB(data).then(res => {
        if(res.data.code === '0') {
          this.$message.success(res.data.desc)
          this.tableList = JSON.parse(res.data.articles)
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
    //数据多选
    handleSelectionChange(val) {
      this.selectedData = val
      console.log(this.selectedData)
    },
    //重置搜索表单
    resetSearch() {
      this.searchForm = {
        title: undefined,
        status: undefined,
        colId: undefined,
        authorId: undefined
      }
      this.getTableList()
    },
    //重置dialog表单
    resetForm() {
      this.userForm = {
        username: '',
        password: '',
        avatar: '/static/img/avatar.jpg',
        type: 'user',
        status: true,
        points: 0,
        days: 0,
        nickname: '',
        phone: '',
        description: '此人很懒，什么也没写'
      }
    },
    //关闭dialog
    closeForm() {
      this.$refs.userForm.resetFields()
      this.dialogVisible = false
    },
    createArticleDialog() {
      this.dialogType = 'create'
      this.dialogVisible = true
      this.resetForm()
    },
    //添加文章
    createArticlePage() {
      this.$router.push({ name: 'Write' })
    },
    //编辑文章
    editArticlePage(id) {
      this.$router.push({ path: '/admin-article/edit/'+id })
    },
    //删除用户
    deleteArticle(row) {
      this.$confirm('此操作将永久删除用户'+`[${row.username}]`+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: row.id
          }
          deleteArticleB(data).then(res => {
            if(res.data.code === '0') {
              this.$message.success(res.data.desc)
              this.getTableList()
            } else {
              this.$message.error(res.data.desc)
            }
          }).catch(err => {
            this.$message.error(res.data.desc)
          })
        }).catch(err => {
          console.log(err)
        })
      
    },
    //批量删除用户
    batchDelete() {
      this.$confirm('此操作将永久删除选择的用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = []
          this.selectedData.forEach(item => {
            ids.push(item.id)
          })
          let data = {
            ids: ids
          }
          batchDeleteArticlesB(data).then(res => {
            if(res.data.code === '0') {
              this.$message.success(res.data.desc)
              this.getTableList()
            } else {
              this.$message.error(res.data.desc)
            }
          }).catch(err => {
            this.$message.error(res.data.desc)
          })
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px;
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 4px;
}
.bg-img {
  width: 105px;
  height: 65px;
  border-radius: 4px;
}
.form-avatar {
  width: 65px;
  height: 65px;
  border-radius: 4px;
  border: 1px solid #a3a3a3
}
.operation-row {
  margin-bottom: 25px;
}
</style>