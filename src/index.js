import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import Vant from 'vant'
import Element from 'element-ui'
import Moment from 'moment'
import axios from 'axios'
import * as echarts from 'echarts'

import 'font-awesome/css/font-awesome.min.css'
import 'vant/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/css/index.scss'
import 'assets/css/app.styl'
//moment
import 'moment/locale/zh-cn'

//自定义表格操作
import TableToolbar from "@/components/TableToolbar"
import Pagination from "@/components/Pagination"

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// 全局组件挂载
Vue.component('TableToolbar', TableToolbar)
Vue.component('Pagination', Pagination)

Vue.use(Vant)
Vue.use(Element)
Vue.use(Moment)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
