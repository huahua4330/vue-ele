import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 导入css入口配置
import "./styles/main.scss"

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
