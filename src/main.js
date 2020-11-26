import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { ApiFactory } from "./services/ApiFactory";

Vue.mixin({
  methods: {
    ...ApiFactory,
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
