<template>
  <div class="courses">
    <van-collapse v-model="activeNames">
      <van-collapse-item 
        v-for="item in list" 
        :key="item.id" 
        :name="item.name" 
        value="更多"
        >
        <template #title>
          <div class="fix"><van-icon :name="item.icon" :color="item.color" />{{ item.title }}</div>
        </template>
        <div v-for="subitem in item.text" :key="subitem.id">
          <div class="subtitle">{{ subitem.subtitle }}</div>
          <div class="subcontent">{{ subitem.content }}</div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  name: 'Course',
  props: ['data'],
  data() {
    return {
      activeNames: [1, 2, 3, 4, 5, 6],
      list: []
    }
  },
  mounted() {
    this.list = this.data.contents
  }
}
</script>

<style lang="scss" scoped>
.fix {
  display: flex;
  align-items: center;
}
.subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #888;
}
.subcontent {
  font-size: 14px;
}
</style>