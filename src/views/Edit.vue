<template>
  <layout-default class="relative">
    <div class="wrapper">
      <vue-todo-card
        :todo="currentTodo"
      ></vue-todo-card>
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
        <button class="button btn-warning" @click="modalDelete = true">Delete</button>
      </div>
    </div>

    <vue-confirm
      v-if="modalDelete"
      modalType="warning"
      @answer="answerDelete"
    ></vue-confirm>

    <vue-confirm
      v-if="modalCancel"
      @answer="answerCancel"
    ></vue-confirm>

  </layout-default>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    "layout-default": ( ) => import("@/layouts/default.vue"),
    "vue-todo-card": ( ) => import("@/components/TodoCard.vue"),
  },
  props: ["id"], // route params
  data() {
    return {
      todoItem: "",
      modalDelete: false,
      modalCancel: false
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
      "deleteTodo"
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
      this.modalCancel = true;
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
    }
  },
  computed: {
    ...mapGetters(["currentTodo"])
  },
  beforeDestroy() {
    this.cancelEdits();
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-height: 100%;
  overflow: auto;
  margin-bottom: 80px;

  &-todo {
    margin: 0;
  }
}

.edit-group {
  width: 100%;
  position: absolute;
  bottom: 0;
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