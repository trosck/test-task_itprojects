<template>
  <div class="wrapper-todo" v-if="todo">
    <div class="title">
      {{ todo.title }}

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
          @change="complete(index)" 
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

    handleDelete(index) {
      this.indexDelete = index;
      this.modalDelete = true;
    },

    complete(index) {
      this.$emit("complete", index);
    },

    answerEdit(answer) {
      if (answer) {
        
        if (this.indexEdit !== null) {
          this.changeTodoItem({
            index: this.indexEdit,
            updateName: this.inputEdit
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
      this.modalDelete = false;
      this.indexDelete = null;

      if (answer) {
        this.deleteTodoItem(this.indexDelete);
      }
    }
  },
}
</script>

<style lang="scss">
</style>