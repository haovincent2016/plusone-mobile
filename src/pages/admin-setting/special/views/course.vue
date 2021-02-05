<template>
  <div class="courses">
    <van-collapse v-model="activeNames">
      <van-collapse-item 
        v-for="item in list" 
        :key="item.id" 
        :title="item.title" 
        :name="item.name" 
        :icon="item.icon" 
        :color="item.color" 
        value="更多"
        >
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
.subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #888;
}
.subcontent {
  font-size: 14px;
}
</style>