<template>
<div class="wrapper">
    <!-- 搜索栏 -->
    <el-form v-show="showSearch" :inline="true" :model="searchForm" class="search-container" label-width="80px">
      <el-form-item label="用户名">
        <!-- 需确定是否有该用户 -->
        <el-select
          v-model="searchForm.username"
          filterable
          reserve-keyword
          remote
          :remote-method="querySearchUser"
          :loading="userLoading"
          placeholder="用户名" 
          clearable>
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
            class="search-item">
            <img :src="item.avatar" class="search-avatar" />
            <div>用户名：{{item.username}}</div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="完成听写">
        <el-select v-model="searchForm.finishWrite" placeholder="是否完成听写" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="完成视频">
        <el-select v-model="searchForm.finishVideo" placeholder="是否完成视频" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
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
          @click="createTaskDialog()"
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
        prop="user"
        label="打卡用户"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[0].visible">
        <template slot-scope="scope">
          <div v-if="scope.row.user">
            <img :src="scope.row.user.avatar" class="avatar" />
            <div class="author">{{ scope.row.user.username }}</div>
          </div>
          <div v-else>
            暂无数据
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskImages"
        label="打卡图片"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[1].visible">
        <template slot-scope="scope">
          <img :src="`${imageUrl}` + '/uploads/' + scope.row.taskImages" class="task-image" />
        </template>
      </el-table-column>
      <el-table-column
        prop="finishWrite"
        label="完成听写"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[2].visible">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.finishWrite">已完成</el-tag>
          <el-tag type="danger" v-else>未完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="finishVideo"
        label="完成视频"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[3].visible">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.finishVideo">已完成</el-tag>
          <el-tag type="danger" v-else>未完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建日期"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[4].visible">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新日期"
        header-align="center"
        align="center"
        width="150"
        v-if="columns[5].visible">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-button plain icon="el-icon-edit" size="mini" @click="editTaskDialog(scope.row)">编辑</el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="deleteTask(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTableList" />
    <!-- 打卡新建、编辑 -->
    <el-dialog :title="textMap[dialogType]" :visible.sync="dialogVisible" width="40%">
      <el-form ref="taskForm" :rules="rules" :model="taskForm" label-position="right" label-width="80px" style="width: 300px;">
        <el-form-item label="打卡用户" prop="username">
          <el-select
            v-model="taskForm.user.username"
            filterable
            reserve-keyword
            remote
            :remote-method="queryTaskUser"
            :loading="taskLoading"
            placeholder="用户名" 
            clearable>
            <el-option
              v-for="item in taskList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
              class="search-item">
              <img :src="item.avatar" class="search-avatar" />
              <div>用户名：{{item.username}}</div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打卡图片" prop="images">
          <img class="task-image" :src="`${imageUrl}`+'/uploads/'+taskForm.taskImages" />
        </el-form-item>
        <el-form-item label="完成听写" prop="write">
          <el-select v-model="taskForm.finishWrite" placeholder="听写情况">
            <el-option v-for="item in taskOptions" :key="item.id" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="完成视频" prop="video">
          <el-select v-model="taskForm.finishVideo" placeholder="视频情况">
            <el-option v-for="item in taskOptions" :key="item.id" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogType === 'create' ? createTask() : editTask()">
          提交
        </el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import { getTasksB, createTaskB, editTaskB, deleteTaskB, batchDeleteTasksB, getUserInfoB } from '@/api/admin'
import baseUrl from '@/utils/setting'

