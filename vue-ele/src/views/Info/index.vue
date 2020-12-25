<template>
    <div>
        <div class="space-30"></div>
        <el-row :gutter="10"><!--代表两个之间有10个间隔-->
            <el-col :span="4">
                <div class="label-warp category">
                    <label for="category">分类：</label>
                    <div class="warp-content">
                        <el-select id="category" v-model="info_value" placeholder="请选择">
                            <el-option v-for="cate in category.item" :key="cate.id" :label="cate.category_name" :value="cate.id"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>

            <el-col :span="7">
                <div class="label-warp date">
                    <label for="date">日期：</label>
                    <div class="warp-content">
                        <el-date-picker
                            style="width='100%'"
                            v-model="date_value"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>

            <el-col :span="3">
                <div class="label-warp key-word" >
                    <label for="key-word">关键字：</label>
                    <div class="warp-content">
                        <el-select @change="search_keyword" id="key-word" style="width='100%'" v-model="search_key" placeholder="ID">
                            <el-option v-for="item in search_option" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>

            <el-col :span="3">
                <el-input v-model="search_input" placeholder="请输入内容"></el-input>
            </el-col>

            <el-col :span="2">
                <el-button type="danger" style="width:85%" @click="getNews">搜索</el-button>
            </el-col>

            <el-col :span="4">
                <el-button type="danger" style="width:50%" class="pull-right" @click="info_dailog=true">新增</el-button>
            </el-col>

        </el-row>

        <div class="space-30"></div>
        <el-row>
            <el-table :data="table_data.item" border style="width: 100%" ref="table" @selection-change='selected'>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="标题" min-width="5"></el-table-column>
                <el-table-column prop="categoryId" label="类别" :formatter="_cate" min-width="1"></el-table-column>
                <el-table-column prop="createDate" label="日期" :formatter="_date" min-width="2"></el-table-column>
                <el-table-column prop="id" label="管理人" min-width="1"></el-table-column>
                <el-table-column label="操作" min-width="2">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
                        <el-button size="mini" type="success" @click="editItem(scope.row.id)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <div class="space-30"></div>
        <el-row>
            <el-col :span='12'>
                <el-button @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span='12'>
                <el-pagination
                    class="pull-right"
                    background 
                    :current-page="current_page"
                    @currnet-change='current_change'
                    @size-change='size_change'
                    :page-sizes="[2,5,8]"
                    layout="sizes,total,prev, pager, next" 
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        
        <!-- 新增弹框 -->
        <newInfo :info_dailog.sync='info_dailog' :category='category.item' @loadNews="getNews"></newInfo>
        <!-- 编辑弹框 -->
        <Edit :info_dailog_edit.sync='info_dailog_edit' @reload="getNews" :category='category.item' :id="editId"/>
    </div>
