import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入全局图标组件
import './icons/'
// 导入路由权限限制
// import './router/permit.js'


// 导入css入口配置
// 可以删除
// import "./styles/main.scss"

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入VueCompositionApi
import VueCompositionApi from '@vue/composition-api'; 
Vue.use(VueCompositionApi);

Vue.use(ElementUI);

// 系统默认的环境变量
// console.log(process.env.NODE_ENV)//development  线下
// 自定义环境变量
// 如果是线下 npm run serve
      // 默认读取 .env.development
// 如果是线上 npm run build
      // 默认读取 .env.production

console.log(process.env)



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");