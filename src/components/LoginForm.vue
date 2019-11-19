<template>
  <div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="login-div col-6 offset-3">
        <!-- 에러가 있을때만 보여주면 됨 -->
      <div v-if="errors.length" class="error-list alert alert-danger">
        <!-- for문을 몇번 돌았는지에 대한 idx -->
        <!-- vue validator를 활용해서 검증할 수도 있다. -->
        <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>
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
      errors: [],
    }
  },
  methods: {
    login(){
      // checkForm이 true이면
      if (this.checkForm()){
        console.log('로그인시도!!')
        axios.post('http://localhost:8000/api-token-auth/', this.credential)
        .then((res)=>{
          this.loading = true
   
          // session이라는 공간이 생김
          this.$session.start()
          // jwt라는 이름에 res.data.token을 저장한다.
          this.$session.set('jwt', res.data.token)
          //여기서는 home으로
          router.push('/')
        })
        .catch((e)=>{
          this.loading = true
          console.log(e)
        })
      }
    },
    // 사용자가 넣은 input을 검증하는 함수(django에서는 검증이 바로됬는데
    // 여기는 분리 되어어서 따로 검증 필요)
    checkForm(){
      this.errors = []
      if (this.credential.password.length < 8){this.errors.push("비밀번호는 8글자가 넘어야합니다.")}
      //  앞에 느낌표는: 없다면
      if (!this.credential.username){this.errors.push('아이디를 입력해주세요.')}
      console.log(this.errors)
      if(this.errors.length ===0){
        return true
      }
    }

  }
}
</script>

<style>

</style>