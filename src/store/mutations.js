export default {
  ADD_TODO(state, todo) { //
    state.list.push(todo);
  },

  SET_STATE_LIST(state, list) {
    state.list = list;
  },

  DELETE_TODO(state, id) { //
    const index = state.list.findIndex(todo => todo.id === id);
    state.list.splice(index, 1);
  },

  COMPLETE_TODO_ITEM(state, index) { //
    const { list, current } = state.editHistory;
    const item = list[current].list;
    const { name, complete } = item[index];
    
    item.splice(index, 1, {
      complete: !complete,
      name,
    });
  },

  EDIT_TODO_ITEM(state, { newValue, index}) {
    const { list, current } = state.editHistory;
    const item = list[current].list;
    const { name, complete } = item[index];

    item.splice(index, 1, {
      complete,
      name: newValue,
    });
  },

  CHANGE_TODO_ITEM(state, { updateComplete, updateName, updateTitle, index }) {
    const { list, current } = state.editHistory;
    const item = list[current];
    console.log(updateComplete, updateName, updateTitle, index)
    if (updateName && index >= 0) {
      item.list.splice(index, 1, {
        name: updateName,
        complete: item.list[index].complete
      });
    }

    if (updateComplete && index >= 0) {
      item.list.splice(index, 1, {
        name: item.list[index].name,
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