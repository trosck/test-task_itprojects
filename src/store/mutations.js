export default {
  ADD_TODO(state, todo) { //
    console.log(todo)
    state.list.push(todo);
  },

  SET_STATE_LIST(state, list) {
    state.list = list;
  },

  DELETE_TODO(state, id) { //
    const index = state.list.findIndex(todo => todo.id === id);
    state.list.splice(index, 1);
  },

  CHANGE_TODO_ITEM(state, { updateComplete, updateName, updateTitle, index }) {
    const { list, current } = state.editHistory;
    const item = list[current];

    console.log(updateComplete, updateName, updateTitle, index, item.list[index])
    
    if (index >= 0) {
      item.list.splice(index, 1, {
        name: updateName,
        complete: updateComplete
      });
    }

    if (updateTitle) item.title = updateTitle;
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

  SAVE_EDIT(state, index) {
    state.list[index] = state.editHistory.list[state.editHistory.current];
  },

  CLEAN_OVER(state) {
    state.editHistory.list.splice(state.editHistory.current + 1);
  }
};