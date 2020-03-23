<template>
  <div class="wrapper-todo">
    <div class="title">
      {{ todo.title }}
    </div>

    <hr>

    <ul 
      class="list"
    >
      <li
        v-for="(item, index) in list"
        :key="index"
        class="item"
      >{{item.name}}</li>
    </ul>
    
    <div class="button-group">
      <router-link
        class="button btn-primary"
        :to="{ name: 'edit', params: { id: todo.id } }"
      >Edit</router-link>
      <button class="button btn-warning" @click="handleDelete(todo.id)">Delete</button>
    </div>

  </div>
</template>

<script>
import { mapActions } from "vuex";
// import "@/assets/todoItem.scss";

export default {
  props: {
    todo: {
      type: Object,
      require: true
    }
  },

  methods: {
    handleDelete(id) {
      this.$emit("deleteTodo", id);
    }
  },

  computed: {
    list() {
      const list = [];
      const todoList = this.todo.list;
      const maxSize = todoList.length > 2 ? 2 : todoList.length;

      for (let i = 0; i < maxSize; i++) {
        list.push(todoList[i])
      }

      return list;
    }
  },
}
</script>

<style lang="scss">
  
</style>