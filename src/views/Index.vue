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
  mounted() {
    const localList = localStorage.getItem("list");
    if (localList) {
      try {
        const parsed = JSON.parse(localList);
        this.setStateList(parsed);
      } catch(error) {
        localStorage.removeItem("list");
      }
    }
  },

  methods: {
    ...mapActions(["deleteTodo", "setStateList"]),
  },

  computed: {
    ...mapState(["list"]),
  },

  components: {
    "vue-todo-list": ( ) => import("@/components/TodoList.vue"),
    "layout-default": ( ) => import("@/layouts/default.vue")
  },
}
</script>
