import axios from "axios"
import {Message} from "element-ui"
const BASEUSRL=process.env.NODE_ENV==="development" ? "/api":""// /api  后面为空是因为同一个服务器不需要代理，所以为空
const http=axios.create({
    baseURL:BASEUSRL//http://localhost:8080/api/getSms/ 只要url中挨批开头的都是接口请求
})

// 跨域指的是浏览器由于同源策略 不同域名的请求 就会出现跨域，但是如果是两个后台发起网络请求就不存在跨域了
// http.defaults.baseURL="http://www.web-jshtml.cn/productapi/" //https://www.baidu.com/getSms
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("请求拦截")//先执行请求拦截，再请求，然后再响应拦截，最后在业务
    // 手动添加请求头参数 token userId csrf
    config.headers.token="Lil Glost"
    // console.log("请求参数",config.headers)
    
    return config;

  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // console.log(response)
    // 对响应数据做点什么 数据进行过滤
    if(response.data.resCode!=0){
        // 提示服务器返回的信息
        Message.error(response.data.message);
        return Promise.reject(error);
    }
    return response
  }, function (error) {
    // 对响应错误做点什么
    // console.log("响应拦截")
    return Promise.reject(error);
  });

  export default http