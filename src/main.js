import Vue from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";

// fontawesome
import "./assets/fontawesome/css/all.min.css"
// ===========

// styles
import "./assets/index.sass";
import "./assets/settings.sass";
// ======

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
