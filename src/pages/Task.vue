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
    <div style="margin:15px 0;">
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">一键打卡</van-button>
    </div>
</div>
</template>

<script>
import TopPart from 'components/Home/TopPart'
import Steps from "components/Common/Steps"

export default {
    data() {
        return {
            task1: true,
            task2: true,
            currStep: 1,
            stepList: ['1天', '2天', '3天', '4天', '5天', '6天']
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
    background-color #f1f1f1
.number
    font-size 20px
    line-height 44px
</style>