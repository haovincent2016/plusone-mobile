<template>
  <!-- 主页布局拖拽式设置 -->
  <!-- https://github.com/wsydxiangwang/Visualization-Page -->
  <!-- 中间view, 右侧传入view，右侧修改view，双向绑定-->
  <div>
    <!-- 操作栏 -->
    <sticky :z-index="20" :class-name="'operation'">
      <el-button v-loading="loading" plain round icon="el-icon-plus" type="primary" @click="uploadData">
        提交
      </el-button>
    </sticky>
    <div class="special-wrapper">
      <div class="left-content">
        <el-form :model="settingForm" :rules="rules" label-width="80px" class="form-wrapper">
          <el-form-item label="设置名称">
            <el-input v-model="settingForm.settingTitle" placeholder="请输入设置名称" clearable></el-input>
          </el-form-item>
        </el-form>
        <div 
          class="content-wrapper"
          @dragstart="dragStart"
          @dragend="dragEnd">
          <div 
            class="content-item"
            v-for="(val, key, index) in typeList"
            draggable 
            :data-type="key"
            :key="index + 1">
            <span :class="val.icon"></span>
            <p>{{val.name}}</p>
            <p>{{key}}</p>
          </div>
        </div>
      </div>
      <div class="center-content">
        <!-- 固定头部 -->
        <div class="center-header" @click="selectType(0)">
          <img src="/static/img/navbar.png">
          <span class="header-title">{{ info.title }}</span>
        </div>
        <!-- 可删内容 -->
        <div class="center-body">
          <div 
            class="view-content"
            @drop="drop"
            @dragover="dragOver"
            :style="{ backgroundColor: info.backgroundColor }">
            <Draggable
              v-model="view"
              draggable=".item">
              <template v-for="(item, index) in view">
                <!-- 非头部组件 -->
                <div
                  v-if="index > 0"
                  :data-index="index"
                  :key="index"
                  class="item"
                  @click="selectType(index, item)">
                    <!-- waiting -->
                    <template v-if="item.status && item.status == 2">
                      <div class="wait" v-if="item.type == 'nav'">头部组件</div>
                      <div class="wait" v-if="item.type == 'banner'">轮播图组件</div>
                      <div class="wait" v-if="item.type == 'video'">视频组件</div>
                      <div class="wait" v-if="item.type == 'course'">内容组件</div>
                      <div class="wait" v-if="item.type == 'news'">新闻组件</div>
                      <div class="wait" v-if="item.type == 'separator'">分栏行</div>
                      <div class="wait" v-if="item.type == 'intro'">教师简介</div>
                    </template>
                    <template >
                      <component 
                        :is="typeList[item.type]['com']" 
                        :data="item"
                        :class="className[item.tabType]">
                      </component>
                    </template>
                    <i @click="deleteItem($event, index)" class="el-icon-error"></i>
                </div>
              </template>
            </Draggable>
          </div>
        </div>
      </div>
      <div class="right-content">
        <div class="editor-title">编辑组件</div>
        <Editor
          :data="props"
          v-if="showRight"
        ></Editor>
      </div>
      <!-- <div class="submit-btn">
        <el-button @click="uploadData" type="primary" plain round>保存</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapState } from 'vuex'
