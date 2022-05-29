import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import TodoList from "./TodoList.module";
import TodoSingle from "./TodoSingle.module";

const store = new Vuex.Store({
  modules: {
    todoList: TodoList,
    todoSingle: TodoSingle,
  }
});

export default store;