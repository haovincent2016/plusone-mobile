<template>
<div class="container">
    <TopPart :isLogin="false" :isFunc="true" />
    <!-- 积分 -->
    <van-row gutter="20" style="margin-top:76px;">
        <van-col span="12" class="number">346 积分</van-col>
        <van-col span="12"><van-button round type="info">获得积分</van-button></van-col>
    </van-row>
    <!-- 打卡进度 -->
    <Steps :step="currStep" :list="stepList" />
    <!-- 打卡任务 -->
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
    <van-uploader 
        :after-read="afterRead" 
        v-model="imageList" 
        multiple 
        :max-count="4" 
        :max-size="1000 * 1024"   
        @oversize="onOversize" 
    />

    <div style="margin:15px 0;">
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">一键打卡</van-button>
    </div>
</div>
</template>

<script>
import TopPart from 'components/Home/TopPart'
import Steps from "components/Common/Steps"
import { uploadTask } from '../api/task'

export default {
    data() {
        return {
            task1: true,
            task2: true,
            currStep: 1,
            stepList: ['1天', '2天', '3天', '4天', '5天', '6天'],
            imageList: [],
            imagePath: []
        }
    },
    methods: {
        afterRead(file) {
            //正在上传
            file.status = 'uploading'
            file.message = '上传中...'
            let formData = new FormData()
            // this.imageList.forEach(item => {
            //     formData.append('file', item)
            // })
            formData.append('file', file.file)
            //上传接口
            this.$axios.post('http://localhost:3000/task/uploadTask', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }).then(res => {
                if(res.data.code === '0') {
                    this.$toast.success("图片上传成功~")
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
    background-color #f3f3f3
    height: 100vh;
.number
    font-size 20px
    line-height 44px
</style>