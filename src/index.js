import Vue from 'vue'
import router from './router'
import App from './App'

import { Field, Switch, DropdownMenu, DropdownItem, Icon, Cell, CellGroup, Popup, NoticeBar, Dialog, Button, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, NavBar, Toast, Collapse, CollapseItem, Divider} from 'vant'

import 'assets/css/app.styl'

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
  render: h => h(App)
}).$mount('#app')
