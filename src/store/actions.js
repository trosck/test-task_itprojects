import { v4 as uuidv4 } from "uuid";

export default {
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