import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/'
import echarts from 'echarts'

import './assets/base.css'
import './assets/iconfont/iconfont.css'

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

// 请求拦截 加 token
axios.interceptors.request.use(function (config) {
  if (config.url.indexOf('uthorization') != -1) {
    return config;
  }
  // 在发送请求之前做些什么
  let userinfo;

  try {
    userinfo = JSON.parse(window.localStorage.getItem('userInfo'));
    if (!userinfo) {
      Vue.prototype.$message.warning('请先登录!');
      router.push('/login');
      return;
    }

  } catch (error) {
    Vue.prototype.$message.warning('请先登录!');
    router.push('/login');
    return;
  }

  config.headers.Authorization = `Bearer ${userinfo.token}`

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // window.console.log(response);

  return response;
}, function (error) {
  // 对响应错误做点什么
  // window.console.dir(error);

  if (error.response.status == 401) {
    Vue.prototype.$message.warning('请先登录!');
    router.push('/login');
    return;
  }
  return Promise.reject(error);
});


Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')