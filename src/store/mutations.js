export default {
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
};