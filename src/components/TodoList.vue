<template>
  <div>
    <h1>todo</h1>
    <div class="card my-3" v-for="todo in todos" :key="todo.id">
      <div class="card-body d-flex justify-content-between">
        <span @click="updateTodo(todo)" :class="{completed: todo.completed}">{{todo.title}}</span>
        <!-- todo를 받아야하니까 deleteTodo함수에 인자로 넣어준다 -->
        <span @click="deleteTodo(todo)">🗑️</span>
      </div>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  name: 'TodoList',
  props: {
    todos: Array,
  },
  methods: {
    deleteTodo: function(todo){
    this.$session.start()
    const token = this.$session.get('jwt')
    const requestHeader = {
      headers: {
        Authorization: 'JWT '+ token
      }
    }
    axios.delete(`http://localhost:8000/api/v1/todos/${todo.id}/`, requestHeader)
    .then((res)=>{
      console.log(res)
      const targetTodo = this.todos.find(function(el){
        return el === todo
      })
      const idx = this.todos.indexOf(targetTodo)
      // idx에 있는 것을 지워줘
      if (idx > -1){
        this.todos.splice(idx)
      }


    })
    .catch((e)=>{
      console.log(e)
    })
  },
  updateTodo(todo){
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
    requestForm.append('title', todo.title)
    // true일때는 false, fasle일때는 true
    requestForm.append('completed', !todo.completed)

    axios.put(`http://localhost:8000/api/v1/todos/${todo.id}/`, requestForm, requestHeader)
    .then((res)=>{
      console.log(res)
      todo.completed = !todo.completed
    })
    .catch((e)=>{
      console.log(e)
    })
  }

  }
}
</script>

<style>
  .completed{
    text-decoration: line-through;
    color: darkgray
  }
</style>