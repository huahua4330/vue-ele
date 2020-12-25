import { MessageBox } from 'element-ui'
export default {//2.0的写法
    install (Vue) {
        Vue.prototype.comdel =  ({content,Tips,type,center,callback})=> {
            MessageBox.confirm( content,Tips, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type,
                center: center
            }).then(() => {
                // 如果存在就调用
                callback && callback()
            }).catch(() => {
                
            });
        }
    }
  } 