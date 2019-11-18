import Vue from 'vue'
import App from './App.vue'
// 추가된 사항
import router from './router'

Vue.config.productionTip = false

new Vue({
  // 추가된 사항
  router,
  render: h => h(App)
}).$mount('#app')
