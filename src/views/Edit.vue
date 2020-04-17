<template lang="pug">
  layout-default( class="relative" )
    .todo-info(v-if="CURRENT_TODO")
      .top-buttons
        i.fas.fa-chevron-left.back(@click="$router.push('/')")
        i.fas.fa-cog.settings(@click="modalEdit = true")
      
      // todo-card( :todo="" )
      .todo
        todo-title(:title="CURRENT_TODO.title" :editable="true")

        hr
        
        ul.list
          todo-item(
            v-for="(item, index) in CURRENT_TODO.list"
            :key="index"
            :item="item"
            :editable="true"
            @complete="completeTodoItem(item, index)"
          )

    .add-todo
      input( v-model="todoItem" @keydown.enter="addItem" )
      button(
        type="submit"
        @click="addItem"
        class="button btn-primary"
      ) Add

    .edit-todo
      button.button.btn-primary( @click="cancel" ) Cancel
      button.button.btn-primary( @click="save" ) Save
      button.button.btn-primary( @click="backStep" ) Undo
      button.button.btn-primary( @click="nextStep" ) Redo
      button.button.btn-warning( @click="handleDeleteTodo" ) Delete      
</template>

<script>
import LayoutDefault from "@/layouts/default.vue";
import TodoTitle from "@/components/TodoTitle.vue";
import TodoItem from "@/components/TodoItem.vue";
import TLModal from "@/components/TLModal.vue";

import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    "layout-default": LayoutDefault,
    "tl-modal": TLModal,
    "todo-title": TodoTitle,
    "todo-item": TodoItem
  },
  props: ["id"], // route params
  data() {
    return {
      todoItem: "",
      modalDelete: false,
      modalCancel: false,
      modalEdit: false
    }
  },
  mounted() {
    this.setEditing(this.id);
  },
  methods: {
    ...mapActions([
      "addTodoItem",
      "setEditing",
      "nextStep",
      "backStep",
      "saveEdits",
      "cancelEdits",
      "deleteTodo",
      "changeTodoItem"
    ]),

    addItem() {
      if (!this.todoItem) return;
      this.addTodoItem({
        name: this.todoItem,
        complete: false
      });
      this.todoItem = "";
    },

    save() {
      this.saveEdits(this.id);
      this.$router.push("/");
    },

    cancel() {
      this.$nextTick(( ) => this.modalCancel = true);
    },

    handleDeleteTodo() {
      this.$nextTick(( ) => this.modalDelete = true);
    },

    answerCancel(answer) {
      this.modalCancel = false;

      if (answer) {
        this.$nextTick(( ) => {
          this.cancelEdits();
          this.$router.push("/");
        })
      }
    },

    answerDelete(answer) {
      this.modalDelete = false;

      if (answer) {
        this.$nextTick(( ) => {
          this.deleteTodo(this.id);
          this.$router.push("/");
        })
      }
    },
    completeTodoItem(item, index) {
      this.changeTodoItem({
        updateComplete: !item.complete,
        updateName: item.name,
        index
      })
    }
  },
  computed: {
    ...mapGetters(["CURRENT_TODO"])
  },
  beforeDestroy() {
    this.cancelEdits();
  },
}
</script>

<style lang="sass" scoped>
.top-buttons
  display: flex
  justify-content: space-between

  .settings, .back
    cursor: pointer
    font-size: 2rem

    &:hover
      color: $LightGrey

.todo-info
  @include page-item
  flex: 1

.add-todo
  @include page-item
  margin: 10px 0
  padding: 10px
  display: flex

  input
    flex: 1

.edit-todo
  @include page-item
  display: flex
  flex-flow: column nowrap
  position: absolute
  padding: 10px
  right: -30%
  top: 30%

  .button
    margin-bottom: 10px
    
    &:last-child
      margin-bottom: 0
</style>