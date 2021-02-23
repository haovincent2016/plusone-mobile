<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
   <span
    class="type-name"
    v-text="question.typeId < 3 ?
     question.typeId === 1 ?
      '单选题' : '多选题'
     : question.typeId < 5 ?
      question.typeId === 3 ?
       '填空题' : '判断题'
      : '简答题'"
   >卡片名称</span>
   <el-input v-model="question.score" style="width: 55px" />
   <span>分</span>
   <el-button style="float: right; border: none; font-size: 20px" icon="el-icon-close" @click="removeQuestion" />
  </div>
  <el-form :model="question" label-position="right" label-width="60px">
    <el-form-item label="题目">
      <el-input
        v-model="question.title"
        type="textarea"
        placeholder="请输入题干内容..."
      />
    </el-form-item>
    <!--单选、多选-->
    <el-form-item label="内容" v-if="question.typeId === 1 || question.typeId === 2" style="margin-bottom: 0px">
    <el-checkbox-group
      v-model="question.answer"
      :min="0"
      :max="question.typeId === 1 ? 1 : 4"
    >
      <el-row
        v-for="(item, index) in ['A', 'B', 'C', 'D']"
        :key="item"
      >
        <el-col :span="1">
          <el-checkbox-button
            v-model="question.answer"
            :label="item"
            border
          >
          {{ item }}
          </el-checkbox-button>
        </el-col>
        <el-col :span="23">
          <el-input
            v-model="question.content[index]"
            placeholder="请输入选项..."
            @input="contentChange(question)"
          />
        </el-col>
      </el-row>
    </el-checkbox-group>
    </el-form-item>
    <!--简答、填空-->
    <el-form-item label="内容" v-if="question.typeId === 3 || question.typeId === 5" style="margin-bottom: 0px">
    <el-input
        v-model="question.answer[0]"
        type="textarea"
        placeholder="请输入参考答案"
    />
    </el-form-item>
    <!--判断-->
    <el-form-item label="内容" v-if="question.typeId === 4" style="margin-bottom: 0px">
    <el-checkbox-group
        v-model="question.answer"
        :min="0"
        :max="1"
    >
        <el-checkbox v-model="question.answer" label="对" border />
        <el-checkbox v-model="question.answer" label="错" border />
    </el-checkbox-group>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
export default {
 props: {
  question: {
   type: Object,
   required: true
  }
 },
 methods: {
  removeQuestion() {
   this.$emit('removeQuestion', this.question.id)
  },
  contentChange(question) {
   question.answer.splice(0)
  }
 }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 10px;
}
.type-name {
 color: #505050;
 margin-right: 20px;
}
</style>