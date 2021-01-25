<template>
<div>
  <TopPart :isLogin="true" />
  <van-form class="custom-form" @submit="onSubmit" @fail="onFailed">
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
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
</div>   
</template>

<script>
import TopPart from 'components/Home/TopPart'
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    onFailed(errors) {
      console.log('failed', errors);
    },
  },
  components: {
    TopPart
  }
}
</script>

<style lang="stylus" scoped>
.custom-form
  margin-top 66px
.hint 
  color #ee0a24
  font-size 14px
  text-align center
</style>