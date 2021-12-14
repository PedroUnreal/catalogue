import Vue from "vue";
import Router from "vue-router";

import Catalogue from "../components/Catalogue.vue";
import Cart from "../components/Cart.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/cart",
      component: Cart,
    },
    {
      path: "/",
      component: Catalogue,
    },
  ],
});
