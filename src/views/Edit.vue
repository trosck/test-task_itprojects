<template>
  <layout-default class="relative">
    <div>{{currentTodo}}
      <vue-todo-single
        :todo="currentTodo"
        @complete="completeTodoItem"
        :fullView="false"
      ></vue-todo-single>
    </div>
    <div class="edit-group">
      <div class="group">
        <input v-model="todoItem" @keydown.enter="addItem" />
        <button 
          type="submit"
          @click="addItem"
          class="button btn-primary"
        >Add</button>
      </div>
      <div class="group">
        <button class="button btn-primary" @click="cancel">Cancel</button>
        <button class="button btn-primary" @click="save">Save</button>
        <button class="button btn-primary" @click="backStep">Undo</button>
        <button class="button btn-primary" @click="nextStep">Redo</button>
        <button class="button btn-warning" @click="modalView = true">Delete</button>
      </div>
    </div>
    <vue-confirm
      v-if="modalView"
      title="Are you sure?"
      modalType="warning"
      @answer="modalAnswer"
    ></vue-confirm>
  </layout-default>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    "layout-default": ( ) => import("@/layouts/default.vue"),
    "vue-todo-single": ( ) => import("@/components/TodoSingle.vue"),
  },
  props: ["id"], // route params
  data() {
    return {
      todoItem: "",
      modalView: false
    }
  },
  mounted() {
    this.setEditing(this.getTodoById(this.id));
  },
  methods: {
    ...mapActions("todoList", [
      "addTodoItem",
      "completeTodoItem",
      "setEditing",
      "nextStep",
      "backStep",
      "saveEdits",
      "cancelEdits",
      "deleteTodo"
    ]),

    addItem() {
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
      this.cancelEdits();
      this.$router.push("/");
    },

    modalAnswer(answer) {
      this.modalView = false;

      if (answer) {
        this.deleteTodo(this.id);
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters("todoList", ["getTodoById", "currentTodo"])
  },
  beforeDestroy() {
    this.cancelEdits();
  },
}
</script>

<style lang="scss">
.edit-group {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;

  .group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    margin-right: 10px;
  }
}
</style>