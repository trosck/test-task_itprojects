import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import state from "./state";

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});

store.subscribe((mutation, state) => {
  const parsed = JSON.stringify(state.list);
  localStorage.setItem("list", parsed);
});

export default store;