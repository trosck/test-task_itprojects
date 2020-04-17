export default {
  getTodoById: state => id => (
    state.list.find(todo => todo.id === id)
  ),

  CURRENT_TODO(state) {
    return state.editHistory.list[state.editHistory.current];
  },

  getTodoIndexById: state => id => (
    state.list.findIndex(todo => todo.id === id)
  ),

  LIST: state => state.list,

  ADDITIONAL_LIST(state) {
    const todolist = [];
    state.list.forEach(todo => {
      const { list, id, title } = todo;

      const _list = list.slice(0, 2);
      const rest = list.length - _list.length;

      let text = "";

      if (_list.length === 0) text = "empty"
      if (rest === 1) text = "...1 item"
      if (rest > 1) text = `...${rest} items`

      todo.list.push();

      todolist.push({ id, title, list: [..._list, { complete: false, name: text }] });
    });
    return todolist;
  }
};