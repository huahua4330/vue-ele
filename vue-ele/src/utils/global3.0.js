import {ref} from '@vue/composition-api'
import { MessageBox } from 'element-ui'
export const global=()=>{
    
    const confirm=({content,Tips,type,center,callback,id})=>{
        MessageBox.confirm( content,Tips, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
            center: center
        }).then(() => {
            // 如果存在就调用
            callback && callback(id)
        }).catch(() => {
            
        });
    }
    return {
        confirm
    }
}  