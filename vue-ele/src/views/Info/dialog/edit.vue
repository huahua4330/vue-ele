<template>
    <div>
        <!-- my_info_dailog和info_dailog关闭 才具备第二次点击变成true的条件 -->
        <el-dialog title="编辑" :visible.sync="my_info_dailog" width="580px" @close='close' @opened='opened' append-to-body>
            <!-- 表单 -->
            <el-form :model="form">

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
import {get_news,edit_news} from "@/api/info.js"
export default{
// ------------------------------vuex 3.0-------------------------------------
    props:{
        info_dailog_edit:{//里面可以写type类型 默认值  valia校验规则 
            type:Boolean,
            default:false
        },
        category:{
            type:Array,
            default:[]
        },
        id:{
            type:String,
            default:'' 
        }
    },
    setup(props,{root,emit}){
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
            getinfo()
        })
        const getinfo=()=>{
            // 根据id查询数据
            get_news({
                id:Number(props.id),
                pageSize:2,
                pageNumber:1
            }).then(res=>{
                form.title=res.data.data.data[0].title
                form.content=res.data.data.data[0].content
                form.category=res.data.data.data[0].categoryId
            })
        }
        // 确认/提交
        const submit=(()=>{
            edit_news({
                id:props.id,
                categoryId:form.category,
                title:form.title,
                content:form.content,
            }).then(res=>{
                console.log(res)
                root.$message({
                    type:'success',
                    message:res.data.message,
                    duration:1000
                })
                close()//确认之后退出
                emit('reload')//确认之后重新加载
            })
        })
        const close=(()=>{
            emit('update:info_dailog_edit',false)
            form.title=""
            form.content=""
            form.category=""
        })
// -----------------------------------watch-----------------------------------
        watch (()=>props.info_dailog_edit,(newValue,oldValue)=>{
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
}
</script>
<style lang="scss" scoped>
    
</style>