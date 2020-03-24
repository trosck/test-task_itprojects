export default {
  getTodoById: state => id => (
    state.list.find(todo => todo.id === id)
  ),

  currentTodo(state) {
    return state.editHistory.list[state.editHistory.current];
  },

  getTodoIndexById: state => id => (
    state.list.findIndex(todo => todo.id === id)
  )
};