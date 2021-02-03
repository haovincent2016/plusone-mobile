<template>
<div class="wrapper">
    <!-- 搜索栏 -->
    <el-form v-show="showSearch" :inline="true" :model="searchForm" class="search-container" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="searchForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="searchForm.nickname" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户电话">
        <el-input v-model="searchForm.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="searchForm.type" placeholder="请选择用户类型" clearable>
          <el-option label="普通用户" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="帐号状态">
        <el-select v-model="searchForm.status" placeholder="请选择帐号状态" clearable>
          <el-option label="正常" :value="true"></el-option>
          <el-option label="封禁" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button 
          @click="getTableList()" 
          type="primary" 
          round 
          icon="el-icon-search"
        >查询</el-button>
        <el-button 
          @click="resetSearch()" 
          round 
          icon="el-icon-refresh-right"
        >重置</el-button>
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
          @click="createUserDialog()"
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
      <table-toolbar :showSearch.sync="showSearch" @queryTable="getTableList" :columns="columns"></table-toolbar>
    </el-row>
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
        width="150"
        v-if="columns[0].visible">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[1].visible">
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="用户头像"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[2].visible">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            trigger="click">
            <img :src="scope.row.avatar" style="width:150px">
            <img slot="reference" :src="scope.row.avatar" class="avatar">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="用户类型"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[3].visible">
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
        width="150"
        v-if="columns[4].visible">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status">正常</el-tag>
          <el-tag type="danger" v-if="!scope.row.status">封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话号码"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[5].visible">
      </el-table-column>
      <el-table-column
        prop="points"
        label="打卡积分"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[6].visible">
      </el-table-column>
      <el-table-column
        prop="days"
        label="签到天数"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[7].visible">
      </el-table-column>
      <el-table-column
        prop="description"
        label="用户描述"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[8].visible">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建日期"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[9].visible">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新日期"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[10].visible">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-button plain icon="el-icon-edit" size="mini" @click="editUserDialog(scope.row)">编辑</el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTableList" />
    <!-- 用户新建、编辑 -->
    <el-dialog :title="textMap[dialogType]" :visible.sync="dialogVisible" width="40%">
      <el-form ref="userForm" :rules="rules" :model="userForm" label-position="right" label-width="70px" style="width: 300px;">
        <el-form-item label="用户名" prop="username">
          <el-input clearable v-model="userForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input clearable :disabled="dialogType === 'edit'" v-model="userForm.password" placeholder="密码包含字母数字，至少5位" show-password />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input clearable v-model="userForm.nickname" placeholder="昵称" />
        </el-form-item>
        <!-- 待做：头像上传 -->
        <el-form-item label="头像" prop="avatar">
          <img class="form-avatar" :src="userForm.avatar" />
        </el-form-item>
        <el-form-item label="账号类型" prop="type">
          <el-select v-model="userForm.type" placeholder="账号类型">
            <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-select v-model="userForm.status" placeholder="账号状态">
            <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="打卡积分" prop="points">
          <el-input-number v-model="userForm.points" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="打卡天数" prop="days">
          <el-input-number v-model="userForm.days" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input clearable v-model="userForm.phone" placeholder="电话号码" />
        </el-form-item>
        <el-form-item label="个人描述" prop="description">
          <el-input clearable v-model="userForm.description" placeholder="个人描述" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogType === 'create' ? createUser() : editUser()">
          提交
        </el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import { getUsersB, createUserB, editUserB, deleteUserB, batchDeleteUsersB } from '@/api/admin'
import Pagination from '@/components/Common/Pagination'

export default {
  data() {
    return {
      searchForm: {
        username: undefined,
        nickname: undefined,
        phone: undefined,
        type: undefined,
        status: undefined,
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
      total: 0,
      //dialog
      dialogVisible: false,
      //dialog标题
      textMap: {
        edit: '编辑用户',
        create: '新建用户'
      },
      //dialog类型
      dialogType: '',
      //表单
      userForm: {
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
      },
      //用户类型
      typeOptions: [
        { name: '普通用户', value: 'user' },
        { name: '管理员', value: 'admin' }
      ],
      //用户状态
      statusOptions: [
        { name: '正常', value: true },
        { name: '封禁', value: false }
      ],
      //表单验证
      rules: {
        username: [{ required: true, message: '用户名为必填项', trigger: 'blur' }],
        password: [{ required: true, message: '密码为必填项', trigger: 'blur' }]
      },
      // 显示搜索条件
      showSearch: true,
      // 列信息
      columns: [
        { key: 0, label: `用户名`, visible: true },
        { key: 1, label: `用户昵称`, visible: true },
        { key: 2, label: `用户头像`, visible: true },
        { key: 3, label: `用户类型`, visible: true },
        { key: 4, label: `帐号状态`, visible: true },
        { key: 5, label: `电话号码`, visible: true },
        { key: 6, label: `打卡积分`, visible: true },
        { key: 7, label: `签到天数`, visible: true },
        { key: 8, label: `用户描述`, visible: true },
        { key: 9, label: `创建日期`, visible: true },
        { key: 10, label: `更新日期`, visible: true }
      ],
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
      getUsersB(data).then(res => {
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
    //数据多选
    handleSelectionChange(val) {
      this.selectedData = val
      console.log(this.selectedData)
    },
    //重置搜索表单
    resetSearch() {
      this.searchForm = {
        username: undefined,
        nickname: undefined,
        phone: undefined,
        type: undefined,
        status: undefined
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
    createUserDialog() {
      this.dialogType = 'create'
      this.dialogVisible = true
      this.resetForm()
    },
    //添加用户
    createUser() {
      createUserB(this.userForm).then(res => {
        if(res.data.code === '0') {
          this.$message.success(res.data.desc)
          this.getTableList()
        } else {
          this.$message.error(res.data.desc)
        }
        this.closeForm()
      }).catch(err => {
        this.$message.error(res.data.desc)
        this.closeForm()
      })
    },
    editUserDialog(row) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.resetForm()
      this.userForm = row
    },
    //编辑用户
    editUser() {
      let data = {
        id: this.userForm.id,
        userForm: this.userForm
      }
      editUserB(data).then(res => {
        if(res.data.code === '0') {
          this.$message.success(res.data.desc)
          this.getTableList()
        } else {
          this.$message.error(res.data.desc)
        }
        this.closeForm()
      }).catch(err => {
        this.$message.error(res.data.desc)
        this.closeForm()
      })
    },
    //删除用户
    deleteUser(row) {
      this.$confirm('此操作将永久删除用户'+`[${row.username}]`+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: row.id
          }
          deleteUserB(data).then(res => {
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
          batchDeleteUsersB(data).then(res => {
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