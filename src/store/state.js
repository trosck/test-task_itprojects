const list = JSON.parse(localStorage.getItem("list")) || [];

export default function() {
  return {
    list: list,
    editHistory: {
      current: 0,
      list: []
    }
  }
}