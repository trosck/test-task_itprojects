import Vue from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "./assets/fontawesome/css/all.min.css"

import "./assets/index.sass";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
