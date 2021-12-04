import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/border.css'
import '@/assets/css/reset.css'
import '@/assets/js/rem.js'
import './assets/iconfont/iconfont.css'
import axios from 'axios'
import ToastPlugin from '@/plugins/Toast.js'
import LoadingPlugin from '@/plugins/Loading.js'
import VConsole from 'vconsole'

// eslint-disable-next-line no-new
new VConsole()
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

// 接口拦截
axios.interceptors.response.use(response => {
  const res = response.data
  if (res.status === 1) {
    return res.data
  } else if (res.status === 0) {
    console.log(res)
    return Promise.reject(res)
  }
}, error => {
  console.log(error)
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
