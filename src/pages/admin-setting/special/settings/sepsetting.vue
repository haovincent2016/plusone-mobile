<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="分栏标题">
        <el-input v-model="sepData.name" placeholder="分栏标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="标题颜色">
        <el-color-picker v-model="sepData.color" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="分栏图标">
        <el-input v-model="sepData.icon" placeholder="code（如：thumb-circle-o）" clearable></el-input>
      </el-form-item>
      <el-form-item label="图标颜色">
        <el-color-picker v-model="sepData.iconColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="边线颜色">
        <el-color-picker v-model="sepData.borderColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="左内边距">
        <el-slider v-model="sepData.paddingLeft"></el-slider>
      </el-form-item>
      <el-form-item label="右内边距">
        <el-slider v-model="sepData.paddingRight"></el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SepSetting',
  props: ['data'],
  data() {
    return {
      sepData: {},
    }
  },
  created() {
    this.sepData = this.data
  },
  methods: {
  }
}
</script>

<style>

</style>