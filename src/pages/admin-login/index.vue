<template>
<div class="admin-container">
  <van-tabs v-model="activeWay" style="margin-top:46px;">
    <van-tab title="管理员登录" name="username">
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
          <van-button round block type="info" native-type="submit">管理员登录</van-button>
        </div>
        <div style="margin:16px;">
          <van-button round block type="default" @click="returnHome">返回首页</van-button>
        </div>
      </van-form>
    </van-tab>
  </van-tabs>
</div>   
</template>

<script>
import { adminLoginB } from '@/api/admin'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      activeWay: 'username',
      //用户名密码
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapMutations(['adminLogin']),
    onSubmit(values) {
      console.log('submit', values);
      let data = {
        username: values.username,
        password: values.password
      }
      adminLoginB(data).then(res => {
        if(res.data.code === '0') {
          this.$toast.success(res.data.desc)
          this.adminLogin(res.data)
          if(this.$route.query && this.$route.query.redirect) {
            this.$nextTick(() => {
              this.$router.replace({ path: this.$route.query.redirect })
            })
          } else {
            this.$nextTick(() => {
              this.$router.replace({ name: 'Dashboard' })
            })
          }
        } else {
          this.$toast.fail(res.data.desc)
        }
      }).catch(err => {
        this.$toast.fail(res.data.desc)
      })
    },
    onFailed(errors) {
      console.log('failed', errors);
    },
    returnHome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.admin-container
  padding: 15px;
  margin: 15px
  border 1px solid #f5f5f5
  box-shadow 0 1px 4px rgba(0,21,41,.08)
.custom-form
  margin-top 26px
</style>