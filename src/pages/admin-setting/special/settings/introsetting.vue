<template>
  <div>
    <el-form label-width="80px">
      <el-form-item v-for="(item, index) in introData.contents" :key="index" :label="`第${index+1}行`">
        <el-input v-model="introData.contents[index]" placeholder="最多24个字" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'IntroSetting',
  props: ['data'],
  data() {
    return {
      introData: {},
    }
  },
  created() {
    this.introData = this.data
  },
  methods: {
  }
}
</script>

<style>

</style>