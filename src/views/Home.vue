<template>
  <div class="home">
    <!-- 자식한테 받은 이벤트 : 부모에서 실행할 메소드 -->
    <TodoInput @createTodo="createTodo"/>
    <TodoList v-bind:todos="todos"/>    
  </div>
</template>

<script>
import router from '../router'
import TodoList from '../components/TodoList'
import TodoInput from '@/components/TodoInput'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    TodoList,
    TodoInput,
  },
  data: function(){
    return {
      todos:[]
    }
  },
  methods: {
    checkLoggedIn(){
      this.$session.start()
      // has : jwt를 가지고 있는지
      if (!this.$session.has("jwt")){
        // 로그인 페이지로 리다이렉트
        router.push('/login')
      }
    },
    getTodos(){
      this.$session.start()
      // get이 밸류값을 가져온다.
      const token = this.$session.get('jwt')
      const decodeedToken = jwtDecode(token)
      const user_id = decodeedToken.user_id
      // postman에서 header에 토큰값을 넣었던것처럼 넣어줘야한다. 
      // 그래야 사용자가 확인된다.(headers로 한번 더 감싸줘야함)
      const requestHeader = {
        headers:{
          Authorization: 'JWT ' + token
        }
      }

      // 장고서버에 axios요청보내기
      axios.get(`http://localhost:8000/api/v1/users/${user_id}/`, requestHeader)
      .then((res)=>{
        this.todos = res.data.todo_set
      })
      .catch((e)=>{
        console.log(e)
      })

    },
    // 자식에서 보낸 인자를 넣어주어야한다.
    createTodo(title){
      this.$session.start()
      const token = this.$session.get('jwt')
      const decodeedToken = jwtDecode(token)
      const user_id = decodeedToken.user_id
      const requestHeader = {
        headers:{
          Authorization: 'JWT ' + token
        }
      }
      // axios는 요청을 보내는 라이브러리
      // 데이터를 보내는 형식에 여러가지가 있는데 form-data는 테이블과 비슷 . 표 형태로 보냄(일반적)
      // 이 규격을 만드는 것이 new FormData를 만든는것
      // 규격을 사용해서 요청을 보내는 것. user, user_id를 같이 보내는거
      const requestForm = new FormData()
      requestForm.append('user', user_id)
      requestForm.append('title', title)

      axios.post('http://localhost:8000/api/v1/todos/', requestForm, requestHeader)
      .then((res)=>{
        this.todos.push(res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    },

  },
  // checkLoggedIn을 언제실행시킬지
  mounted: function(){
    // this안에 있는 checkLoggedIn함수
    this.checkLoggedIn()
    this.getTodos()
  }
}
</script>

<style>

</style>