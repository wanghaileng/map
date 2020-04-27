import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import echarts from 'echarts'//引入二charts
Vue.prototype.$echarts = echarts

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
