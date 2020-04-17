import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Index from "../views/Index.vue";
import Edit from "../views/Edit.vue";

const router = new VueRouter({
  routes: [{
    path: "/",
    name: "Index",
    component: Index
  }, {
    path: "/:id",
    name: "Edit",
    component: Edit,
    props: true
  }]
});

export default router;