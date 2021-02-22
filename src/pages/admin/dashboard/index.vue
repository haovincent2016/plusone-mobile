<template>
 <!-- 首页图标展示区 -->
 <!-- 使用echarts -->
 <!-- https://www.cnblogs.com/ludeng-blog/p/12531903.html -->
  <div>
    <div class="chart-wrapper" id="customchart1"></div>
    <div class="chart-wrapper" id="customchart2"></div>
    <div class="chart-wrapper" id="customchart3"></div>
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
		  let visitChart = this.$echarts.init(document.getElementById('customchart1'))
      let viewerChart = this.$echarts.init(document.getElementById('customchart2'))
      let interactionChart = this.$echarts.init(document.getElementById('customchart3'))

		  let visitOption = {
			  title: {
				  text: '网站访问量统计'
			  },
			  tooltip: {},
			  legend: {
				  data:['访问量']
			  },
			  xAxis: {
				  data: ["2/11","2/12","2/13","2/14","2/15","2/16"]
			  },
			  yAxis: {},
			  series: [{
				  name: '访问量',
				  type: 'bar',
				  data: [5, 20, 36, 10, 10, 20]
			  }]
      }
      let viewerOption = {
        title: {
				  text: '网站访客年龄分布'
			  },
        series : [
          {
            name: '年龄分布',
            type: 'pie',
            radius: '55%',
            data:[
              {value:235, name:'儿童'},
              {value:274, name:'少年'},
              {value:310, name:'青年'},
              {value:135, name:'中年'},
              {value:124, name:'老年'}
            ],
            roseType: 'angle',
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      let interactionOption = {
        title: {
				  text: '交互图'
			  },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        dataZoom: [
          {
            type: 'slider',
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: 'scatter',
            type: 'scatter',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            symbolSize: function (val) {
              return val[2] * 30;
            },
            data: [["14.616","7.241","0.896"],["3.958","5.701","0.955"],["2.768","8.971","0.669"],["9.051","9.710","0.171"],["14.046","4.182","0.536"],["12.295","1.429","0.962"],["4.417","8.167","0.113"],["0.492","4.771","0.785"],["7.632","2.605","0.645"],["14.242","5.042","0.368"]]
          }
        ]
      }

      visitChart.setOption(visitOption)
      viewerChart.setOption(viewerOption)
      interactionChart.setOption(interactionOption)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
	width: 600px;
	height:400px;
	padding: 15px;
}
</style>