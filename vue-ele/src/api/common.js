import {reactive} from '@vue/composition-api'
import {get_all_category} from '@/api/info'
// 多个组件之间  只要是重新调用了 属性之间的响应式才不存在
  export const common=()=>{
    // 公共的分类信息
    const category = reactive({
        item: [],//所有的分类数 据
    })
    const getCategoryAll=()=>{
        // 发送请求
        get_all_category({}).then(res=>{
            category.item=res.data.data//将信息分类中的名称同步到信息列表中的分类中
        })
    }
    return {
        category,
        getCategoryAll
    }
}  