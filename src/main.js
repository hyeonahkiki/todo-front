import Vue from 'vue'
import App from './App.vue'
// 추가된 사항
import router from './router'
// ??????????????????
import VueSession from 'vue-session'

Vue.config.productionTip = false
Vue.use(VueSession)



new Vue({
  // 추가된 사항
  router,
  render: h => h(App)
}).$mount('#app')
