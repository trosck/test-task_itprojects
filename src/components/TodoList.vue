<template>
  <div>
    <vue-todo-single
    v-for="todo in list"
    :key="todo.id"
    :todo="todo"
    :fullView="true"
    ></vue-todo-single>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    "vue-todo-single": ( ) => import("./TodoSingle.vue"),
  },
  computed: {
    ...mapState("todoList", [
      "list"
    ]),
  },
}
</script>

<style lang="scss">
  
</style>