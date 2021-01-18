<template>
  <div class="full-width">
    <TopPart />
    <van-swipe 
      class="my-swipe" 
      @change="onChange"
      :autoplay="4000" 
      >
      <van-swipe-item 
        v-for="(image, index) in images" 
        :key="index">
        <img width="100%" height="250px" :src="image" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/3</div>
      </template>
    </van-swipe>

    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      我们的教师
    </van-divider>

    <div class="description">
      <p style="font-size:14px;">Lucy老师和Vince老师</p>
      <p style="font-size:14px;">多年英语教学经验</p>
      <p style="font-size:14px;">助力孩子英语能力长足提高</p>
      <van-button plain hairline type="info" @click="showVideo">查看视频</van-button>
    </div>

    <van-dialog v-model="show" title="视频">
      <video :src="videoUrl" width="100%" height="310px" controls="controls">暂不支持播放</video>
    </van-dialog>

    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      我们的课程
    </van-divider>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="幼儿英语启蒙" name="1">
        <b style='font-size:14px'>沉浸式英语教学</b><br>在教学过程中，根据学生的情况尽量增加学生对英语的使用，让学生熟悉语言环境，提高英语意识<br><br><b style='font-size:14px'>合理的难度梯度和科学的等级</b><br>根据教材的梯度，学生在每个阶段都会达到相应的教学目标，保证一定阶段的学习以后学生稳步提高，同时配备辅助教材，提高孩子兴趣<br><br><b style='font-size:14px'>保证产出，杜绝哑巴英语</b><br>教学过程中以产出为目的，严格要求孩子，杜绝只顾兴趣，不顾成果的结果，让孩子一直以正确的方式开口说英语
      </van-collapse-item>
      <van-collapse-item title="小学英语" name="2">
        <b style='font-size:14px'>定制教材</b><br>学校课本为主，个性化定制教辅内容<br><br><b style='font-size:14px'>课堂设置</b><br>考试导向，重分数产出，英语实际使用能力兼备<br><br><b style='font-size:14px'>附赠服务</b><br>免费试卷精讲+免费助教服务
      </van-collapse-item>
      <van-collapse-item title="中学英语" name="3">
        <b style='font-size:14px'>定制教材</b><br>学校课本为主，个性化定制教辅内容<br><br><b style='font-size:14px'>课堂设置</b><br>考试导向，重分数产出，英语实际使用能力兼备<br><br><b style='font-size:14px'>附赠服务</b><br>免费试卷精讲+免费助教服务
      </van-collapse-item>
      <van-collapse-item title="托福雅思培训" name="4">
        <b style='font-size:14px'>个性化的课程</b><br>为每个学生其制定合理的复习规划和建议<br><br><b style='font-size:14px'>强有力的师资</b><br>讲师精通托福考试和学校申请，能够为学生提供最强有力的学习助力<br><br><b style='font-size:14px'>严格的监督制度</b><br>详尽的课下任务，保证学生课下练习的强度<br><br><b style='font-size:14px'>务实的教学模式</b><br>教学有效对接托福考试内容，不做无用功<br><br><b style='font-size:14px'>高效的练习方式</b><br>合理制定练习目标及方式，提高效率，快速出分"
      </van-collapse-item>
      <van-collapse-item title="留学申请训" name="5">
        <b style='font-size:14px'>第一步：选校，选专业，选导师</b><br>前期学校及专业查询筛选，根据申请者情况量身定制申请方案<br><br><b style='font-size:14px'>第二步：完成文书推荐信简历</b><br>申请者提供相关资料，完成文书推荐信简历等，质量保证<br><br><b style='font-size:14px'>第三步：网申表格填写</b><br>申请者提供相关资料，完成填写<br><br><b style='font-size:14px'>第四步：联系套词，等待录取</b><br>申请阶段协助联系学校，套词教授，等待最终录取"
      </van-collapse-item>
      <van-collapse-item title="作文精批" name="6">
        <b style='font-size:14px'>托福雅思作文精批及讲解</b><br>提供精细批改及免费20分钟讲解服务<br><br><b style='font-size:14px'>初高中英语作文精批及讲解</b><br>提供精细批改及免费20分钟讲解服务<br><br><b style='font-size:14px'>四六级英语作文精批及讲解</b><br>提供精细批改及免费20分钟讲解服务
      </van-collapse-item>
    </van-collapse>

    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      更多资讯
    </van-divider>

    <van-notice-bar
      left-icon="info-o"
      color="#1989fa" 
      background="#f1f1f1"
      mode="link"
      :scrollable="false"
    >
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="5000"
        :show-indicators="false"
      >
        <van-swipe-item>资讯1</van-swipe-item>
        <van-swipe-item>资讯2</van-swipe-item>
        <van-swipe-item>资讯3</van-swipe-item>
      </van-swipe>
    </van-notice-bar>

    <van-divider
      :style="{color:'#1989fa',borderColor:'#1989fa',padding:'0 16px'}"
    >
      扫码关注
    </van-divider>
    <div style="text-align:center;">
      <van-button 
        plain 
        hairline 
        style="margin-bottom:80px;" 
        type="info" 
        @click="showQR">
        打开二维码
      </van-button>
    </div>
    <van-popup
      style="text-align:center;"
      round 
      closeable
      close-icon="close"
      v-model="showCode" 
      position="bottom" 
      :style="{height:'30%'}">
      <img :src="qrUrl" width="220px" height="100%" />
    </van-popup>

    <BottomPart />
  </div>
</template>

<script>
import TopPart from 'components/Home/TopPart'
import BottomPart from 'components/Home/BottomPart'

export default {
  data() {
    return {
      current: 0,
      activeNames: ['1'],
      images: [
        require('../../static/img/ad1.png'),
        require('../../static/img/ad2.png'),
        require('../../static/img/ad3.png')
      ],
      videoUrl: require('../../static/video/intro1.mp4'),
      qrUrl: require('../../static/img/wechatcode.jpg'),
      show: false,
      showCode: false
    }
  },
  methods: {
    onChange(index) {
      this.current = index
    },
    showVideo() {
      this.show = true;
    },
    showQR() {
      this.showCode = true;
    }
  },
  components: {
    TopPart,
    BottomPart
  }
}
</script>

<style lang="stylus" scoped>
.my-swipe
  margin-top 46px
.custom-indicator
  position absolute
  right 5px
  bottom 5px
  padding 2px 5px
  font-size 12px
  background rgba(0, 0, 0, 0.1)
.description
  text-align center
.notice-swipe 
  height 40px
  line-height 40px
</style>
