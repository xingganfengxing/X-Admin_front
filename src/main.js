import Vue from 'vue'
import App from './App'
import ElementUI from './other/element-ui/element-ui'
import router from './other/vue/routers/router'
import filter from './other/vue/filters/filter'
import directive from './other/vue/directives/directive'
import axios from './other/axios/axios'
import store from './other/vuex/store'
import './common/icon.css'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box');



