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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: [],
      selectedData: [],
      showSearch: true,

    }
  },
  methods: {
    getTableList() {

    },
    resetSearch() {

    },
    createPage() {
      this.$router.push({ name: 'CreateTest' })
    },
    batchDelete() {

    }
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
</style>