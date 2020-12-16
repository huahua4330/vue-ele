import Vue from "vue";
import SvgIcon from './components/SvgIcon.vue'
// 声明全局组件
Vue.component('svg-icon',SvgIcon) 


// require.context(‘./svg’, false, /\.svg$/) 参数说明：
// 第一个：目录
// 第二个：是否遍历子级目录
// 第三个：定义遍历文件规则

// 1.读取svg文件 转换成webpack能访问的文件资源（对象 ） ./svg/xxx.svg  
const req = require.context('./svg', false, /\.svg$/)//读完之后交给webpack去处理
// console.log(req.keys())
// 解析svg的资源
req.keys().map(req)
// 2配置webpack

// 3.下载loader
// npm install svg-sprite-loader -S

// 使用