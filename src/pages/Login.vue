<template>
<div>
  <TopPart :isLogin="true" />
  <van-tabs v-model="activeWay" style="margin-top:46px;">
    <van-tab title="用户名登录" name="username">
      <van-form class="custom-form" @submit="onSubmit" @fail="onFailed">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin:16px;">
          <van-button round block type="info" native-type="submit">登录/注册</van-button>
        </div>
        <div style="margin:16px;">
          <div class="hint">*未注册用户将自动注册</div>
        </div>
      </van-form>
    </van-tab>
    <!-- <van-tab title="手机登录" name="phone">
      <van-form class="custom-form" @submit="onSubmit" @fail="onFailed">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="code"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button 
              native-type="button"
              v-if="!codeSended"
              @click="sendCode" 
              style="padding:0 20px;" 
              plain 
              hairline 
              type="info" 
              size="small">
              发送
            </van-button>
            <van-button
              class="count"
              native-type="button"
              v-if="codeSended"
              size="small">
              请{{countDown}}秒后再试
            </van-button>
          </template>
        </van-field>
        <div style="margin:16px;">
          <van-button round block type="info" native-type="submit">登录/注册</van-button>
        </div>
        <div style="margin:16px;">
          <div class="hint">*未注册用户将自动注册</div>
        </div>
      </van-form>
    </van-tab> -->
  </van-tabs>
</div>   
</template>

<script>
import TopPart from 'components/Home/TopPart'
import { register, login, getUserInfo } from '../api/request'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      activeWay: 'username',
      //用户名密码
      username: '',
      password: '',
      //手机号验证码
      phone: '',
      code: '',
      //是否已发送验证码
      codeSended: false,
      //倒计时
      countDown: ''
    };
  },
  methods: {
    ...mapMutations(['userLogin']),
    onSubmit(values) {
      console.log('submit', values);
      let data = {
        username: values.username,
        password: values.password
      }
      register(data).then(res => {
        console.log(res)
        if(res.code === '0') {
          this.$toast.success("登陆成功")
          this.userLogin(res.userInfo)
          this.$router.replace({ name: 'Home' })
        }
      })
    },
    onFailed(errors) {
      console.log('failed', errors);
    },
    sendCode() {
      this.$toast.success("已发送")
      this.codeSended = true
      this.countDown = 60
      let timer = setInterval(() => {
        this.countDown--;
        if(this.countDown <= 0) {
          this.countDown = ''
          clearInterval(timer)
          this.reset()
        }
      }, 1000)
    },
    reset() {
      this.codeSended = false
      this.$toast("您可以重新发送二维码")
    }
  },
  components: {
    TopPart
  }
}
</script>

<style lang="stylus" scoped>
.custom-form
  margin-top 26px
.hint 
  color #ee0a24
  font-size 14px
  text-align center
.count
  color #a1a1a1 
  font-size 11px
</style>