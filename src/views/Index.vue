<template>
  <layout-default>
    <vue-todo-list />
  </layout-default>
</template>

<script>
export default {
  components: {
    "vue-todo-list": ( ) => import("@/components/TodoList.vue"),
    "layout-default": ( ) => import("@/layouts/default.vue")
  },
}
</script>
