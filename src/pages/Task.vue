<template>
<div class="container">
    <TopPart :isLogin="false" :isFunc="true" />
    <!-- 打卡任务 -->
    <van-form style="margin-top:86px;" >
        <van-checkbox v-model="task1" shape="square">是否完成听写任务</van-checkbox>
        <van-checkbox v-model="task2" shape="square">是否发送练习视频</van-checkbox>
    </van-form>
    <div>
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">一键打卡</van-button>
    </div>
</div>
</template>

<script>
import TopPart from 'components/Home/TopPart'

export default {
    data() {
        return {
            task1: true,
            task2: true
        }
    },
    components: {
        TopPart
    }
}
</script>

<style lang="stylus" scoped>
.container
    width 100%
    text-align center
</style>