<template>
  <div class="wrapper-todo" v-if="todo">
    <div class="title">
      <span class="name">{{ todo.title }}</span>

      <button 
        class="button btn-primary" 
        @click="handleEditTitle()"
      >Edit</button>
    </div>

    <hr>
    
    <ul class="list">
      <li
        v-for="(item, index) in todo.list"
        :key="index"
        class="item relative"
        :class="item.complete ? 'complete' : ''"
      >
        <input 
          type="checkbox" 
          class="checkbox"
          @change="handleCompleteItem(index)" 
          :checked="item.complete"
        />

        <span>{{ item.name }}</span>

        <div class="tools relative">

          <button 
            class="button btn-primary" 
            @click="handleEdit(index)"
          >Edit</button>

          <button 
            class="button btn-warning"
            @click="handleDelete(index)"
          >Delete</button>

        </div>
      </li>
        
      <!-- confirm for change todo-item/todo-title -->
      <vue-confirm
        v-if="modalEdit"
        @answer="answerEdit"
        title="Change todo"
        textButtonLeft="Cancel"
        textButtonRight="Apply"
      >
        <template v-slot:content>
          <input 
            v-model="inputEdit" 
            @keydown.enter="answerEdit(true)" 
            @keydown.esc="answerEdit(false)"
            ref="inputEdit"
          />
        </template>
      </vue-confirm>

      <!-- confirm for delete todo-item -->
      <vue-confirm
        v-if="modalDelete"
        @answer="answerDelete"
        modalType="warning"
      ></vue-confirm>
        
    </ul>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import "../assets/todoItem.scss";

export default {
  props: {
    todo: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      modalEdit: false,
      inputEdit: "",
      indexEdit: null,

      modalDelete: false,
      indexDelete: null
    }
  },

  methods: {
    ...mapActions(["deleteTodoItem", "changeTodoItem"]),

    handleEdit(index) {
      this.inputEdit = this.todo.list[index].name;
      this.indexEdit = index;

      this.modalEdit = true;

      this.$nextTick(( ) => this.$refs.inputEdit.focus());
    },

    handleEditTitle() {
      this.inputEdit = this.todo.title;
      this.modalEdit = true;
      this.$nextTick(( ) => this.$refs.inputEdit.focus());
    },

    handleCompleteItem(index) {
      const { complete, name } = this.todo.list[index];
      this.changeTodoItem({
        updateComplete: !complete,
        updateName: name,
        index
      })
    },

    handleDelete(index) {
      this.indexDelete = index;
      this.modalDelete = true;
    },

    answerEdit(answer, complete) {
      if (answer) {
        
        if (this.indexEdit !== null) {
          this.changeTodoItem({
            index: this.indexEdit,
            updateName: this.inputEdit,
            updateComplete: this.todo.list[this.indexEdit].complete
          })
        } else {
          this.changeTodoItem({
            updateTitle: this.inputEdit
          })
        }
      }

      this.modalEdit = false;
      this.indexEdit = null;
    },

    answerDelete(answer) {
      if (answer) {
        this.deleteTodoItem(this.indexDelete);
      }
      
      this.$nextTick(( ) => {
        this.modalDelete = false;
        this.indexDelete = null;
      })
    }
  },
}
</script>

<style lang="scss">
.title {
  position: relative;
  padding-right: 80px;

  .name {
    margin: 0;
    word-break: break-all;
  }

  .button {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>