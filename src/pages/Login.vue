<template>
<div>
  <TopPart :isLogin="true" />
  <van-tabs v-model="activeWay" style="margin-top:46px">
    <van-tab title="用户名登录" name="username">
      <van-form class="custom-form" @submit="onSubmit" @fail="onFailed">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
          clearable>
          <template #button>
            <van-button size="small" type="primary" @click="testName">检测</van-button>
          </template>
        </van-field>
        <van-notice-bar mode="closeable">*用户名不可重复，注册请先检测</van-notice-bar>
        <van-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="密码"
          :right-icon="showPassword ? 'closed-eye' : 'eye-o'"
          @click-right-icon="togglePassword"
          :rules="[{ required: true, validator, message: '请按要求填写密码' }]"
          clearable
        />
        <van-notice-bar mode="closeable">*密码需包含数字和字母，最少为5位</van-notice-bar>
        <div class="strongness-indicator">
          <div class="indicator" :class="{'red':strongness===1}">弱</div>
          <div class="indicator" :class="{'orange':strongness===2}">中</div>
          <div class="indicator" :class="{'green':strongness>=3}">强</div>
        </div>
        <!-- 待做：手机验证码 -->
        <div style="margin:16px">
          <van-button round block type="info" native-type="submit">登录/注册</van-button>
        </div>
        <div style="margin:16px">
          <van-notice-bar mode="closeable">*自动注册/登录，请妥善保存密码</van-notice-bar>
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
              style="padding:0 20px" 
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
        <div style="margin:16px">
          <van-button round block type="info" native-type="submit">登录/注册</van-button>
        </div>
        <div style="margin:16px">
          <div class="hint">*未注册用户将自动注册</div>
        </div>
      </van-form>
    </van-tab> -->
  </van-tabs>
</div>   
</template>

<script>
import TopPart from 'components/Home/TopPart'
import { register, testNameB } from '../api/user'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      activeWay: 'username',
      //用户名
      username: '',
      password: '',
      //强度指数
      strongness: undefined, 
      showPassword: false,
      //手机号验证码
      phone: '',
      code: '',
      //是否已发送验证码
      codeSended: false,
      //倒计时
      countDown: ''
    }
  },
  watch: {
    password(newVal, oldVal) {
      this.strongness = this.checkPassword(newVal)
    }
  },
  methods: {
    ...mapMutations(['userLogin']),
    //校验用户名
    testName() {
      if(!!this.username) {
        testNameB({ username: this.username }).then(res => {
          if(res.data.code === '0') {
              this.$toast.success(res.data.desc)
            } else {
              this.$toast.fail(res.data.desc)
              this.username = ''
            }
          }).catch(err => {
            this.$toast.fail(res.data.desc)
          })
      } else {
        return
      }
    },
    //校验密码
    validator(val) {
      if(val.length < 5) {
        return false
      } else if (this.strongness < 2) {
        return false
      } else {
        return true
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    checkPassword(val) {
      let modes = 0
      //至少5位
      if (val.length < 5) return modes
      if (/\d/.test(val)) modes++ //数字1
      if (/[a-z]/.test(val)) modes++ //小写2
      if (/[A-Z]/.test(val)) modes++ //大写3
      if (/\W/.test(val)) modes++ //特殊字符4

      //逻辑处理
      switch (modes) {
        case 1:
          return 1
          break
        case 2:
          return 2
          break
        case 3:
        case 4:
          return val.length < 4 ? 3 : 4
          break
      }
      return modes
    },
    onSubmit(values) {
      console.log('submit', values)
      // testNameB({ username: values.username }).then(res => {
      //   if(res.data.code === '0') {
      let data = {
        username: values.username,
        password: values.password
      }
      register(data).then(res => {
        //console.log(res)
        if(res.data.code === '0') {
          this.$toast.success(res.data.desc)
          this.userLogin(res.data)
          if(this.$route.query && this.$route.query.redirect) {
            this.$router.replace({ path: this.$route.query.redirect })
          } else {
            this.$router.replace({ name: 'User' })
          }
        } else {
          this.$toast.fail(res.data.desc)
        }
      }).catch(err => {
        this.$toast.fail(res.data.desc)
      })
    },
    onFailed(errors) {
      console.log('failed', errors)
    },
    sendCode() {
      this.$toast.success("已发送")
      this.codeSended = true
      this.countDown = 60
      let timer = setInterval(() => {
        this.countDown--
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

.strongness-hint 
  color #ee0a24
  font-size 14px
  margin 10px 0 10px 15px

.strongness-indicator
  display flex
  justify-content flex-start
  align-items center
  border 0.5px solid #f1f1f1
  width 161px
  border-radius 20px
  margin-left 15px 
  .indicator
    font-size 14px 
    padding 2px 20px
  .red
    border-top-left-radius 20px
    border-bottom-left-radius 20px
    background-color #ff5c33
    color #fff
  .orange
    background-color #ff944d
    color #fff
  .green
    border-top-right-radius 20px
    border-bottom-right-radius 20px
    background-color #73e600
    color #fff
</style>
<style lang="scss">
.van-cell {
  align-items: center!important;
}
</style>