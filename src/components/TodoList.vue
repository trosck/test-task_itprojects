<template>
  <div class="wrapper-list" v-if="todoList.length">
    <vue-todo-list-item
    v-for="todo in todoList"
    :key="todo.id"
    :todo="todo"
    @deleteTodo="handleDelete"
    ></vue-todo-list-item>

    <vue-confirm
      v-if="modalDelete"
      @answer="handleAnswer"
      modalType="warning"
    ></vue-confirm>
  </div>
</template>

<script>
import "@/assets/todoItem.scss";

export default {
  components: {
    "vue-todo-list-item": ( ) => import("./TodoListItem.vue"),
  },

  props: {
    todoList: {
      type: Array,
      require: true
    }
  },

  data() {
    return {
      modalDelete: false,
      idDelete: null,
    }
  },

  methods: {
    
    handleDelete(id) {
      this.modalDelete = true;
      this.idDelete = id;
    },

    handleAnswer(answer) {
      if (answer) {
        this.$emit("deleteTodo", this.idDelete);
      }
      this.modalDelete = false;
      this.idDelete = null;
    }
  },
}
</script>

<style lang="scss">
.wrapper-list {
  justify-content: flex-start;
}
</style>