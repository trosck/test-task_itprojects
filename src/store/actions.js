import { v4 as uuidv4 } from "uuid";


export default {
  createTodo({ commit, state }, todoTitle) { //
    const id = uuidv4();

    const todo = {
      title: todoTitle,
      list: [],
      id,
    };

    commit("ADD_TODO", todo);
  },

  setStateList({ commit }, list) {
    commit("SET_STATE_LIST", list);
  },

  deleteTodo({ commit }, id) {
    commit("DELETE_TODO", id);
  },

  deleteTodoItem({ commit, getters }, index) {
    const { list, id, title } = getters.currentTodo;

    const _list = [...list];
    _list.splice(index, 1);
    
    commit("CLEAN_OVER");
    commit("CURRENT_BAMP", { list: _list, id, title });
    commit("REDO_EDIT");
  },

  addTodoItem({ commit, getters }, todoItem) { //
    const { id, title, list } = getters.currentTodo;

    commit("CLEAN_OVER")
    commit("REDO_EDIT");
    commit("CURRENT_BAMP", { list: [...list, todoItem], id, title }); 
  },

  completeTodoItem({ commit, getters }, index) {
    const { id, title, list } = getters.currentTodo;

    commit("CLEAN_OVER");
    commit("REDO_EDIT");
    commit("CURRENT_BAMP", { id, title, list: [...list] });
    commit("COMPLETE_TODO_ITEM", index);
  },

  editTodoItem({ commit, getters }, changes) {
    const { id, title, list } = getters.currentTodo;

    commit("CLEAN_OVER");
    commit("REDO_EDIT");
    commit("CURRENT_BAMP", { id, title, list: [...list] });
    commit("EDIT_TODO_ITEM", changes);
  },

  changeTodoItem({ commit, getters }, changes) {
    const { id, title, list } = getters.currentTodo;

    commit("CLEAN_OVER");
    commit("REDO_EDIT");
    commit("CURRENT_BAMP", { id, title, list: [...list] });
    commit("CHANGE_TODO_ITEM", changes);
  },

  nextStep({ commit, state }) { //
    if (state.editHistory.current === state.editHistory.list.length - 1) return;
    else commit("REDO_EDIT");
  },

  backStep({ commit, state }) { //
    if (state.editHistory.current === 0) return;
    else commit("UNDO_EDIT");
  },

  setEditing({ commit, getters }, id) {
    const todo = getters.getTodoById(id);
    commit("SET_EDITING", todo);
  },

  cancelEdits({ commit }) {
    commit("CANCEL_EDIT");
  },

  saveEdits({ commit, state, getters }, id) {
    const index = getters.getTodoIndexById(id);

    commit("SAVE_EDIT", index);
    commit("CANCEL_EDIT");
  }
}