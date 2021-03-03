<template>
  <!-- 电脑版考题界面（包括题目和限时）-->
  <!-- 待做：手机版 -->
  <div>
    <!-- 操作栏 -->
    <sticky :z-index="20" :class-name="'operation'">
      <el-button v-loading="loading" plain round icon="el-icon-check" type="primary" @click="submitTest">
        交卷
      </el-button>
    </sticky>
    <!-- 时间区 -->

    <!-- 试卷区 -->
    <div class="test-title">{{ testForm.title }}</div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="5">
        <question
          v-for="item in testForm.questions"
          :key="item.id"
          :question="item"
          :type="'readonly'"
          class="question-content"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserTestB } from '@/api/admin'
import Sticky from '@/components/Fixed'
import Question from '../detail/question'

export default {
  data() {
    return {
      loading: false,
      //试卷
      testForm: {
        //截止时间
        deadline: undefined,
        //试卷标题
        title: '',
        //问题
        questions: []
      },
    }
  },
  mounted() {
    if(this.$route.params.id) {
      this.getTest()
    }
  },
  methods: {
    // 获取指定试卷
    getTest() {
      this.loading = true
      getUserTestB({ id: this.$route.params.id }).then(res => {
        if(res.data.code === '0') {
          let test = JSON.parse(res.data.detail)
          console.log(test.questions)
          // 填入试卷数据
          this.testForm.title = test.title
          this.testForm.deadline = test.deadline
          this.testForm.questions = test.questions
        } else {
          this.$message.error(res.data.desc)
        }
        this.loading = false
      }).catch(err => {
        this.$message.error(res.data.desc)
        this.loading = false
      })
    },
    // 交卷（后台比对答案，返回答案）
    submitTest() {
      console.log(this.testForm.questions)
      this.$confirm('此操作将提交试卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    Sticky,
    Question
  } 
}
</script>

<style lang="scss" scoped>
.test-title {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.5rem;
  color: #666;
}
</style>