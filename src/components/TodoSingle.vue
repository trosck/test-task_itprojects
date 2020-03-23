<template>
  <div class="wrapper" v-if="todo">
    <div class="title">
      {{ todo.title }}
    </div>

    <hr>

    <ul 
      class="list"
      v-if="fullView"
    >
      <li
        v-for="(item, index) in fullViewList"
        :key="index"
        class="item"
      >{{item.name}}</li>
    </ul>
    <ul v-else class="list">
      <li
        v-for="(item, index) in todo.list"
        :key="index"
        class="item relative"
        :class="item.complete ? 'complete' : ''"
      >
        <input 
          type="checkbox" 
          class="checkbox"
          @change="completeTodo(index)" 
          :checked="item.complete"
        />
        <span>{{ item.name }}</span>
        <div class="tools">
          <button class="button btn-primary">Edit</button>
          <button 
            class="button btn-warning"
            @click="deleteTodoItem(index)"
          >Delete</button>
        </div>
      </li>
    </ul>
    <div class="button-group" v-if="fullView">
      <router-link
        class="button btn-primary"
        :to="{ name: 'edit', params: { id: todo.id } }"
      >Edit</router-link>
      <button class="button btn-warning" @click="deleteTodo(todo.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  props: {
    todo: {
      type: Object,
      require: true
    },
    fullView: {
      type: Boolean,
      require: false,
      default: true
    }
  },
  methods: {
    completeTodo(index) {
      this.$emit("complete", index);
    },
    ...mapActions(["deleteTodoItem"]),
    ...mapMutations(["deleteTodo"])
  },
  computed: {
    fullViewList() {
      const list = [];
      const todoList = this.todo.list;
      const maxSize = todoList.length > 2 ? 2 : todoList.length;
      for (let i = 0; i < maxSize; i++) {
        list.push(todoList[i])
      }
      return list;
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 1rem;
  background-color: #ffe4e1;
  padding: 1rem;

  .title {
    font-size: 3rem;
  }
  .list {
    list-style: none;
    padding: 0;
    margin: 2rem 0;

    .item {
      display: flex;
      align-items: center;
      margin: 1rem 0;
      font-size: 2rem;

      &.complete {
        text-decoration: line-through;
      }

      &:hover {
        .tools {
          display: flex;
        }
      }

      .checkbox {
        margin-right: 10px;
      }

      .tools {
        position: absolute;
        right: 0;
        display: none;
      }
    }
  }
  .button {
    margin-right: 10px;
  }
}
</style>