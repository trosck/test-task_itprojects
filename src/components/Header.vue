<template>
  <div class="wrapper relative">
    <router-link :to="{name: 'index'}" class="logo">Itprojects</router-link>
    <button class="button btn-primary" @click="handleAddModal">Add new +</button>

    <div class="add-form" v-if="modalAdd">
      <label for="title">Enter the todo name</label>
      <input v-model="newTodo" name="title" @keydown.enter="addTodo" ref="newTodoInput" />
      <div class="bottom">
        <button class="button btn-primary" @click="cancelAdd">Cancel</button>
        <button class="button btn-primary" @click="addTodo" @keydown.enter="addTodo">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      newTodo: "",
      modalAdd: false
    }
  },
  methods: {
    ...mapActions(["createTodo"]),

    addTodo() {
      this.createTodo(this.newTodo);
      this.cancelAdd();
    },

    cancelAdd() {
      this.newTodo = "";
      this.modalAdd = false;
    },

    handleAddModal() {
      this.modalAdd = true;
      this.$nextTick(( ) => this.$refs.newTodoInput.focus());
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  .logo {
    font-size: 3rem;
    font-weight: 700;
    font-family: cursive;
  }
  
  .add-form {
    display: flex;
    position: absolute;
    flex-flow: column nowrap;
    top: 20%;
    right: -50%;
    border: 1px solid #cccccc;
    padding: 20px;
    z-index: 1000;

    input {
      margin-bottom: 10px;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>