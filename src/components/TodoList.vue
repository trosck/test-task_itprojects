<template>
  <div class="wrapper-list">
    
    <div v-if="todoList">
      <vue-todo-list-item
      v-for="todo in todoList"
      :key="todo.id"
      :todo="todo"
      @deleteTodo="handleDelete"
      ></vue-todo-list-item>
    </div>


    <vue-confirm
      v-if="modalDelete"
      @answer="answerDelete"
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

    answerDelete(answer) {
      if (answer) {
        this.$emit("deleteTodo", this.idDelete);
      };
      this.$nextTick(( ) => {
        this.modalDelete = false;
        this.idDelete = null;
      });
    }
  },
}
</script>

<style lang="scss">
.wrapper-list {
  justify-content: flex-start;
}
</style>