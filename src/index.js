import Vue from 'vue'
import router from './router'
import App from './App'

import { Button, Tabbar, TabbarItem } from 'vant'

import 'assets/css/app.styl'

Vue.use(Button)
Vue.use(Tabbar);
Vue.use(TabbarItem);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
