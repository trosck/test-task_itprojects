<template lang="pug">
  layout-default( class="relative" )
    .todo-info(v-if="CURRENT_TODO")
      .top-buttons
        i.fas.fa-chevron-left.back(@click="$router.push('/')")
        i.fas.fa-cog.settings(@click="editTools = !editTools")

      todo-title.todo-title(
        :title="CURRENT_TODO.title" 
        :editable="true"
        @update:title="title => changeTodoItem({ updateTitle: title })"
      )

      hr
      
      .list
        ul
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

    transition(name="edit")
      .edit-todo(v-show="editTools")
        i.fas.fa-times-circle.icon(@click="cancel" title="Cancel")
        i.fas.fa-save.icon(@click="save" title="Save")
        i.fas.fa-undo.icon(@click="backStep" title="Undo")
        i.fas.fa-redo.icon(@click="nextStep" title="Redo")
        i.fas.fa-trash.icon(@click="handleDeleteTodo" title="Delete")      
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
      modalEdit: false,
      editTools: false
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
  padding: 10px
  top: 0

  .settings, .back
    cursor: pointer
    font-size: 2.5rem

    &:hover
      color: $LightGrey

.todo
  display: flex
  flex-flow: column nowrap
  flex: 1

.todo-title
  padding: 0 10px 10px
  top: 44px

.todo-title, .top-buttons
  position: sticky
  background: $White
  z-index: 1

.list
  flex: 1
  padding: 10px

.todo-info
  @include page-item
  flex: 1
  display: flex
  flex-flow: column nowrap
  overflow: auto
  position: relative

.add-todo
  @include page-item
  margin: 10px 0
  padding: 10px
  display: flex

  input
    flex: 1

// edit tools styles and animations

.edit-leave-active,
.edit-enter
  opacity: 0

.edit-enter .edit-todo,
.edit-leave-active .edit-todo
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

.edit-todo
  @include page-item
  display: flex
  justify-content: space-around
  align-items: center
  position: absolute
  padding: 10px
  transition: all 0.3s ease
  z-index: 2
  top: 5px
  right: 20%
  left: 20%
  
  .icon
    font-size: 2rem
    cursor: pointer
    margin-bottom: 10px
    display: flex
    justify-content: center
    margin: 0

    &:hover
      color: $LightGrey

    &:last-child
      margin-bottom: 0
</style>