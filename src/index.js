import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

import { Step, Steps, Checkbox, Uploader, CountDown, Form, Tab, Tabs, Col, Row, Image as VanImage, Field, Switch, DropdownMenu, DropdownItem, Icon, Cell, CellGroup, Popup, NoticeBar, Dialog, Button, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, NavBar, Toast, Collapse, CollapseItem, Divider} from 'vant'

import 'font-awesome/css/font-awesome.min.css'
import 'assets/css/app.styl'

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(Step)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.use(Uploader)
Vue.use(CountDown)
Vue.use(Form)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.use(Field)
Vue.use(Switch)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Popup)
Vue.use(NoticeBar)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Divider)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
