import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const store = new Vuex.Store({
  state() {
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
  },
  actions,
  mutations,
  getters,
});

export default store;