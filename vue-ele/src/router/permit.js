import router from './index'
import {getToken,removeUsername,removeToken} from '../utils/cookie'
import store from '../store/'
// 路由守卫  登陆了才能跳转
// router.beforeEach((to,from,next)=>{
//   console.log(to)//从哪里来的
//   console.log(from)//到哪里去
//   console.log(next)
//   const isLogin=localStorage.getItem("ele_login") ? true : false
//   if(to.path==='/login'){
//     next()
//   }else{
//     // 是否登陆 没有登陆重定向到登陆页面 如果登陆了就正常next
//     isLogin ? next() : next('/login')
//   }
//   next()
// })

// 白名单 ：未登录状态下可以访问的路由
const writeRouter=['/login','/home','/detail']

// 路由的相关逻辑
router.beforeEach((to,from,next)=>{
    // 判断登录的唯一标识就是token是否存在
    if (getToken()) {
        // 存在 登录了
        if(to.path=='/login'){// 如果访问的是login的话就是要重新登录了
            // 清除本地数据
            removeUsername()
            removeToken()
            // 清理vuex中的数据
            store.commit('app/SET_USERNAME','')
            store.commit('app/SET_TOKEN','')
        }
        next()
    } else {
        if (writeRouter.indexOf(to.path) !== -1) {//如果访问的是登录 应该执行next()
            next()
        } else {//不存在 未登录 跳转到登录执行登陆
            next('/login')
        }
    }
    
})


