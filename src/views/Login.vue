<template>
<!-- LoginForm을 여기에 사용하고 부품부품 나누어서 만든 느낌 -->
  <div class="login">
    <h1>로그인 페이지 입니다.</h1>
    <!-- LoginForm 컴포넌트를 보여줘야한다. -->
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm,
  }
}
</script>

<style>

</style>