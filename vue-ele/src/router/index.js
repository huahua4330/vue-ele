import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'/home'
  },
  {
    path: "/Home",
    name: "Home",
    component: () =>import("../views/Home/index.vue")
  },
  {
    path: "/Login",
    name: "Login",
    component: () =>import("../views/Login/index.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 路由守卫  登陆了才能跳转
router.beforeEach((to,from,next)=>{
  // console.log(to)//从哪里来的
  // console.log(from)//到哪里去
  // console.log(next)
  const isLogin=localStorage.getItem("ele_login") ? true : false
  if(to.path==='/login'){
    next()
  }else{
    // 是否登陆 没有登陆重定向到登陆页面 如果登陆了就正常next
    isLogin ? next() : next('/login')
  }
})

export default router;
