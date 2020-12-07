<template>
    <div id="login">
        <div class="login-warp">
            <ul class="menu-tab">
                <li :class='{"current":item.current}' v-for="(item,index) in menuTab" :key="index" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                <el-form-item  prop="username" class="form-item">
                    <label for="username">邮箱</label>
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="password" class="form-item">
                    <label for="password">密码</label>
                    <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item v-show="mode=='register'" prop="password1" class="form-item">
                    <label for="password1">重复密码</label>
                    <el-input id="password1" type="text" v-model="ruleForm.password1" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item  prop="code" class="form-item">
                    <label for="code">验证码</label>
                        <el-row :gutter="10">
                            <el-col :span="15">
                                <el-input id="code" v-model="ruleForm.code"></el-input>
                            </el-col>
                            <el-col :span="9">
                                <el-button type="success" class="block">获取验证码</el-button>
                            </el-col>
                        </el-row>
                </el-form-item>

                <el-form-item class="form-item">
                    <!-- <p>{{num}}</p> -->
                    <!-- <p>{{obj.name}}</p> -->
                    <!-- <p @click="test">调用</p> -->
                    <el-button class="block top" type="danger" @click="submitForm('ruleForm')">{{this.mode=='login' ? '登陆' : '注册'}}</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import validateUtils from "@/utils/validate.js"
import {onMounted,reactive,ref} from "@vue/composition-api"
export default {
    setup(prop,{refs}) {
        
        // 3.0----等价------>2.0
        // context.attrs//this.$attrs 包含了父组件给子组件传递到属性（除了prop之外的其他属性，也除了class style 等属性）
        // context.slots//this.$slots 访问当前组件中的插槽
        // context.parent//this.$parent 代表父组件的实例化对象 this.$parent, 调用父组件的方法和属性
        // context.root//this.$root 根组件
        // context.emit//this.$emit 子组件向父组件触发一个自定义方法，目的是为了传递参数，这是实现2.0父子组件传值的基本方式
        // context.refs//this.$refs 在组件中获取dom元素的引用 返回时一个对象。ref在dom的js对象，ref在子组件上，返回的是子组件的实例化对象 this.$refs.xx 调用了子组件的数据和方法 自己测试!!!
    // 1.数据的定义和使用
        // 引用类型数据 object array
        const obj=reactive({name:"Justin",age:21})
        console.log(obj.name)
        // 基本类型数据 string number null undefined boolean 返回的是响应式对象
        const num =ref(100) 
        // const flag =ref(true) 
        // flag.value=false
        // console.log(flag)
        // console.log(flag.vlaue)

        // 获取.value 触发get方式  
        // num.value 
        // 设置.value='新值' 触发set方法 -->通知视图更新
        // num.value=1000


    // 2.setup定义数据 生命周期钩子 自定义方法
        // 1.定义的数据必须return 如果不return 不能再模板中使用
        // 2.定义生命周期
        
        onMounted(()=>{//回调函数
            // console.log('Lay')
        })
        // 3.定义自定义方法 如果在模板中使用这个函数，必须return
        const test=(()=>{
            // console.log("这是一个测试方法")
            test()
        })

        return {
            obj,
            num,
            test
        }
    },
    data(){
        // 验证邮箱
        var validateUsername = (rule, value, callback) => {
            this.ruleForm.username=value=validateUtils.validate_inputValue(value,'email')
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if (validateUtils.test_email(value)) {
                callback(new Error('邮箱格式错误'));
            }else{
                callback();
            }
        };
        // 验证密码
        var validatePassword = (rule, value, callback) => {
            // 验证的字段  输入的值  验证后做什么 (回调函数)
            this.ruleForm.password=value=validateUtils.validate_inputValue(value,'password')
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (validateUtils.test_password(value)) {
                callback(new Error('密码格式6~20位'));
            } else {
                // 正确
                callback();
            }
        };
        // 验证重复密码
        var validatePassword1 = (rule, value, callback) => {
            if(this.mode == 'login') {
                callback();
                return
            }
            // 验证的字段  输入的值  验证后做什么 (回调函数)
            this.ruleForm.password1=value=validateUtils.validate_inputValue(value,'password1')
            if(value!==this.ruleForm.password){
                callback(new Error('两次密码不一致'));
            }else{
                callback();
            }
        };
        // 验证验证码
        var validateCode = (rule, value, callback) => {
            // console.log(validate_inputValue(value));
            // 过滤非法字符
            this.ruleForm.code=value=validateUtils.validate_inputValue(value,'code')
            // 验证码有六位
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(validateUtils.test_code(value)){
                callback(new Error('验证码格式错误'));
            }else{
                callback()
            }
        };
        return{
            mode:'login',
            menuTab:[
                {txt:"登录" ,current:true,type:'login'},
                {txt:"注册" ,current:false,type:'register'}
            ],
            // input双向绑定数据
            ruleForm: {
                username: '',
                password: '',
                password1:'',
                code: ''
            },
            // 校验方式
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                password1: [
                    { validator: validatePassword1, trigger: 'blur' }
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            }
        };
    },
    methods:{
        
        toggleMenu(item){
            // console.log(item )
            // item.current=!item.current
            this.menuTab.map(item=>item.current=false)
            item.current=true
            this.mode=item.type
        },
        submitForm(formName) {
            // 对表单的每一个字段进行验证
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit! OK!!!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="scss">
    #login{
        display: flex;
        height: 100vh;/*100vh 基于浏览器的可视区域处理的*/
        background: #344a5f;
    }
    .login-warp{
        width: 330px;
        margin: 200px auto;
    }
    .menu-tab{
        text-align: center;
        li{
            display: inline-block;
            width: 88px;
            height: 36px;
            line-height: 36px;
            color: white;
            border-radius: 5px;
        }
        .current{
            background: rgba(0,0,0,.1);
        }
    }
    .login-form{
        label{
            display: block;
            color:white ;
            font-size: 14px;
            margin-bottom: 3px;
        }
        .form-item{
            margin-bottom: 13px;
        }
        .top{
            margin-top:25px ;
        }
        .block{
            display: block;
            width: 100%;
        }
    }
</style>