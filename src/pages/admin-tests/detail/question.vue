<template>
<el-row :gutter="20">
  <el-col :span="14" :offset="5">
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
        <el-input class="custom-input" v-model="question.score" :disabled="type === 'readonly'" style="width: 55px" />
        <span>分</span>
        <el-button v-if="type === 'editable'" style="float: right; border: none; font-size: 20px" icon="el-icon-close" @click="removeQuestion" />
      </div>
      <el-form :model="question" label-position="right" label-width="60px">
        <el-form-item label="题目">
          <el-input
            class="custom-input"
            :disabled="type === 'readonly'"
            v-model="question.title"
            placeholder="请输入题干内容..."
          />
          <!-- 待做：题目图片 -->
          
        </el-form-item>
        <!--单选、多选-->
        <el-form-item v-if="question.typeId === 1 || question.typeId === 2" style="margin-bottom: 15px">
        <el-checkbox-group
          v-model="question.answer"
          :min="0"
          :max="question.typeId === 1 ? 1 : 4"
        >
          <el-row
            :gutter="20"
            v-for="(item, index) in ['A', 'B', 'C', 'D']"
            :key="item"
            style="margin-bottom:5px;"
          >
            <el-col :span="2">
              <el-form-item>
                <el-checkbox-button
                  v-model="question.answer"
                  :label="item"
                  border
                  class="custom-checkbox"
                >
                {{ item }}
                </el-checkbox-button>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item>
                <el-input
                  class="custom-input"
                  :disabled="type === 'readonly'"
                  v-model="question.content[index]"
                  placeholder="请输入选项..."
                  @input="contentChange(question)"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-checkbox-group>
        </el-form-item>
        <!--简答、填空-->
        <el-form-item v-if="question.typeId === 3 || question.typeId === 5" style="margin-bottom: 15px">
        <el-input
          class="custom-area"
          v-model="question.answer[0]"
          type="textarea"
          placeholder="请输入参考答案"
        />
        </el-form-item>
        <!--判断-->
        <el-form-item v-if="question.typeId === 4" style="margin-bottom: 15px">
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
  </el-col>
</el-row>
</template>

<script>
export default {
 props: {
  question: {
   type: Object,
   required: true
  },
  type: {
    type: String,
    default: 'editable'
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

<style>
.custom-input.is-disabled .el-input__inner {
  color: #606266!important;
  background-color: #fff!important;
  border: none!important;
}
.custom-checkbox .el-checkbox-button__inner {
  padding: 9px;
} 
</style>
<style lang="scss" scoped>
.box-card {
  margin: 10px;
}
.type-name {
 color: #505050;
 margin-right: 8px;
}
</style>