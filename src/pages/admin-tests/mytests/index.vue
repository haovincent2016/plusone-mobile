<template>
  <!-- 考生可以进行的考试列表 -->
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" v-for="item in list" :key="item.id">
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">开始考试</el-button>
          </div>
          <div class="item">
            截止日期：<br>{{ item.deadline | convertTime }}
          </div>
          <div class="item">
            限制时间：<br>{{ item.timelimit }} 分钟
          </div>
          <div class="item">
            总题数：<br>{{ JSON.parse(item.questions).length }} 道
          </div>
          <div class="item">
            总分数：<br> {{ calcScores(JSON.parse(item.questions)) }} 分
          </div>
          <div class="item">
            祝你好运，加油~
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserTestsB } from '@/api/admin'
import moment from 'moment'

export default {
  computed: mapState([ 'adminInfo' ]),
  data() {
    return {
      list: []
    }
  },
  filters: {
    convertTime: val => {
      return moment(val).format('dddd, MM/DD/YYYY, h:mm:ss a')
    }
  },
  mounted() {
    this.getUserTests()
  },
  methods: {
    // 计算试卷总分
    calcScores(questions) {
      let total = 0
      questions.forEach(item => {
        total += Number(item.score)
      })
      return total
    },
    getUserTests() {
      getUserTestsB({ id: this.adminInfo.id }).then(res => {
        if(res.data.code === '0') {
          this.$message.success(res.data.desc)
          this.list = JSON.parse(res.data.content)
          let questions = JSON.parse()
          console.log(this.list)
        } else {
          this.$message.error(res.data.desc)
        }
      }).catch(err => {
        this.$message.error(res.data.desc)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 15px;
}
.item {
  margin-bottom: 15px;
  color: #888;
}
</style>