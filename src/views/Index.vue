<template lang="pug">
layout-default
  .todo-list
    template(v-if="ADDITIONAL_LIST.length")
      .todo(
        v-for="todo in ADDITIONAL_LIST"
        :key="todo.id"
      )
        todo(:todo="todo")

        hr

        .button-group
          router-link.link.button(:to="{ name: 'Edit', params: { id: todo.id } }") Go to edit
          tl-confirm
            button.button.button-warning Delete

    .nothingtodo(v-else)
      h2 Nothing yet...
      p You can add a new one by entering its name in the field below and clicking on the button
  
  form.add-form
    input(v-model="newTodo" type="text" placeholder="Enter todo name")
    button.button.btn-primary.button-add-todo( @click="addTodo" ) Add new Todo
</template>

<script>
import TLConfirm from "@/components/TLConfirm.vue";
import TLModal from "@/components/TLModal.vue";
import LayoutDefault from "@/layouts/default.vue";
import Todo from "@/components/Todo.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "layout-default": LayoutDefault,
    "tl-confirm": TLConfirm,
    "tl-modal": TLModal,
    "todo": Todo
  },

  data() {
    return {
      newTodo: "",
      modalAdd: false
    }
  },
  
  methods: {
    ...mapActions(["deleteTodo", "createTodo"]),

    addTodo() {
      this.createTodo(this.newTodo);
      this.newTodo = "";
      this.modalAdd = false;
    }
  },

  computed: {
    ...mapGetters(["ADDITIONAL_LIST"])
  },
}
</script>

<style lang="sass" scoped>
.nothingtodo
  margin: 10px

  h2
    font-size: 2.5rem
  p
    line-height: 3rem
    font-size: 1.5rem
    width: 50%

.todo-list
  flex: 1
  overflow: auto
  @include page-item

  .todo
    box-shadow: 0 0px 3px 2px #C0C0C0
    margin-bottom: 20px

    &:last-child
      margin-bottom: 0

    /deep/ .item:last-child
      color: $LightGrey

.button-group
  display: flex
  justify-content: space-around
  padding: 10px 0

  .button
    font-size: 1.7rem

.add-form 
  display: grid
  grid-template-columns: 2fr 1fr
  column-gap: 10px
  margin: 10px 0
  padding: 10px
  @include page-item
</style>