import Vue from 'vue'
import router from './router'
import App from './App'

import { Button, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, NavBar, Toast, Collapse, CollapseItem} from 'vant'

import 'assets/css/app.styl'

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
