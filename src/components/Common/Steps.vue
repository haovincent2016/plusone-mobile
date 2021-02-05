<template>
  <ul class="steps">
      <li
        v-for="(item,index) in list"
        :key="index"
        :class="{ 'active' : step === index }">
        {{ item }}
      </li>
  </ul>
</template>
<script>
export default {
  props: {
    step: {
      type: Number,
      default: -1
    },
    list: {
      type: Array
    }
  }
}
</script>

<style scoped>
.steps {
  height: 55px;
  background: #fff;
  padding: 10px 0;
  position: relative;
  margin:20px 10px;
  counter-reset: step; /*创建步骤数字计数器*/
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/*步骤描述*/
.steps li {
  list-style-type: none;
  font-size: 12px;
  text-align: center;
  position: relative;
  flex-wrap: nowrap;
}

/*步骤数字*/
.steps li:before {
  display: block;
  content: counter(step); /*设定计数器内容*/
  counter-increment: step; /*计数器值递增*/
  width: 32px;
  height: 32px;
  background-color: #1989fa;
  line-height: 32px;
  border-radius: 32px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin: 0 auto 8px auto;
}

/*连接线*/
.steps li ~ li:after {
  content: "";
  width: 100%;
  height: 2px;
  background-color: #1989fa;
  position: absolute;
  left: -50%;
  top: 15px;
  z-index: -1; /*放置在数字后面*/
}

/*将当前/完成步骤之前的数字及连接线变绿*/
.steps li.active:before,
.steps li.active:after {
  background-color: #1989fa;
}

/*将当前/完成步骤之后的数字及连接线变灰*/
.steps li.active ~ li:before,
.steps li.active ~ li:after {
  background-color: #ddd;
}
</style>