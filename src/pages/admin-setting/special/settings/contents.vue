<template>
  <!-- 内容设置编辑器 -->
  <div class="course-content">
    <el-button
      type="primary"
      plain
      icon="el-icon-plus"
      size="mini"
      @click="addTab()"
      class="add-btn"
    >新增</el-button>
    <el-tabs v-model="activeName" type="card" closable @tab-click="handleClick" @tab-remove="removeTab">
      <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title" :name="`${String(item.name)}`">
        <el-form label-width="80px">
        <!-- 标题部分 -->
        <el-form-item label="标题">
          <el-input v-model="item.title" placeholder="标题" clearable></el-input>
        </el-form-item>
        <!-- 待做：顺序要调换，如从2变为4，则4需变为2 -->
        <el-form-item label="顺序">
          <el-input-number disabled @change="handleChange" v-model="item.name" :min="1" controls-position="right" placeholder="排列顺序（1开始)"></el-input-number>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="item.icon" placeholder="code（如：thumb-circle-o）" clearable></el-input>
        </el-form-item>
        <el-form-item label="图标颜色">
          <el-color-picker v-model="item.color" show-alpha></el-color-picker>
        </el-form-item>
        
        <!-- 内容部分 -->
        <div v-for="(subitem, subindex) in item.text" :key="subindex"> 
          <el-form-item label="二级标题">
            <el-input v-model="subitem.subtitle" placeholder="二级标题" clearable></el-input>
          </el-form-item>
          <el-form-item label="二级内容">
            <el-input v-model="subitem.content" type="textarea" placeholder="二级内容" :rows="4" clearable></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
export default {
  name: 'Contents',
  props: ['data'],
  data() {
    return {
      activeName: '1',
      list: []
    }
  },
  created() {
    this.list = this.data.contents
  },
  methods: {
    handleClick(tab) {
      //console.log(tab.name)
    },
    //1变成3，3自动变成1
    handleChange(val, oldVal) {
      let index = val - 1
      this.$set(this.list[index], 'name', oldVal)
    },

    //新增
    addTab() {
      let currName = String(this.list.length + 1)
      this.list.push({
        title: '新一页'+currName, 
        name: currName, 
        icon: 'shop-o', 
        color: '#1989fa', 
        text: [
          {
            subtitle: '', content: ''
          }
        ]
      })
      this.activeName = currName 
    },
    //删除
    removeTab(tab) {
      if(this.activeName === tab) {
        this.list.forEach((item, index) => {
          if(item.name == tab) {
            let nextTab = this.list[index+1] || this.list[index-1]
            if(nextTab) {
              this.activeName = String(nextTab.name)
            }
          }
        })
      } 
      this.list.forEach((i, index) => {
        if(i.name === Number(tab)) {
          this.list.splice(index, 1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  margin: 8px 0;
}
.content-container {
  display: flex;
}
</style>