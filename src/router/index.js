import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import IndexPage from "../views/Index.vue";
import EditPage from "../views/Edit.vue";

const router = new VueRouter({
  routes: [{
    path: "/",
    name: "index",
    component: IndexPage
  }, {
    path: "/:id/edit",
    name: "edit",
    component: EditPage,
    props: true
  }]
});

export default router;