</template>
<script>
import {computed, onMounted, reactive, ref,watch} from '@vue/composition-api'
import newInfo from './dialog/info'
import Edit from './dialog/edit'
import {global} from '@/utils/global3.0.js'
import {common} from '@/api/common.js'
import {get_news,delete_news} from "@/api/info.js"
import {formatDate} from '@/utils/functions.js'
export default {
    components:{newInfo,Edit},
    setup(props,{emit,refs,root}){
// ----------------------------- 公共业务 ------------------------------------
        const category = reactive({
            item:[]
        })

        const {confirm} =global()//3.0调用 对象
        const {category:_category ,getCategoryAll}=common()
        watch(()=>_category.item,(value)=>{
            category.item=value
        })
// ---------------------------- 生命周期相关----------------------------------
        onMounted(()=>{
            // 1.vuex 获取 2.vue3.0公共业务抽离 分类信息
            getCategoryAll()
            // 2.获取列表数据
            getNews()
            // console.log(root.$moment.unix('1608684620').format())
        })
// ------------------------------ 数据 data ----------------------------------
        // 类型的默认数据
        const info_value=ref('')
        // 日期的默认数据
        const date_value=ref('') //布尔值 字符串 数字
        // 搜索的默认数据
        const search_key=ref('id')
        // 搜索框下拉数据
        const search_option=reactive([
            {value: 'id', label: 'ID' }, 
            {value: 'title', label: '标题' }
        ])
        // 设置搜索框
        const search_input=ref('')
        // 表格数据
        const table_data = reactive({
            item:[]
        })
        // 新增弹框
        const info_dailog=ref(false) 
        const total=ref(0)
        // 编辑
        const info_dailog_edit=ref(false)
        // 选中的数据行
        let selected_data= reactive([])
        const editId=ref('')
// ----------------------------methods----------------------------------
        const editItem=((id)=>{
            info_dailog_edit.value=true
            editId.value=id
        })
        // 格式化日期
        const _date=(row)=>{
            // 时间戳转化成对应的日期格式
            return formatDate(row.createDate)
        } 
        // 格式化分类 
        const _cate=((row)=>{
            let cate_name=""
            let tmp=category.item.map(cate=>{
                if(cate.id==row.categoryId){
                cate_name=cate.category_name
                }
            }) 
            return cate_name
        })
        const current_page=ref(1)
        const page = reactive({
            pageNumber:1, //页码
            pageSize:5    //页大小
        })
        // 点击页码
         const current_change=((currentPage)=>{
            page.pageNumber=currentPage
            getNews()
        })
        // 点击页大小
        const size_change=((pageSize)=>{
            page.pageSize=pageSize
            getNews()
        })
        // 选择搜索的类型
        const search_keyword=((value)=>{
            search_key.value=value
        })
        const search=(()=>{
            let data={
                pageNumber:page.pageNumber, //页码  当前页
                pageSize:page.pageSize      //页大小
            }
            // 处理类别搜索
            if(info_value.value){
                data.categoryId=info_value.value
            }
            // 日期
            if(Array.isArray(date_value.value) && date_value.value.length>0){
                data.startTime=date_value.value[0] 
                data.endTime=date_value.value[1]
            }
            // 关键字
            if(search_input.value){
                data[search_key.value]=search_input.value
            }

            return data
 
        })
        // 获取列表数据
        const getNews=()=>{
            let data=search()
            get_news(data).then(res=>{
            // 如果当前没数据 搜索上一页
                table_data.item=res.data.data.data
                total.value=res.data.data.total
                // 重新刷新的目的是为了请求上一页的数据
                if(res.data.data.data.length ==0 && page.pageNumber!=1){
                    window.location.reload()
                }
            })
        }
        
        // vue注入全局方法  通过vue 实例 调用
        const delete_item=(ids)=>{
            // console.log(id)
            // 发送请求 删除数据
            // console.log('删除')
            delete_news({
                id:ids
            }).then(res=>{
                // page.pageNumber=1,
                // page.pageSize=5
                // current_page
                getNews()
            })
        }
        // 删除
        const deleteItem=((id)=>{
            
            selected_data = reactive([Number(id)])
            confirm({//2.0调用 方法一comdel
                content:'此操作将永久删除该文件, 是否继续?',
                Tips:'提示',
                type:'info', 
                center:'true',
                callback:delete_item,
                id:selected_data
            })
        }) 
        const selected=(rows)=>{
            // console.log(rows)
            selected_data = reactive([])
            rows.map(item=>{
                selected_data.push(item.id)
            })
        }
        // 批量删除
        const deleteAll=((id)=>{
            const {confirm} =global()
            // 选中数据在执行删除
            if(selected_data.length==0){
                root.$message({
                    type:'error',
                    message:'请选中数据',
                    duration:1000
                })
                return false
            }

            confirm({
                content:'此操作将永久删除该文件, 是否继续?',
                Tips:'提示',
                type:'warning', 
                center:'true',
                callback:delete_item,
                id:selected_data
            })
        })

        
        
        return{
            // ref 
            info_value,date_value,search_key,search_input,info_dailog,info_dailog_edit,total,current_page,editId,
            // reactive
            search_option,table_data,category,
            // methods
            search_keyword,current_change,deleteItem,deleteAll,selected,_date,_cate,getNews,size_change,editItem
        }
    }
}
</script>
<style lang="scss" scoped>
    .label-warp{
        &.category{@include labelDom(center,60,40)}
        &.date{@include labelDom(left,50,40)}
        &.key-word{@include labelDom(left,60,40)}
    }
</style>