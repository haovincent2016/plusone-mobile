<template>
<div class="full-width">
  <TopPart :isLogin="false" />
  <van-tabs v-model="activeName" style="margin-top:46px;">
    <van-tab title="课程" name="lesson">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        <van-icon class="icon-style" name="bullhorn-o" color="#1989fa" />
        课程价格
      </van-divider>
      <van-cell title="一对一课程" value="250 / 小时" />
      <van-cell title="2 - 3人班" value="150 / 小时" />
      <van-cell title="4 - 6人班" value="100 / 小时" />
    </van-tab>
    <van-tab title="文章" name="essay">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        <van-icon class="icon-style" name="bullhorn-o" color="#1989fa" />
        文书/作文
      </van-divider>
      <van-cell title="文书修改" value="0.5元 / 字" />
      <van-cell title="作文批改" value="价格面议" />
    </van-tab>
    <van-tab title="申请" name="application">
      <van-dropdown-menu class="my-menu">
        <van-dropdown-item v-model="country" :options="option" @change="getTitle" />
        <!-- <van-dropdown-item title="看套餐" ref="item">
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
        </van-dropdown-item> -->
      </van-dropdown-menu>
    
      <!-- 单选价 -->
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        <van-icon class="icon-style" name="bullhorn-o" color="#1989fa" />
        {{ title }}
      </van-divider>
      <div v-if="country == 0">
        <van-cell title="TOP30" value="1500 / 所" />
        <van-field v-model="us1" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="TOP 31 - 60" value="1200 / 所" />
        <van-field v-model="us2" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="TOP 61 - 100" value="900 / 所" />
        <van-field v-model="us3" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="TOP 101及之后" value="600 / 所" />
        <van-field v-model="us4" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="总计费用" :value="ustotal" />
        <div style="text-align:center;padding-top:4px;">
          <van-button plain hairline type="info" @click="resetUSAll">重置表格</van-button>
        </div>
      </div>
      <div v-if="country == 1">
        <van-cell title="*G5（5所大学）" value="1500 / 所" />
        <van-field v-model="uk1" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="非G5" value="1000 / 所" />
        <van-field v-model="uk2" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="总计费用" :value="uktotal" />
        <div style="text-align:center;padding-top:4px;">
          <van-button plain hairline type="info" @click="resetUKAll">重置表格</van-button>
        </div>
        <div class="notice">*英国G5超级精英大学包括剑桥大学、牛津大学、帝国理工学院、伦敦大学学院、伦敦政治经济学院</div>
      </div>
      <div v-if="country == 2">
        <van-cell title="*澳洲八大（8所大学）" value="1500 / 所" />
        <van-field v-model="oc1" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="非澳洲八大" value="1000 / 所" />
        <van-field v-model="oc2" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="总计费用" :value="uktotal" />
        <div style="text-align:center;padding-top:4px;">
          <van-button plain hairline type="info" @click="resetOCAll">重置表格</van-button>
        </div>
        <div class="notice">*澳大利亚八校联盟（Group of Eight，简称Go8或G8）包括墨尔本大学、蒙纳士大学、澳大利亚国立大学、悉尼大学、新南威尔士大学、西澳大学、阿德莱德大学、昆士兰大学</div>
      </div>
      <div v-if="country == 3">
        <van-cell title="加拿大" value="1100 / 所" />
        <van-field v-model="canada" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="香港" value="1100 / 所" />
        <van-field v-model="hk" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="新加坡" value="1100 / 所" />
        <van-field v-model="singapore" type="digit" label="数量" placeholder="请输入申请数量" />
        <van-cell title="总计费用" :value="othertotal" />
        <div style="text-align:center;padding-top:4px;">
          <van-button plain hairline type="info" @click="resetOtherAll">重置表格</van-button>
        </div>
      </div>
      <!-- 套餐价 -->
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        <van-icon class="icon-style" name="bullhorn-o" color="#1989fa" />
        套餐价
      </van-divider>
      <van-cell-group>
        <van-cell icon="location-o" title="加拿大" value="3900（4所大学）" label="加拿大的大学，不限排名任选4所" />
        <van-cell icon="location-o" title="香港" value="3900（4所大学）" label="香港的大学，不限排名任选4所" />
        <van-cell icon="location-o" title="新加坡" value="2900（3所大学）" label="新加坡的大学，不限排名任选3所" />
      </van-cell-group>

      <div class="notice" style="margin-bottom:80px;">*特别声明：如果申请的学校没有一所学校录取，全额退款</div>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import TopPart from 'components/Home/TopPart'

export default {
  data() {
    return {
      activeName: 'lesson',
      title: '美国申请',
      country: 0,
      switch1: false,
      option: [
        { text: '美国申请', value: 0 },
        { text: '英国申请', value: 1 },
        { text: '澳洲申请', value: 2 },
        { text: '其他申请', value: 3 },
      ],
      us1: 0,
      us2: 0,
      us3: 0,
      us4: 0,
      uk1: 0,
      uk2: 0,
      oc1: 0,
      oc2: 0,
      hk: 0,
      singapore: 0,
      canada: 0
    };
  },
  computed: {
    ustotal: function () {
      return this.us1 * 1500 + this.us2 * 1200 + this.us3 * 900 + this.us4 * 600
    },
    uktotal: function () {
      return this.uk1 * 1500 + this.uk2 * 1000
    },
    octotal: function () {
      return this.oc1 * 1500 + this.oc2 * 1000
    },
    othertotal: function () {
      return ( this.hk + this.singapore + this.canada ) * 1100
    }
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
    },
    resetUSAll() {
      this.us1 = 0
      this.us2 = 0
      this.us3 = 0
      this.us4 = 0
    },
    resetUKAll() {
      this.uk1 = 0
      this.uk2 = 0
    },
    resetOCAll() {
      this.oc1 = 0
      this.oc2 = 0
    },
    resetOtherAll() {
      this.hk = 0
      this.canada = 0
      this.singapore = 0
    }
  },
  components: {
    TopPart
  }
}
</script>

<style lang="stylus" scoped>
.icon-style
 font-size 20px
 margin-right: 4px
.notice
 margin 5px
 padding 5px
 border 1px solid #f1f1f1
 font-size 14px
 color #ee0a24
</style>