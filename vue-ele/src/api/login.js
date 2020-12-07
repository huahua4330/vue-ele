import axios from "@/utils/request.js"
// 请求 和 响应拦截

// 获取验证码
export const get_code=(data)=>{
    // console.log(process.env.NODE_ENV)
    return axios.request({
        method:"post",
        url:'/getSms/ ',
        data:data
    })
}
// 登陆

// 注册