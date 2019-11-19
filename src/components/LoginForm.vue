<template>
  <div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="login-div col-6 offset-3">
      <div class="form-group">
        <!-- for는 뭐랑 연결시킬지 -->
        <label for="id">ID</label>
        <input id="id" 
        class="form-control" 
        type="text" 
        v-model="credential.username">
      </div>
      <div class="form-group">
        <label for="password">PW</label>
        <input id="password" 
        class="form-control" 
        type="password"
        v-model="credential.password">
      </div>
      <button class="btn btn-primary" @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// index.js까지 쓰지 않아도 자동으로 불러와진다.
import router from '../router'

export default {
  // 데이터는 다른곳에서 접근이 안되고 LoginForm안에서만 접근가능
  data: function(){
    return {
      credential: {
        username: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    login(){
      console.log('로그인시도!!')
      axios.post('http://localhost:8000/api-token-auth/', this.credential)
      .then((res)=>{
        this.loading = true
        res.data.token
        // session이라는 공간이 생김
        this.$session.start()
        // ????????????????
        this.$session.set('jwt', res.data.token)
        //여기서는 home으로
        router.push('/')
      })
      .catch((e)=>{
        this.loading = true
        console.log(e)
      })
    }
  }
}
</script>

<style>

</style>