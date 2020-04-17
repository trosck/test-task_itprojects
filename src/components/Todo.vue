<template lang="pug">
.wrapper-todo( v-if="todo" )

  todo-title.title( :title="todoTitle" )

  hr
  
  ul.list
    todo-item(
      v-for="(item, index) in todoList"
      :key="index"
      :item="item"
    )
</template>

<script>
import TodoTitle from "@/components/TodoTitle.vue";
import TodoItem from "@/components/TodoItem.vue";

export default {
  components: {
    TodoTitle,
    TodoItem
  },

  props: {
    todo: {
      type: Object,
      require: true
    }
  },


  computed: {
    todoList() {
      return this.todo.list;
    },
    todoTitle() {
      return this.todo.title;
    }
  },

  
}
</script>

<style lang="sass" scoped>
.wrapper-todo

  &:last-child 
    margin-bottom: 0

.title
  padding: 1rem 1rem 0

.list
  padding: 0 1rem
  margin: 1rem 0
    
    // &.relative:hover 
    //   word-break: break-all
    //   padding-right: 175px

    // &:hover 
    //   .tools 
    //     display: flex
  
    // .checkbox 
    //   margin-right: 10px
    
    // .tools 
    //   position: absolute
    //   right: 0
    //   display: none
</style>