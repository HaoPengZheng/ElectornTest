import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
// 引入element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './icons/iconfont.js'
import './icons/iconfont.css'
// 引入vuescroll滚动条
import vuescroll from 'vuescroll'
import ops from '@/utils/scrollOptions.js'
import 'vuescroll/dist/vuescroll.css'
import './notification'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(ElementUI)
Vue.use(vuescroll, {ops: ops, name: 'vueScroll'})
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
