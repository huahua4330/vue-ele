import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    mate:{//自定义属性
      name:'信息管理'
    },
    hidden:true,//隐藏
    redirect:'/login'
  },
  {
    path: "/Home",
    name: "Home",
    hidden:false,//显示
    mate:{//自定义属性
      name:'控制台',
      icon:'console'
    },
    component: () =>import("../views/Layout/index.vue"),
    redirect:'/index',
    children:[
      {
        path:'/index',
        name:'HomeIndex',
        mate:{name:'首页'},
        component: () =>import("../views/Home/index.vue"),
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    hidden:false,//显示
    mate:{//自定义属性
      name:'信息管理',
      icon:'info' 
    },
    component: () =>import("../views/Layout/index.vue"),
    children:[
      {
        path:'/infoIndex',
        name:'infoIndex',
        mate:{name:'信息列表'},
        component: () =>import("../views/Info/index.vue"),
      },
      {
        path:'/infoCate',
        name:'infoCate',
        mate:{name:'信息分类'},
        component: () =>import("../views/Info/cate.vue"),
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    hidden:false,//显示
    mate:{//自定义属性
      name:'用户管理',
      icon:'user' 
    },
    component: () =>import("../views/Layout/index.vue"),
    children:[
      {
        path:'/userIndex',
        name:'userIndex',
        mate:{name:'用户管理'},
        component: () =>import("../views/User/index.vue"),
      },
      {
        path:'/userCate',
        name:'userCate',
        mate:{name:'用户分类'},
        component: () =>import("../views/User/cate.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,//隐藏
    mate:{//自定义属性
      name:'登陆'
    },
    component: () =>import("../views/Login/index.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});



export default router;
