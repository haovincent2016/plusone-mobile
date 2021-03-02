<template>
  <div class="wrapper">
    <el-form v-show="showSearch" :inline="true" :model="searchForm" class="search-container" label-width="80px">
      <el-form-item label="试卷名">
        <el-input v-model="searchForm.title" clearable></el-input>
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
          @click="createPage()"
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
        label="试卷名"
        header-align="center"
        align="center"
        width="250"
        v-if="columns[0].visible">
      </el-table-column>
      <el-table-column
        prop="deadline"
        label="截止时间"
        header-align="center"
        align="center"
        width="250"
        v-if="columns[1].visible">
      </el-table-column>
      <el-table-column
        prop="questions"
        label="题目顺序【题号：题型】"
        header-align="center"
        align="center"
        width="250"
        v-if="columns[2].visible">
        <template slot-scope="scope">
          <el-tag v-for="item in JSON.parse(scope.row.questions)" :key="item.id" class="tag-space">{{ item | getTypes }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="scores"
        label="题目总分"
        header-align="center"
        align="center"
        width="250"
        v-if="columns[3].visible">
        <template slot-scope="scope">
          {{ calcScores(JSON.parse(scope.row.questions)) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="numbers"
        label="题目数量"
        header-align="center"
        align="center"
        width="250"
        v-if="columns[4].visible">
        <template slot-scope="scope">
          {{ JSON.parse(scope.row.questions).length }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center"
        width="250">
        <template slot-scope="scope">
          <!-- 跳转文章页 -->
          <el-button plain icon="el-icon-edit" size="mini" @click="editTest(scope.row.id)">编辑</el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="deleteTest(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllTestsB, deleteTestB, batchDeleteTestsB } from '@/api/admin'
import moment from 'moment'
export default {
  data() {
    return {
      searchForm: {
        title: ''
      },
      selectedData: [],
      showSearch: true,
      // 列信息
      columns: [
        { key: 0, label: `试卷名`, visible: true },
        { key: 1, label: `截止日期`, visible: true },
        { key: 2, label: `题目顺序`, visible: true },
        { key: 3, label: `题目总分`, visible: true },
        { key: 4, label: `题目数量`, visible: true }
      ],

      tableListLoading: false,
      tableList: []
    }
  },
  filters: {
    getTypes: function(val) {
      let id = val.id+1
      switch (val.typeId) {
        case 1:
          return id+': '+'单选题'

        case 2:
          return id+': '+'多选题'

        case 3:
          return id+': '+'填空题'

        case 4:
          return id+': '+'判断题'
        
        case 5:
          return id+': '+'简答题'
      }
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    // 计算试卷总分
    calcScores(questions) {
      let total = 0
      questions.forEach(item => {
        total += Number(item.score)
      })
      return total
    },
    getTableList() {
      getAllTestsB().then(res => {
          if(res.data.code === '0') {
            this.$message.success(res.data.desc)
            this.tableList = JSON.parse(res.data.content)
            this.tableList.forEach(item => {
              //截止日期格式
              item.deadline = moment(item.deadline).format('dddd, MM/DD/YYYY, h:mm:ss a')
            })
          }
        }).catch(err => {
          this.$message.error(res.data.desc)
        })
    },
    resetSearch() {
      this.searchForm.title = ''
    },
    // 新建页
    createPage() {
      this.$router.push({ name: 'CreateTest' })
    },
    // 编辑页
    editTest(id) {
      this.$router.push({ path: '/admin-tests/edit/'+id })
    },
    // 删除指定试卷
    deleteTest(row) {
      this.$confirm('此操作将永久删除试卷'+`[${row.title}]`+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: row.id
          }
          deleteTestB(data).then(res => {
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
    // 批量删除试卷
    batchDelete() {
      this.$confirm('此操作将永久删除选择的试卷, 是否继续?', '提示', {
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
          batchDeleteTestsB(data).then(res => {
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
    // 数据多选
    handleSelectionChange(val) {
      this.selectedData = val
    },
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px;
}
.operation-row {
  margin-bottom: 25px;
}
.tag-space {
  margin: 0 5px;
}
</style>