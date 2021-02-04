<template>
<div class="container">
    <TopPart :isLogin="false" :isFunc="true" />
    <!-- 积分 -->
    <van-row gutter="20" class="topbar">
        <van-col span="12" class="number">{{ userInfo.points ? userInfo.points : 0 }} 积分</van-col>
        <van-col span="12"><van-button round type="info" @click="usePoints">使用积分</van-button></van-col>
    </van-row>
    <!-- 待做：打卡进度 -->
    <!-- <Steps :step="currStep" :list="stepList" />
    <div class="range">（本周:1/25 - 1/31）</div> -->
    <!-- 未打卡，一天只能打卡一次 -->
    <div v-if="!finishTask">
        <van-form style="margin:15px 10px" >
            <van-field label-width="9em" name="checkbox1" label="是否完成听写任务">
                <template #input>
                    <van-checkbox v-model="task1" shape="square" />
                </template>
            </van-field>
            <van-field label-width="9em" name="checkbox2" label="是否发送练习视频">
                <template #input>
                    <van-checkbox v-model="task2" shape="square" />
                </template>
            </van-field>
        </van-form>
        <!-- 上传听写图片，建议最多上传4张, 每张10M -->
        <div class="range">（上传你的听写图片，最多4张~）</div>
        <van-uploader 
            style="margin-top:15px"
            :after-read="afterRead" 
            v-model="imageList" 
            multiple 
            :max-count="4" 
            :max-size="1000 * 1024"   
            @oversize="onOversize"
            @click-preview="clickPreview"
        />

        <div style="margin:15px 0;">
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="saveTask">一键打卡</van-button>
        </div>
    </div>
    <!-- 已打卡 -->
    <div v-else>
        <div class="notice-container">
            太棒了，今天已成功打卡，明天再来吧~
        </div>
        <div style="margin:15px 0;">
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="goBack">返回</van-button>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import TopPart from 'components/Home/TopPart'
import Steps from "components/Common/Steps"
import { saveTaskB, getTaskB } from '@/api/task'
import baseUrl from '@/utils/setting'

export default {
    data() {
        return {
            task1: true,
            task2: true,
            currStep: 1,
            stepList: ['1天', '2天', '3天', '4天', '5天', '6天', '7天'],
            imageList: [],
            // 上传的图片路径
            imagePath: [],
            finishTask: false
        }
    },
    computed: mapState([ 'userInfo' ]),
    created() {
        this.checkTask()
    },
    methods: {
        afterRead(file) {
            //正在上传
            file.status = 'uploading'
            file.message = '上传中...'
            let formData = new FormData()
            formData.append('file', file.file)
            //上传接口
            this.$axios.post(baseUrl+'/task/uploadTask', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }).then(res => {
                if(res.data.code === '0') {
                    console.log(res.data)
                    this.imagePath.push(res.data.filename)
                    file.status = 'done'
                    file.message = '上传成功'
                } else {
                    //上传后，失败
                    file.status = 'failed'
                    file.message = '上传失败'
                }
            }).catch(err => {
                //上传后，失败
                file.status = 'failed'
                file.message = '上传失败'
            })
        },
        // 超过上传图片大小限制
        onOversize(file) {
            this.$toast.error('图片不能超过10MB~')
        },
        // 打开预览提示关闭操作
        clickPreview() {
            this.$toast({
                message: '点击任意位置关闭',
                icon: 'like-o'
            })
        },
        // 检查今日是否已打卡
        checkTask() {
            let data = {
                userId: this.userInfo.id 
            }
            getTaskB(data).then(res => {
                if(res.data.code === '0') {
                    if(res.data.detail && res.data.detail.length > 0) {
                        //已打卡
                        this.finishTask = true
                    }
                    //this.$toast.success(res.data.desc)
                } else {
                    this.$toast.fail(res.data.desc)
                }
            }).catch(error => {
                this.$toast.fail(res.data.desc)
            })
        },
        // 保存打卡信息
        saveTask() {
            if(this.imagePath.length === 0) {
                this.$toast({
                    message: '请上传听写图片~',
                    icon: 'like-o'
                })
                return
            }
            let data = {
                finishWrite: this.task1,
                finishVideo: this.task2,
                taskImages: this.imagePath.join(','),
                userId: this.userInfo.id
            }
            saveTaskB(data).then(res => {
                if(res.data.code === '0') {
                    this.$toast.success(res.data.desc)
                } else {
                    this.$toast.fail(res.data.desc)
                }
            }).catch(error => {
                this.$toast.fail(res.data.desc)
            })
        },
        // 返回用户页
        goBack() {
            this.$router.push({ name: 'User' })
        },
        // 查询一周打卡次数

        // 使用积分页
        usePoints() {

        }
    },
    components: {
        TopPart,
        Steps
    }
}
</script>

<style lang="stylus" scoped>
.container
    width 100%
    text-align center
    background-color #f5f5f5
    height: 100vh
.topbar
    margin 46px 10px 0px 10px
    padding 10px
    background-color #fefefe
    border-radius: 8px
.number
    font-size 20px
    line-height 44px
    font-weight 300
.range
    display flex
    font-size 13px
    color #a3a3a3
    justify-content center
.notice-container
    font-size 17px
    color #333
    margin 15px 10px 15px 10px
    padding 10px
    background-color #fefefe
    border-radius: 8px
</style>