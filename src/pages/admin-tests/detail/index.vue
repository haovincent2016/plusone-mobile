<template>
  <!-- 测试试卷新建、编辑 -->
  <!-- https://blog.csdn.net/qq_41312395/article/details/111295582 -->
  <!-- https://www.jb51.net/article/201604.htm -->
  <div>
    <!-- 操作栏 -->
    <sticky :z-index="20" :class-name="'operation'">
      <el-button v-loading="loading" plain round icon="el-icon-plus" type="primary" @click="createTest">
        创建
      </el-button>
    </sticky>
    <!-- 编辑表单 -->
    <el-form ref="testForm" :model="testForm" :rules="rules" label-position="right" label-width="80px" class="form-wrapper">
      <!-- 考试对象 -->
      <el-form-item prop="selectedUsers" label="选择考生">
        <el-select
          v-model="testForm.selectedUsers"
          multiple
          filterable
          allow-create
          default-first-option
          remote
          :remote-method="queryList"
          :loading="listLoading"
          placeholder="请选择考生">
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
      <!-- 截止时间 -->
      <el-form-item prop="deadline" label="截止时间">
        <el-date-picker
          v-model="testForm.deadline"
          type="datetime"
          placeholder="请选择截至时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <!-- 试卷名称 -->
      <el-form-item prop="title" label="试卷标题">
        <el-input
          style="width:600px"
          v-model="testForm.title"
          type="text"
          placeholder="请填写试卷标题(<20字)"
          maxlength="19"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <question
      v-for="item in testForm.questions"
      :key="item.id"
      :question="item"
      class="question-content"
      @removeQuestion="removeQuestion"
    />
    <div class="question-type">
     <el-button
      v-for="item in questionTypes"
      :key="item.id"
      style="border-color: #2A82E4; color: #2A82E4"
      @click="addQuestion(item.id)"
     >
      <i :class="item.icon" />
      {{ item.name }}
     </el-button>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Fixed'
import Question from './question'
import { getUserInfoB, createTestB } from '@/api/admin'

export default {
  data() {
    return {
      //考生列表loading
      listLoading: false,
      //创建试卷loading
      loading: false,
      //考生列表
      userList: [],
      //试卷编辑
      testForm: {
        //选择的考生
        selectedUsers: [],
        //截止时间
        deadline: undefined,
        //试卷标题
        title: '',
        //问题
        questions: []
      },
      //试题类型
      questionTypes: [
        {id: 1, icon: 'el-icon-arrow-left', name: '单选题'},
        {id: 2, icon: 'el-icon-arrow-right', name: '多选题'},
        {id: 3, icon: 'el-icon-arrow-down', name: '填空题'},
        {id: 4, icon: 'el-icon-arrow-up', name: '判断题'},
        {id: 5, icon: 'el-icon-edit-outline', name: '简答题'}
      ],
      //试题编号
      questionId: 0,
      //表单验证
      rules: {
        selectedUsers: [{ required: true, message: '考生为必填项', trigger: 'blur' }],
        deadline: [{ required: true, message: '截止时间为必填项', trigger: 'blur' }],
        title: [{ required: true, message: '试卷标题为必填项', trigger: 'blur' }]
      },
    }
  },
  methods: {
    getUserInfo(query) {
      setTimeout(() => {
          let data = {
            username: query
          }
          getUserInfoB(data).then(res => {
            if(res.data.code === '0') {
              //this.$message.success(res.data.desc)
              this.userList = JSON.parse(res.data.detail)
            } else {
              this.$message.error(res.data.desc)
            }
            this.listLoading = false
          }).catch(err => {
            this.$message.error(res.data.desc)
            this.listLoading = false
          })
        }, 1000)
    },
    //根据用户名搜索用户(query为搜索数据)
    queryList(query) {
      if (query !== '') {
        this.listLoading = true
        this.getUserInfo(query)
      } else {
        this.userList = []
      }
    },
    // 创建试卷
    createTest() {
      if(this.testForm.questions.length === 0) {
        this.$notify({
          title: '警告',
          message: '请添加试题',
          type: 'warning'
        })
        return
      }
      this.loading = true
      let message = ''
      let isSubmit = true
      this.$refs['testForm'].validate(res => {
        if(!res) {
          this.loading = false
          return
        }
        this.testForm.questions.forEach(item => {
          if(item.title === '') {
            message = '请设置题干'
            isSubmit = false
            return
          }
          if(item.content.length === 0) {
            message = '请设置选项内容'
            isSubmit = false
            return
          }
          if(item.answer.length === 0) {
            message = '请设置答案'
            isSubmit = false
            return
          }
        })
        if(!isSubmit) {
          this.$notify({
            title: '警告',
            message: message,
            type: 'warning'
          })
          this.loading = false
          return
        }
        // 通过验证
        let data = {
          userId: this.testForm.selectedUsers,
          title: this.testForm.title,
          deadline: this.testForm.deadline,
          questions: JSON.stringify(this.testForm.questions) 
        }
        createTestB(data).then(res => {
          if(res.data.code === '0') {
            this.$message.success(res.data.desc)
            // let detail = JSON.parse(res.data.content)
            // this.settingForm.settingTitle = detail.title
            // this.view = JSON.parse(detail.questions)
            this.loading = false
          }
        }).catch(err => {
          this.$message.error(res.data.desc)
          this.loading = false
        })
      })

    },
    // 添加题目
    addQuestion(id) {
      const q = {
        id: this.questionId,
        typeId: id,
        title: '',
        //题目分值
        score: '',
        //题目答案
        answer: [],
        //题目选项内容
        content: []
      }
      this.testForm.questions.push(q)
      this.questionId++
    },
    // 删除题目
    removeQuestion(id) {
      this.testForm.questions.forEach((item, index) => {
        if(item.id === id) {
          this.testForm.questions.splice(index, 1)
        }
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
.form-wrapper {
  padding: 15px;
}
.question-type {
  margin: 0 25px 25px 25px;
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
</style>