import Banner from './views/banner'
import Video from './views/video'
import Course from './views/course'
import News from './views/news'
import Intro from './views/intro'
import Separator from './views/separator'
// import Images from "./settings/images"
// import Nav from "./settings/nav"
import Editor from './editor'
import Sticky from '@/components/Fixed'
import { createSettingB, getSettingB, editSettingB } from '@/api/admin'
export default {
  data() {
    return {
      loading: false,
      type: undefined,
      settingForm: {
        settingTitle: ''
      },
      rules: {
        username: [{ required: true, message: '设置名为必填项', trigger: 'blur' }],
      },
      index: null,

      view: [
        //头部
        {
          type: 'nav',
          title: '标题'
        }
      ],

      //类型（左侧）
      typeList: {
        //首页轮播图
        banner: {
          name: '轮播图',
          icon: 'el-icon-picture',
          com: 'Banner'
        },
        //分栏行
        separator: {
          name: '分栏行',
          icon: 'el-icon-more-outline',
          com: 'Separator'
        },
        //教师简介
        intro: {
          name: '教师简介',
          icon: 'el-icon-s-custom',
          com: 'Intro'
        },
        //首页视频链接
        video: {
          name: '视频设置',
          icon: 'el-icon-video-play',
          com: 'Video'
        },
        //首页课程介绍
        course: {
          name: '内容设置',
          icon: 'el-icon-edit-outline',
          com: 'Course'
        },
        //首页新闻组件
        news: {
          name: '新闻设置',
          icon: 'el-icon-news',
          com: 'News'
        }
      },
      //向表单传值（右侧）
      props: {},
      //显示右侧组件
      showRight: false,
      //拖拽的组件类型（左侧）
      type: null,
      //组件是否已添加到（中间）
      isAdded: false,
      className: {
        1: 'one',
        2: 'two',
        3: 'three'
      }
    }
  },
  computed: {
    ...mapState({
      componentsList: state => state.componentsList
    }),
    //头部信息
    info() {
      return this.view[0]
    }
  },
  mounted() {
    if(this.$route.params.id) {
      this.type = 'edit'
      this.getSetting()
    }
  },
  methods: {
    //编辑页获取数据
    getSetting() {
      getSettingB({ id: this.$route.params.id }).then(res => {
        if(res.data.code === '0') {
          let detail = JSON.parse(res.data.content)
          this.settingForm.settingTitle = detail.title
          this.view = JSON.parse(detail.content)
        }
      }).catch(err => {
        this.$message.error(res.data.desc)
      })
    },
    //上传设置
    uploadData() {
      this.$confirm('确定保存并上传该设置？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          if(this.type === 'edit') {
            //修改
            editSettingB({
              id: this.$route.params.id,
              title: this.settingForm.settingTitle,
              content: JSON.stringify(this.view)
            }).then(res => {
              if(res.data.code == 0) {
                this.$message.success(res.data.desc)
              }
            }).catch(err => {
              this.$message.error(res.data.desc)
            })
          } else {
            //创建
            if(!this.settingForm.settingTitle) {
              this.$message.error('请填写设置名后再提交~')
              return
            }
            createSettingB({
              title: this.settingForm.settingTitle,
              content: JSON.stringify(this.view)
            }).then(res => {
              if(res.data.code == 0) {
                this.$message.success(res.data.desc)
              }
            }).catch(err => {
              this.$message.error(res.data.desc)
            })
          }
          this.loading = false
        }).catch(err => {
          console.log(err)
        })
    },
    //开始拖拽
    dragStart(e) {
      this.type = e.target.dataset.type    
      let list = this.view.filter(i => i.type === this.type)
      //console.log(this.view)
      //console.log(list)
      if(list.length >= 1){
        this.$message.error('相同组件只能添加一次')
        this.dragEnd(e)
        return
      }
    },
    //结束拖拽
    dragEnd(e) {
      this.$delete(this.view[this.index], 'status')
      this.isAdded = false
      this.type = null
    },
    //放到指定位置
    drop(e) {
      if (!this.type) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      this.dragEnd(e)
    },
    //到达指定位置
    dragOver(e) {
      if (!this.type) { 
        return
      }
      e.preventDefault()
      e.stopPropagation()

      let className = e.target.className
      let name = className !== 'view-content' ? 'item' : 'view-content'
      //默认数据, status = 2为拖动状态
      const defaultData = {
        type: this.type,    // 组件类型
        status: 2,          // 默认状态
        data: []            // 默认数据
      }
      //分行栏
      const separatorData = {
        color: '#1989fa',
        borderColor: '#1989fa',
        paddingLeft: 16,
        paddingRight: 16,
        icon: 'thumb-circle-o',
        iconColor: '#1989fa',
        name: '我们的课程'
      }
      //教师简介
      const introData = {
        contents: ['Vince老师' ,'多年英语教学经验', '助力孩子英语能力长足提高']
      }
      //视频
      const videoData = {
        //link: 'https://v.qq.com/txp/iframe/player.html?vid=k3223ziv8nq',
        link: 'https://player.youku.com/embed/XNTA5NzE0MDUzNg==',
        videoStyle: 'width:100%;height:310px;'
      }
      //内容
      const courseData = {
        contents: [
          {
            title: '英语入门', 
            name: 1, 
            icon: 'shop-o', 
            color: '#1989fa', 
            text: [
              {
                subtitle: '沉浸式英语教学', content: '在教学过程中，根据学生的情况尽量增加学生对英语的使用，让学生熟悉语言环境，提高英语意识'
              },
              {
                subtitle: '合理的难度梯度和科学的等级', content: '根据教材的梯度，学生在每个阶段都会达到相应的教学目标，保证一定阶段的学习以后学生稳步提高，同时配备辅助教材，提高孩子兴趣'
              },
              {
                subtitle: '保证产出，杜绝哑巴英语', content: '教学过程中以产出为目的，严格要求孩子，杜绝只顾兴趣，不顾成果的结果，让孩子一直以正确的方式开口说英语'
              }
            ]
          },
          {
            title: '英语提升', 
            name: 2, 
            icon: 'shop-o', 
            color: '#1989fa', 
            text: [
              {
                subtitle: '定制教材', content: '学校课本为主，个性化定制教辅内容'
              },
              {
                subtitle: '课堂设置', content: '考试导向，重分数产出，英语实际使用能力兼备'
              },
              {
                subtitle: '附赠服务', content: '免费试卷精讲+免费助教服务'
              }
            ]
          },
          {
            title: '四六级考研', 
            name: 3, 
            icon: 'shop-o', 
            color: '#1989fa', 
            text: [
              {
                subtitle: '定制教材', content: '学校课本为主，个性化定制教辅内容'
              },
              {
                subtitle: '课堂设置', content: '考试导向，重分数产出，英语实际使用能力兼备'
              },
              {
                subtitle: '附赠服务', content: '免费试卷精讲+免费助教服务，为四六级和考研的你提供最直接，最有效的复习计划和辅导。'
              }
            ]
          },
          {
            title: '托福雅思培训', 
            name: 4, 
            icon: 'shop-o', 
            color: '#1989fa', 
            text: [
              {
                subtitle: '个性化的课程', content: '为每个学生其制定合理的复习规划和建议'
              },
              {
                subtitle: '强有力的师资', content: '讲师精通托福考试和学校申请，能够为学生提供最强有力的学习助力'
              },
              {
                subtitle: '严格的监督制度', content: '详尽的课下任务，保证学生课下练习的强度'
              },
              {
                subtitle: '务实的教学模式', content: '教学有效对接托福考试内容，不做无用功'
              },
              {
                subtitle: '高效的练习方式', content: '合理制定练习目标及方式，提高效率，快速出分'
              }
            ]
          },
          {
            title: '留学申请培训', 
            name: 5, 
            icon: 'shop-o', 
            color: '#1989fa', 
            text: [
              {
                subtitle: '第一步：选校，选专业，选导师', content: '前期学校及专业查询筛选，根据申请者情况量身定制申请方案'
              },
              {
                subtitle: '第二步：完成文书推荐信简历', content: '申请者提供相关资料，完成文书推荐信简历等，质量保证'
              },
              {
                subtitle: '第三步：网申表格填写', content: '申请者提供相关资料，完成填写'
              },
              {
                subtitle: '第四步：联系套词，等待录取', content: '申请阶段协助联系学校，套词教授，等待最终录取'
              }
            ]
          },
          {
            title: '文章精批', 
            name: 6, 
            icon: 'shop-o', 
            color: '#1989fa', 
            text: [
              {
                subtitle: '托福雅思作文精批及讲解', content: '提供精细批改及免费30分钟讲解服务'
              },
              {
                subtitle: '初高中英语作文精批及讲解', content: '提供精细批改及免费30分钟讲解服务'
              },
              {
                subtitle: '四六级英语作文精批及讲解', content: '提供精细批改及免费30分钟讲解服务'
              }
            ]
          }
        ]
      }
      //新闻
      const newsData = {
        contents: [
          {title: '拜登总统就任典礼签署17项行政命令，留学生移民迎来新时代...', link: 'https://mp.weixin.qq.com/s/j3Tvn7lZuAwexgTf4oUUng'},
          {title: '拜登欢迎留学生：博士直接拿绿卡，扩大就业签证配额...', link: 'https://mp.weixin.qq.com/s/9YYTOtWiHTVsIEE962xbqQ'}
        ]
      }
      //加入组件特殊数据
      let data = {}
      if(this.type === 'video') {
        data = Object.assign(videoData, defaultData)
      } else if (this.type === 'course') {
        data = Object.assign(courseData, defaultData)
      } else if (this.type === 'news') {
        data = Object.assign(newsData, defaultData)
      } else if (this.type === 'separator') {
        data = Object.assign(separatorData, defaultData)
      } else if (this.type === 'intro') {
        data = Object.assign(introData, defaultData)
      } else {
        data = defaultData
      }
      if (name == 'view-content') {
        //父组件容器
        if (!this.isAdded) {
          this.index = this.view.length
          this.isAdded = true
          this.view.push(data)
        }
      } else if (name == 'item') {
        //子组件
        let target = e.target
        let [ y, h, curIndex ] = [ e.offsetY, target.offsetHeight, target.dataset.index ]
        let direction = y < (h / 2)
        if (!this.isAdded) {
          //放到子组件上部还是下部
          if (direction) {
            if (curIndex == 0) {
                this.view.unshift(data)
            } else {
                this.view.splice(curIndex, 0, data)
            }
          } else {
            curIndex = +curIndex + 1
            this.view.splice(curIndex, 0, data)
          }
        } else {
          //移动
          if (direction) {
            var i = curIndex == 0 ? 0 : curIndex - 1
            var result = this.view[i]['status'] == 2
          } else {
            var i = +curIndex + 1
            var result = this.view.length > i && this.view[i]['status'] == 2
          }

          if (result) return

          const temp = this.view.splice(this.index, 1)
          this.view.splice(curIndex, 0, temp[0])
        }
        this.index = curIndex
        this.isAdded = true
      }
      //console.log(this.view)
    },
    //切换视图（右侧）
    selectType(index, item) {
      this.showRight = false
      //根据类型不同，选择不同的view组件，头部组件index恒为1
      if (index === 0) {
        this.props = this.view[0]
      } else if (item.type === 'banner') {
        let data = this.view.filter(i => i.type === 'banner')
        this.props = data[0]
      } else if (item.type === 'video') {
        let data = this.view.filter(i => i.type === 'video')
        this.props = data[0]
      } else if (item.type === 'course') {
        let data = this.view.filter(i => i.type === 'course')
        this.props = data[0]
      } else if (item.type === 'news') {
        let data = this.view.filter(i => i.type === 'news')
        this.props = data[0]
      } else if (item.type === 'separator') {
        let data = this.view.filter(i => i.type === 'separator')
        this.props = data[0]
      } else if (item.type === 'intro') {
        let data = this.view.filter(i => i.type === 'intro')
        this.props = data[0]
      }
      this.$nextTick(() => {
        this.showRight = true
      })
    },
    //删除组件（中间）
    deleteItem(e, index) {
      e.preventDefault()
      e.stopPropagation()
      this.view.splice(index, 1)
      this.props = {}
      this.showRight = false
    }
  },
  components: {
    Sticky,
    Draggable,
    //总编辑组件
    Editor,
    //轮播图设置组件
    Banner,
    //教师简介设置
    Intro,
    //分栏行设置
    Separator,
    //视频设置组件
    Video,
    //内容设置组件
    Course,
    //新闻设置组件
    News
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  padding-right: 10px;
}
.special-wrapper {
  display: flex;
  justify-content: center;
  padding: 15px;
  background: #f7f8f9;
  position: relative;
  padding-top: 40px;
  .left-content, .right-content {
    width: 350px;
    padding: 15px 0;
    background: #fff;
    margin: 0 5px;
    box-shadow: 0 2px 6px #ccc;
  }
  .left-content {
    height: 650px;
    .content-wrapper {
      .content-item {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: default;
        list-style: none;
        font-size: 14px;
        color: #666;
        float: left;
        margin: 0 10px;
        border-radius: 6px;
        transition: all .3s;
        cursor: pointer;
        &:hover{
          background: #efefef;
        }
        span{
          display: block;
          font-size: 40px;
          margin-bottom: 8px;
          color: #999;
        }
        p{
          display: block;
          margin: 0;
          font-size: 12px;
        }
      }
    } 
  }
  .center-content {
    width: auto;
    max-width: 400px;
    position: relative;
    margin: 0 15px;
    .center-header {
      position: absolute;
      top: 0;
      background: #fff;
      z-index: 7;
      transition: all .3s;
      & * {
        pointer-events: none;
      }
      &:hover {
        transform: scale(0.95);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px #afafaf;
      }
      .header-title {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
      }
      img {
        max-width: 100%;
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor;
      }
    }
    .center-body {
      .view-content {
        width: 400px;
        height: 610px;
        background: #f5f5f5;
        overflow-y: auto;
        overflow-x: hidden;
        box-shadow: 0 2px 6px #ccc;
        padding-top: 72px;
        &::-webkit-scrollbar{
          width: 6px;
        }
        &::-webkit-scrollbar-thumb{
          background: #dbdbdb;
        }
        &::-webkit-scrollbar-track{
          background: #f6f6f6;
        }
        
        .item{
          transition: all .3s;
          background: #fff;
          &:hover{
            transform: scale(0.95);
            border-radius: 10px;
            box-shadow: 0 0 10px #afafaf;
            .el-icon-error{
              display: block;
            }
          }
          div{
            pointer-events: none;
          }
          .wait{
            background: #e8f0fa;
            height: 35px;
            text-align: center;
            line-height: 35px;
            font-size: 12px;
            color: #666;
          }
          .el-icon-error{
            position: absolute;
            right: -10px;
            top: -6px;
            color: red;
            font-size: 25px;
            cursor: pointer;
            display: none;
            z-index: 8;
          }
        }
      }
    }
  }
  .right-content {
    .editor-title {
      text-align: center;
      font-size: 14px;
      color: #606266;
    }
  }
  // .submit-btn{
  //   position: absolute;
  //   bottom: 30px;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }
}
</style>