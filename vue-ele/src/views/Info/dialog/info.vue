<template>
    <div>
        <!-- my_info_dailog和info_dailog关闭 才具备第二次点击变成true的条件 -->
        <el-dialog title="收货地址" :visible.sync="my_info_dailog" @close='close' append-to-body>
        
        </el-dialog>
    </div>
</template>
<script>
// 单项数据流  父组件传递的参数子组件可以使用 但是不能直接修改
export default{
    props:{
        info_dailog:{//里面可以写type类型 默认值  valia校验规则 
            type:Boolean,
            default:false
        }
    },
// ----------------------------- vuex 2.0-------------------------------------
    data(){
        return{
            my_info_dailog:false
        }
    },
    watch:{
        info_dailog:{//监听父组件的属性变化  一个是旧值，一个是新值
            handler(newValue,oldValue){
                this.my_info_dailog=newValue//父组件传给子组件  
            }
        }
    },
    methods:{
        close(){
            /*
                使用属性修饰符 ：是通过.sync告知父组件来更新摸一个数据 ，适合场景：只是告知父组件更新摸一个值没有其他业务逻辑
                触发事件 ：是父组件监听子组件的自定义事件触发父组件的一个回调函数 适合场景：可能在父组件的回调函数中写其他的业务逻辑
            */
            this.$emit('update:info_dailog',false)//父组件来更新 不是子组件

            //子组件通过本身的事件向父组件触发一个事件 父组件就可以监听这个自定义事件
            // this.$emit('close',false) //需要父组件监听事件  
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>