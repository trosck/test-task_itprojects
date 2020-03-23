import { v4 as uuidv4 } from "uuid";

const state = ( ) => {
  return {
    list: [{
      id: "1",
      list: [{
        name: "one",
        complete: false
      }, {
        name: "two",
        complete: true
      }],
      title: "title note"
    }],
    editHistory: {
      current: 0,
      list: []
    }
  }
}

const getters = {
  getTodoById: state => id => (
    state.list.find(todo => todo.id === id)
  ),
  currentTodo(state) {
    return state.editHistory.list[state.editHistory.current];
  }
}

const mutations = {
  ADD_TODO(state, todo) { //
    state.list.push(todo);
  },

  DELETE_TODO(state, id) { //
    const index = state.list.findIndex(todo => todo.id === id);
    state.list.splice(index, 1);
  },

  COMPLETE_TODO_ITEM(state, index) { //
    const { list, current } = state.editHistory;
    list[current].list[index].complete = !list[current].list[index].complete;
    // console.log(state.editHistory.list.map(i => i.list.map(j => j.complete)))
  },

  SET_EDITING(state, todo) { // refactor
    state.editHistory.list.push(todo)
  },
  CANCEL_EDIT(state) {
    state.editHistory.current = 0;
    state.editHistory.list = [];
  },

  REDO_EDIT(state) { //
    state.editHistory.current++;
  },
  UNDO_EDIT(state) { //
    state.editHistory.current--;
  },

  CURRENT_BAMP(state, todo) {
    state.editHistory.list.push(todo);
  },

  SAVE_EDIT(state, id) {
    const index = state.list.findIndex(todo => todo.id === id);
    state.list[index] = state.editHistory.list[state.editHistory.current];
  },

  CLEAN_OVER(state) {
    state.editHistory.list.length = state.editHistory.current + 1;
  }
}

const actions = {
  createTodo({ commit }, todoTitle) { //
    const id = uuidv4();
    commit("ADD_TODO", {
      title: todoTitle,
      list: [],
      id,
    })
  },

  deleteTodo({ commit }, id) {
    commit("DELETE_TODO", id);
  },

  deleteTodoItem({ commit, getters }, index) {
    const { list, ...todo } = getters.currentTodo;

    const _list = [...list];
    _list.splice(index, 1);
    
    commit("CLEAN_OVER");
    commit("CURRENT_BAMP", { list: _list, ...todo });
    commit("REDO_EDIT");
  },

  addTodoItem({ commit, getters }, todoItem) { //
    const { list, ...todo } = getters.currentTodo;
    commit("CLEAN_OVER")
    commit("REDO_EDIT");
    commit("CURRENT_BAMP", { list: [...list, todoItem], ...todo }); 
  },

  nextStep({ commit, state }) { //
    if (state.editHistory.current === state.editHistory.list.length - 1) return;
    else commit("REDO_EDIT");
  },

  backStep({ commit, state }) { //
    if (state.editHistory.current === 0) return;
    else commit("UNDO_EDIT");
  },

  completeTodoItem({ commit, getters }, index) {
    const todo = getters.currentTodo;

    commit("CLEAN_OVER");
    commit("CURRENT_BAMP", todo);
    commit("REDO_EDIT");
    commit("COMPLETE_TODO_ITEM", index);
  },

  setEditing({ commit }, todo) {
    commit("SET_EDITING", todo);
  },

  cancelEdits({ commit }) {
    commit("CANCEL_EDIT");
  },

  saveEdits({ commit }, id) {
    commit("SAVE_EDIT", id);
    commit("CANCEL_EDIT");
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}