<template>
<div class="full-width">
  <van-dropdown-menu>
    <van-dropdown-item v-model="country" :options="option" @change="getTitle" />
    <van-dropdown-item title="筛选" ref="item">
      <van-cell center title="套餐价">
        <template #right-icon>
          <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
        </template>
      </van-cell>
      <div style="padding: 5px 16px;">
        <van-button type="danger" block round @click="onConfirm">
          确认
        </van-button>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
  <!-- 套餐价 -->
  <div v-if="switch1">
    <van-cell-group>
      <van-cell icon="location-o" title="加拿大" value="3900（4所大学）" label="加拿大的大学，不限排名任选" />
      <van-cell icon="location-o" title="香港" value="3900（4所大学）" label="香港的大学，不限排名任选" />
      <van-cell icon="location-o" title="新加坡" value="2900（3所大学）" label="新加坡的大学，不限排名任选" />
    </van-cell-group>
  </div>
  <!-- 单选价 -->
  <div v-else>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      <van-icon class="icon-style" name="bullhorn-o" color="#1989fa" />
      {{ title }}
    </van-divider>
    <div v-if="country == 0">
      <van-cell title="TOP30" value="1500 / 所" />
      <van-field v-model="digit" type="digit" label="数量" placeholder="请输入申请数量" />
      <van-cell title="TOP 31 - 60" value="1200 / 所" />
      <van-field v-model="digit" type="digit" label="数量" placeholder="请输入申请数量" />
      <van-cell title="TOP 61 - 100" value="900 / 所" />
      <van-field v-model="digit" type="digit" label="数量" placeholder="请输入申请数量" />
      <van-cell title="TOP 100 -" value="600 / 所" />
      <van-field v-model="digit" type="digit" label="数量" placeholder="请输入申请数量" />
    </div>
    <div v-if="country == 1">
    </div>
    <div v-if="country == 2">
    </div>
    <div v-if="country == 3">
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: '美国申请',
      country: 0,
      switch1: false,
      option: [
        { text: '美国申请', value: 0 },
        { text: '英国申请', value: 1 },
        { text: '澳洲申请', value: 2 },
        { text: '其他申请', value: 3 },
      ],
      digit: ''
    };
  },
  methods: {
    onConfirm() {
      this.$refs.item.toggle();
    },
    getTitle() {
      switch(this.country) {
        case 0:
          this.title = '美国申请'
          break
        case 1:
          this.title = '英国申请'
          break
        case 2:
          this.title = '澳洲申请'
          break
        case 3:
          this.title = '其他申请'
          break
      }
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>