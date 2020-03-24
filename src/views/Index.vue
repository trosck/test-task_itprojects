<template>
  <layout-default>
    <vue-todo-list 
      :todoList="list" 
      @deleteTodo="deleteTodo"
    />
  </layout-default>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {
    "vue-todo-list": ( ) => import("@/components/TodoList.vue"),
    "layout-default": ( ) => import("@/layouts/default.vue")
  },
  
  methods: {
    ...mapActions(["deleteTodo", "setStateList"]),
  },

  computed: {
    ...mapState(["list"]),
  },
}
</script>
