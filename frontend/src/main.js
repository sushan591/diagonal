import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";

Vue.config.productionTip = false;
window.axios = axios;
Vue.use(BootstrapVue);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");