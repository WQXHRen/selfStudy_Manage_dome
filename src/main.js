import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import './assets/base.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

import axios from 'axios'
import JSONbig from 'json-bigint';
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
axios.defaults.transformResponse = [
  function (data) {
    try {
      return JSONbig.parse(data);
    } catch (error) {
      return data;
    }
  }
]
Vue.prototype.$axios = axios


new Vue({
  render: h => h(App),
  router
}).$mount('#app')