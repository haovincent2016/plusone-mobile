<template>
  <div class="wrapper">
    <el-form v-show="showSearch" :inline="true" :model="searchForm" class="search-container" label-width="80px">
      <el-form-item label="文章名">
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
        label="试卷名称"
        header-align="center"
        align="center"
        width="250">
      </el-table-column>
      <el-table-column
        prop="deadline"
        label="截止时间"
        header-align="center"
        align="center"
        width="250">
      </el-table-column>
      <el-table-column
        prop="questions"
        label="题目顺序"
        header-align="center"
        align="center"
        width="250">
        <template slot-scope="scope">
          <el-tag v-for="item in JSON.parse(scope.row.questions)" :key="item.id" class="tag-space">{{ item | getTypes }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="scores"
        label="题目总分"
        header-align="center"
        align="center"
        width="250">
        <template slot-scope="scope">
          {{ calcScores(JSON.parse(scope.row.questions)) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="numbers"
        label="题目数量"
        header-align="center"
        align="center"
        width="250">
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
          <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="deleteTest(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllTestsB } from '@/api/admin'
import moment from 'moment'
export default {
  data() {
    return {
      searchForm: {
        title: ''
      },
      selectedData: [],
      showSearch: true,
      columns: [],

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

    },
    createPage() {
      this.$router.push({ name: 'CreateTest' })
    },
    editTest() {

    },
    deleteTest() {

    },
    batchDelete() {

    },
    //数据多选
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