export default {
  data() {
    return {
      searchForm: {
        username: undefined,
        finishWrite: undefined,
        finishVideo: undefined,
      },
      tableList: null,
      tableListLoading: false,
      //根据用户名搜索用户
      userList: [],
      taskList: [],
      userLoading: false,
      taskLoading: false,
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
      //dialog标题y
      
      textMap: {
        edit: '编辑打卡',
        create: '新建打卡'
      },
      //dialog类型
      dialogType: '',
      //表单
      taskForm: {
        user: {
          username: ''
        },
        taskImages: 'file-1611795545829.png',
        finishWrite: true,
        finishVideo: true
      },
      //听写/视频情况
      taskOptions: [
        { name: '已完成', value: true },
        { name: '未完成', value: false }
      ],
      //表单验证
      rules: {
        username: [{ required: true, message: '用户名为必填项', trigger: 'blur' }],
        write: [{ required: true, message: '必填项', trigger: 'blur' }],
        video: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      // 显示搜索条件
      showSearch: true,
      // 列信息
      columns: [
        { key: 0, label: `打卡用户`, visible: true },
        { key: 1, label: `打卡图片`, visible: true },
        { key: 2, label: `完成听写`, visible: true },
        { key: 3, label: `完成视频`, visible: true },
        { key: 4, label: `创建日期`, visible: true },
        { key: 5, label: `更新日期`, visible: true }
      ],
    }
  },
  computed: {
    imageUrl() {
      return baseUrl
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
    getUserInfo(query, type) {
      setTimeout(() => {
          let data = {
            username: query
          }
          getUserInfoB(data).then(res => {
            if(res.data.code === '0') {
              this.$message.success(res.data.desc)
              if(type === 'search') {
                this.userList = JSON.parse(res.data.detail)
              } else {
                this.taskList = JSON.parse(res.data.detail)
              }
            } else {
              this.$message.error(res.data.desc)
            }
            if(type === 'search') {
              this.userLoading = false
            } else {
              this.taskLoading = false
            }
          }).catch(err => {
            this.$message.error(res.data.desc)
            if(type === 'search') {
              this.userLoading = false
            } else {
              this.taskLoading = false
            }
          })
        }, 1000)
    },
    //根据用户名搜索用户(query为搜索数据)
    queryTaskUser(query) {
      if (query !== '') {
        this.taskLoading = true
        this.getUserInfo(query, 'task')
      } else {
        this.taskList = []
      }
    },
    //根据用户名搜索用户(query为搜索数据)
    querySearchUser(query) {
      if (query !== '') {
        this.userLoading = true
        this.getUserInfo(query, 'search')
      } else {
        this.userList = []
      }
    },
    //获取表单数据
    getTableList() {
      this.tableListLoading = true
      let data = {
        searchForm: this.searchForm,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      getTasksB(data).then(res => {
        if(res.data.code === '0') {
          this.$message.success(res.data.desc)
          this.tableList = JSON.parse(res.data.tasks)
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
        finishWrite: undefined,
        finishVideo: undefined
      }
      this.getTableList()
    },
    //重置dialog表单
    resetForm() {
      this.taskForm = {
        user: {
          username: ''
        },
        taskImages: 'file-1611795545829.png',
        finishWrite: true,
        finishVideo: true
      }
    },
    //关闭dialog
    closeForm() {
      this.$refs.taskForm.resetFields()
      this.dialogVisible = false
    },
    createTaskDialog() {
      this.dialogType = 'create'
      this.dialogVisible = true
      this.resetForm()
    },
    //添加打卡
    createTask() {
      this.taskForm.userId = this.taskForm.user.username
      createTaskB(this.taskForm).then(res => {
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
    editTaskDialog(row) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.resetForm()
      this.taskForm = row
    },
    //编辑打卡
    editTask() {
      this.taskForm.userId = this.taskForm.user.username
      editTaskB(this.taskForm).then(res => {
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
    //删除打卡
    deleteTask(row) {
      this.$confirm('此操作将永久删除打卡记录'+`[${row.id}]`+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: row.id
          }
          deleteTaskB(data).then(res => {
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
      this.$confirm('此操作将永久删除选择的打卡记录, 是否继续?', '提示', {
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
          batchDeleteTasksB(data).then(res => {
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
.search-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
}
.search-avatar {
  width: 35px;
  height: 35px;
  border-radius: 8px;
  margin-right: 8px;
}
.task-image {
  width: 85px;
  height: 55px;
  border-radius: 8px;
}
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 8px;
}
.form-avatar {
  width: 65px;
  height: 65px;
  border-radius: 8px;
  border: 1px solid #a3a3a3
}
.operation-row {
  margin-bottom: 25px;
}
</style>