import Vue from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";

// styles
import "./assets/index.css";
// ======

// global components
import Confirm from "./components/Confirm.vue";

Vue.component("vue-confirm", Confirm);
// =================

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
