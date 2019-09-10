import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import './assets/base.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
Vue.prototype.$axios = axios


new Vue({
  render: h => h(App),
  router
}).$mount('#app')