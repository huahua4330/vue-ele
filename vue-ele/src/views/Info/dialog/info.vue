<template>
    <div>
        <!-- my_info_dailog和info_dailog关闭 才具备第二次点击变成true的条件 -->
        <el-dialog title="新增" :visible.sync="my_info_dailog" width="580px" @close='close' @opened='opened' append-to-body>
            <!-- 表单 -->
            <el-form :model="form" ref="info">

                <el-form-item label="分类:" :label-width="formLabelWidth">
                    <el-select v-model="form.category" placeholder="请选择">
                        <el-option v-for="cate in category" :label="cate.category_name" :key="cate.id" :value="cate.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="标题:" :label-width="formLabelWidth">
                    <el-input v-model="form.title" placeholder="请输入内容"></el-input>
                </el-form-item>

                <el-form-item label="概况:" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="form.content"></el-input>
                </el-form-item>

            </el-form>
            <!-- 操作按钮 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="danger" @click="submit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// 单项数据流  父组件传递的参数子组件可以使用 但是不能直接修改
import {reactive,ref,watch} from '@vue/composition-api'
import {add_new} from '@/api/info.js'
export default{
// ------------------------------vuex 3.0-------------------------------------
    props:{
        info_dailog:{//里面可以写type类型 默认值  valia校验规则 
            type:Boolean,
            default:false
        },
        category:{
            type:Array,
            default:[]
        }
    },
    setup(props,{root,emit,refs}){
        // setTimeout(()=>{ 
        //     console.log('-----------',props.category)
        // },1000)
        // watch(()=>props.category,(value)=>{
        //     console.log('-----------',value)
        // })
// -------------------------------data----------------------------------------
        const my_info_dailog=ref(false)
        const formLabelWidth=ref('60px')
        const form = reactive({
            category: '',
            title: '', 
            content:''
        })
// ---------------------------------methods-----------------------------------
        const opened=(()=>{
            
        })
        const submit=(()=>{
            // 字段都是必填  提交
            if (!form.category) {
                root.$message({
                    type:'error',
                    message:'分类必须填写',
                    duration:1000,
                })
                return false
            }
            const data={
                categoryId:form.category,
                title:form.title,
                content:form.content
            }
            add_new(data).then(res=>{
                root.$message({
                    type:'success',
                    message:'添加信息成功',
                    duration:1000,
                })
                close()
            }) 
        })
        const close=(()=>{
            emit('update:info_dailog',false)
            // 重置表单
            reset()
            // 通知父组件更新数据
            emit('loadNews')
        })
            // 重置表单
        const reset=()=>{
            form.category='',
            form.title='',
            form.content=''
        }
// -----------------------------------watch-----------------------------------
        watch (()=>props.info_dailog,(newValue,oldValue)=>{
            my_info_dailog.value=newValue
        })

        return{
            // ref
            my_info_dailog,
            formLabelWidth,
            // reactive
            form,
            // methods
            close,opened,submit
        }

    },
// // ----------------------------- vuex 2.0---------------------------------
//         return{
//             my_info_dailog:true,
//             formLabelWidth: '60px',
//             form: {
//                 name: '',
//                 region: '',
//                 date1: '',
//                 date2: '',
//                 delivery: false,
//                 type: [],
//                 resource: '',
//                 desc: ''
//             },
//         }
//     },
//     watch:{
//         info_dailog:{//监听父组件的属性变化  一个是旧值，一个是新值
//             handler(newValue,oldValue){
//                 this.my_info_dailog=newValue//父组件传给子组件  
//             }
//         }
//     },
//     methods:{
//         close(){
//             /*
//                 使用属性修饰符 ：是通过.sync告知父组件来更新摸一个数据 ，适合场景：只是告知父组件更新摸一个值没有其他业务逻辑
//                 触发事件 ：是父组件监听子组件的自定义事件触发父组件的一个回调函数 适合场景：可能在父组件的回调函数中写其他的业务逻辑
//             */
//             this.$emit('update:info_dailog',false)//父组件来更新 不是子组件
//             //子组件通过本身的事件向父组件触发一个事件 父组件就可以监听这个自定义事件
//             // this.$emit('close',false) //需要父组件监听事件  
//         }
//     }
}
</script>
<style lang="scss" scoped>
    
</style>