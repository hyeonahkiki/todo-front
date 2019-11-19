import Vue from 'vue'
import App from './App.vue'
// 추가된 사항
import router from './router'
// session을 쓰기위해서 가져와야한다.
import VueSession from 'vue-session'

Vue.config.productionTip = false
Vue.use(VueSession)



new Vue({
  // 추가된 사항
  router,
  render: h => h(App)
}).$mount('#app')
