<template>
  <div class="home">
    <h1>Todos</h1>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'home',
  components: {

  },
  methods: {
    checkLoggedIn(){
      this.$session.start()
      // has : jwt를 가지고 있는지
      if (!this.$session.has("jwt")){
        // 로그인 페이지로 리다이렉트
        router.push('/login')
      }
    }
  },
  // checkLoggedIn을 언제실행시킬지
  mounted: function(){
    // this안에 있는 checkLoggedIn함수
    this.checkLoggedIn()
  }
}
</script>

<style>

</style>