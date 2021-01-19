<template>
<div class="full-width">
  <TopPart />
  <img style="margin-top:46px;margin-bottom:20px;" :src="topUrl" width="100%" />
  <div style="text-align:center;">
    <van-image
      width="10rem"
      height="10rem"
      fit="contain"
      :src="img1"
    />
  </div>
  <van-cell value="NYU(美国纽约大学)语言教育学硕士" />
  <van-cell value="哥伦比亚大学，纽约大学等多家著名大学语言中心就职经历" />
  <van-cell value="TKT教学证书持有者" />
  <van-cell value="深研及擅长少儿英语，KET/PET，新概念，雅思托福等教学" />
  <van-cell value="深研及擅长学校申请，文书修改等留学申请服务" />
  <div style="text-align:center;">
    <van-image
      width="10rem"
      height="10rem"
      fit="contain"
      :src="img2"
    />
  </div>
  <van-cell value="加拿大UBC大学工程学学士" />
  <van-cell value="TKT持证教师，托福雅思双高分" />
  <van-cell value="TKT教学证书持有者" />
  <van-cell value="教学善于发掘规律，总结提高。开创的托福写作范本提分显著" />
  <van-cell value="擅长全科教学，文书修改，留学指导。受家长信赖，学生欢迎" />

  <van-divider
    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    <van-icon class="icon-style" name="thumb-circle-o" color="#1989fa" />
    我们的视频
  </van-divider>
  <div style="text-align:center;">
    <video width="200px" height="200px" controls="controls">
      <source :src="video1" type="video/mp4" />
    </video>
    <video width="200px" height="200px" controls="controls">
      <source :src="video2" type="video/mp4" />
    </video>
  </div>

  <van-divider
    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    <van-icon class="icon-style" name="thumb-circle-o" color="#1989fa" />
    我们的理念
  </van-divider>
  <van-cell value="一切为了孩子，一切为了孩子全面发展。用先进的理念和科学的教学法提高孩子的英语应用能力及考试成绩。" />

  <van-divider
    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    <van-icon class="icon-style" name="thumb-circle-o" color="#1989fa" />
    我们的特色
  </van-divider>
  <van-cell value="辅导内容细致、全面、灵活，根据学生需求来量身定制" />
  <van-cell value="原版教材与一手资料相互结合，深入体验原汁原味英语" />
  <van-cell value="课堂中善于用启发式教学及任务教学法，营造全英环境" />
  <van-cell value="教学善于发掘规律，总结提高。开创的托福写作范本提分显著" />
  <van-cell style="margin-bottom:80px;" value="课下作业实时跟进及严格要求，杜绝学生回家懈怠懒工" />
</div>
</template>

<script>
import TopPart from 'components/Home/TopPart'

export default {
  data() {
    return {
      topUrl: require('../../static/img/about.png'),
      img1: require('../../static/img/lucy.png'),
      img2: require('../../static/img/vince.jpg'),
      video1: require('../../static/video/lucy.mp4'),
      video2: require('../../static/video/vince.mp4')
    }
  },
  components: {
    TopPart
  }
}
</script>

<style lang="stylus" scoped>
.icon-style
 font-size 20px
 margin-right: 4px
</style>