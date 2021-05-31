import { Promise } from 'core-js'
import {do_login} from '../../api/login.js'
import {setUsername,setToken,getUsername,getToken,removeUsername,removeToken} from '../../utils/cookie' 
const state={
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false ,//展开  把字符串转化成飞字符串 
    token:getToken() || '',
    username:getUsername() || ''
}
const getters={
    // 延伸属性
    isCollapse:()=>state.isCollapse 
}
const mutations={
    SET_COLLAPSE(state){//修改state参数，拿到state
        state.isCollapse=!state.isCollapse
        // 将此时的状态存入本地存储
        // sessionStorage.setItem('isCollapse',state.isCollapse)
        sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
    // 设置用户
    SET_USERNAME(state,value){
        state.username=value
    }, 
    // 设置token
    SET_TOKEN(state,value){
        state.token=value
    },
}
const actions={
    // 登录action ----
    login({commit},data){
        
        return new Promise((resolve,reject)=>{
            // 发起网络请求
            do_login(data).then(res=>{
                const {username,token}=res.data.data
                // 通过同步方式将数据更新到state
                commit('SET_USERNAME',username)
                commit('SET_TOKEN',token)
                // 以cookie的方式存放到浏览器缓存
                setUsername(username)
                setToken(token)
                resolve(res)
            }).catch(err=>{

            })
        })
    },
    // 退出 exit
    exit({commit}){
        return new Promise((resolve,reject)=>{
            removeUsername()
            removeToken()
            commit('SET_USERNAME','')
            commit('SET_TOKEN','')
            resolve() 
        })
    }
}
export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}