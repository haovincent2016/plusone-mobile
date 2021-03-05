<template>
  <!-- 电脑版考题界面（包括题目和限时）-->
  <!-- 待做：手机版 -->
  <div>
    <!-- 操作栏 -->
    <sticky :z-index="20" :class-name="'operation'">
      <div v-if="score > 0" class="score">
        <span>当前得分: </span>
        <span class="highlight">{{ score }}</span> 
        <span> 分（仅包括客观题）</span>
      </div>
      <el-button v-loading="loading" plain round icon="el-icon-check" type="primary" @click="submitTest">
        交卷
      </el-button>
    </sticky>
    <!-- 待做：时间区（简单时间+倒数进度条） -->
    <!-- https://github.com/f/vue-wait -->
    <div class="time-wrapper">
      <div class="time">时间：{{ time }} / 90:00 分钟</div>
      <el-button v-if="!isStarted" circle type="primary" icon="el-icon-caret-right" size="mini" @click="start"></el-button>
      <el-button v-else circle icon="el-icon-minus" size="mini" @click="stop"></el-button>
    </div>
    <!-- 试卷区 -->
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-divider></el-divider>
        <div class="test-title">{{ testForm.title }}</div>
        <div class="info">
          <span>限时：{{ timelimit }} 分</span>
          <el-divider direction="vertical"></el-divider>
          <span>题数：{{ totalNumber }}</span>
          <el-divider direction="vertical"></el-divider>
          <span>分数: {{ totalScore }}</span>
        </div>
        <div class="warning">
          请勿刷新页面，否则将丢失数据
        </div>
        <el-divider></el-divider>
      </el-col>
    </el-row>
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
import { mapState } from 'vuex'
import { getUserTestB, calScoreB } from '@/api/admin'
import Sticky from '@/components/Fixed'
import Question from '../detail/question'

export default {
  computed: mapState([ 'adminInfo']),
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
      // 客观题分数
      score: 0,
      // 试卷总分
      totalScore: 0,
      // 试卷总题数
      totalNumber: 0,
      // 试卷限时
      timelimit: 0,

      // 是否正在计时
      isStarted: false,
      timer: 0,
      time: '',
      // 定义时，分，秒
      h: 0,
      m: 0,
      s: 0,
      ms: 0
    }
  },
  mounted() {
    if(this.$route.params.id) {
      this.getTest()
    }
  },
  // 刷新销毁页面前保存数据
  // beforeDesotry() {
  //   let data = {
  //     time: this.time,
  //     questions: this.testForm.questions
  //   }
  //   this.$store.commit('saveTestData', data)
  // },
  methods: {
    // 计算试卷总分
    calculateTotal(questions) {
      let total = 0
      questions.forEach(item => {
        total += Number(item.score)
      })
      return total
    },
    // 获取指定试卷
    getTest() {
      this.loading = true
      getUserTestB({ id: this.$route.params.id }).then(res => {
        if(res.data.code === '0') {
          let test = JSON.parse(res.data.detail)
          // 填入试卷数据
          this.testForm.title = test.title
          this.testForm.deadline = test.deadline
          this.testForm.questions = test.questions
          // 其他信息
          this.timelimit = test.timelimit
          this.totalNumber = test.questions.length
          this.totalScore = this.calculateTotal(test.questions)
          //开始计时
          this.start()
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
          let data = {
            id: this.$route.params.id,
            userid: this.adminInfo.id,
            answers: this.testForm.questions
          }
          calScoreB(data).then(res => {
            if(res.data.code === '0') {
              this.score = res.data.score
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

    setTime() {
      this.ms = this.ms + 50      
	    if(this.ms >= 1000) {
	      this.ms = 0
	      this.s = this.s + 1;        
	    }
      if(this.s >= 60){
        this.s = 0
        this.m = this.m + 1     
      }
      if(this.m >= 60){
        this.m = 0;
        this.h = this.h + 1;        
      }
      this.time = this.toDub(this.m) + ":" + this.toDub(this.s)
    },
    reset() {  
      clearInterval(this.timer)
      this.h = 0
      this.m = 0
      this.s = 0
      this.ms = 0
      this.time = "00:00"
    },
    start() {
      this.timer = setInterval(this.setTime, 50)
      this.isStarted = true
    },
    stop() { 
      clearInterval(this.timer)
      this.isStarted = false
    },
    toDub(n) {
      if(n < 10){
        return "0" + n
      }
      else {
        return "" + n
      }
    }
  },
  components: {
    Sticky,
    Question
  } 
}
</script>

<style lang="scss" scoped>
.time-wrapper {
  font-size: 1rem;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  .time {
    margin-right: 10px;
  }
}
.test-title {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.5rem;
  color: #409eff;
}
.info {
  text-align: center;
  margin: 15px 0;
  font-size: 1rem;
  color: #666;
}
.warning {
  text-align: center;
  margin: 15px 0;
  font-size: 1rem;
  color: #e6a23c;
}
.score {
  margin-right: 20px;
  .highlight {
    color: #409EFF;
    font-size: 1.35rem;
  }
  span {
    color: #a1a1a1;
    font-size: 1rem;
  }
}
</style>