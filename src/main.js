import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { ApiFactory } from "./services/ApiFactory";

Vue.mixin({
  methods: {
    ...ApiFactory,
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
