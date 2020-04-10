import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import Fastclick from 'fastclick'
import store from './store'
import './styles/common.scss'
import Axios from 'axios'
import './config/env'

Vue.prototype.$http = Axios

// 300ms
Fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
