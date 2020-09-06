import Vue from "vue";
import App from "./App.vue";
import Cloudinary from "cloudinary-vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(Cloudinary, {
  configuration: { cloudName: "sep-2020-test" }
});
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
