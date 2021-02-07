<template>
 <!-- 首页图标展示区 -->
 <!-- 使用echarts -->
 <!-- https://www.cnblogs.com/ludeng-blog/p/12531903.html -->
  <div>
    <div id="customchart" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.customChart()
  },
  methods: {
    customChart() {
      // 基于准备好的dom，初始化echarts实例
		  let myChart = this.$echarts.init(document.getElementById('customchart'))
      
		  // 指定图表的配置项和数据
		  let option = {
			  title: {
				  text: 'ECharts'
			  },
			  tooltip: {},
			  legend: {
				  data:['销量']
			  },
			  xAxis: {
				  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			  },
			  yAxis: {},
			  series: [{
				  name: '销量',
				  type: 'bar',
				  data: [5, 20, 36, 10, 10, 20]
			  }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>