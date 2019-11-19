<template>
<!-- 추가해야하는 데이터를 home에 올릴것임 -->
  <div class="todo-input">
    <div class="input-group">
      <!-- keydown.enter : 엔터키를 눌렀을때 -->
      <input type="text" class="form-control" v-model="title" @keydown.enter="createTodo">
      <span class="input-group-btn">
        <button class="btn btn-primary" @click="createTodo">+</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoInput',
  data: function(){
    return {
      title: '',
    }
  },
  methods: {
    createTodo: function(){
      // 부모한테 올려줄 이름, 데이터
      this.$emit('createTodo', this.title)
      this.title = ''
    }
  }
}
</script>

<style>

</style>