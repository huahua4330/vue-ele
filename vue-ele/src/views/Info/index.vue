<template>
    <div>
        <div class="space-30"></div>
        <el-row :gutter="10"><!--代表两个之间有10个间隔-->
            <el-col :span="4">
                <div class="label-warp category">
                    <label for="category">类型：</label>
                    <div class="warp-content">
                        <el-select id="category" v-model="info_value" placeholder="请选择">
                            <el-option label="分类一" value="1"></el-option>
                            <el-option label="分类二" value="2"></el-option>
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
                        <el-select @change="search_keyword" id="category" style="width='100%'" v-model="search_key" placeholder="请选择">
                            <el-option v-for="item in search_option" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>

            <el-col :span="3">
                <el-input v-model="search_input" placeholder="请输入内容"></el-input>
            </el-col>

            <el-col :span="2">
                <el-button type="danger" style="width:85%">搜索</el-button>
            </el-col>

            <el-col :span="4">
                <el-button type="danger" style="width:50%" class="pull-right" @click="info_dailog=true">新增</el-button>
            </el-col>

        </el-row>

        <div class="space-30"></div>
        <el-row>
            <el-table :data="table_Data" border style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="标题" min-width="5"></el-table-column>
                <el-table-column prop="category" label="类别" min-width="1"></el-table-column>
                <el-table-column prop="date" label="日期" min-width="2"></el-table-column>
                <el-table-column prop="user" label="管理人" min-width="1"></el-table-column>
                <el-table-column label="操作" min-width="2">
                    <template >
                        <el-button size="mini" type="danger">删除</el-button>
                        <el-button size="mini" type="success">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <div class="space-30"></div>
        <el-row>
            <el-col :span='12'>
                <el-button>批量删除</el-button>
            </el-col>
            <el-col :span='12'>
                <el-pagination
                    class="pull-right"
                    background 
                    :current-page="2"
                    :currnet-change='current_change'
                    :page-sizes="[10,20,30]"
                    layout="sizes,total,prev, pager, next" 
                    :total="1000">
                </el-pagination>
            </el-col>
        </el-row>
        
        <!-- 新增弹框 -->
        <newInfo :info_dailog.sync='info_dailog'/>

    </div>
</template>
<script>
import {computed, reactive, ref} from '@vue/composition-api'
import newInfo from './dialog/info'
export default {
    components:{newInfo},
    setup(){
// ------------------------------数据-----------------------------------
        // 类型的默认数据
        const info_value=ref('')
        // 日期的默认数据
        const date_value=ref('')
        // 搜索的默认数据
        const search_key=ref('')
        // 搜索框下拉数据 
        const search_option=reactive([
            {value: 'id', label: 'ID' }, 
            {value: 'png', label: 'PNG' }
        ])
        // 设置搜索框
        const search_input=ref('')
        // 表格数据
        const table_Data = reactive([
            {   
                title:'纽约市长白思豪宣布退出总统竞选 特朗普发布回应',
                category:'国内信息',
                date: '2016-05-02 19::31:31',
                user: '管理员',
            },
            {   
                title:'习近平在中央政协工作会议庆祝中国人民政协成立70周年大会上发表重要讲话',
                category:'国内信息',
                date: '2016-05-02 19::31:31',
                user: '张三',
            },
            {   
                title:'斯里巴斯与台当局"断交" 系蔡当局上台后断交第7国',
                category:'国内信息',
                date: '2016-05-02 19::31:31',
                user: '李四',
            },
            {   
                title:'不选了，纽约市长白思豪宣布退出2020美国大选',
                category:'国内信息',
                date: '2016-05-02 19::31:31',
                user: '李四',
            }
        ])
        // 新增弹框
        const info_dailog=ref(false) 
// ----------------------------methods----------------------------------
        const search_keyword=((value)=>{
            console.log(value)
        })
        const current_change=((currentpage)=>{
            console.log(currentpage)
        })
        return{
            // ref 
            info_value,date_value,search_key, search_input,info_dailog,
            // reactive
            search_option,table_Data,
            // methods
            search_keyword,current_change,
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