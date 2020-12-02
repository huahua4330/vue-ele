<template>
    <div id="login">
        <div class="login-warp">
            <ul class="menu-tab">
                <li :class='{"current":item.current}' v-for="(item,index) in menuTab" :key="index" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                <el-form-item  prop="username" class="form-item">
                    <label for="username">邮箱</label>
                    <el-input id="username" type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="password" class="form-item">
                    <label for="password">密码</label>
                    <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item  prop="code" class="form-item">
                    <label for="code">验证码</label>
                        <el-row :gutter="10">
                            <el-col :span="15">
                                <el-input id="code" v-model.number="ruleForm.code"></el-input>
                            </el-col>
                            <el-col :span="9">
                                <el-button type="success" class="block">获取验证码</el-button>
                            </el-col>
                        </el-row>
                </el-form-item>

                <el-form-item class="form-item">
                    <el-button class="block top" type="danger" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import {validate_inputValue} from "@/utils/validate.js"
export default {
    data(){
        // 验证验证码
        var validateCode = (rule, value, callback) => {
            // console.log(validate_inputValue(value));
            this.ruleForm.code=value=validate_inputValue(value)
            let reg = /^[a-z0-9]{6}$/
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(!reg.test(value)){
                callback(new Error('验证码格式错误'));
            }else{
                callback()
            }
        
        };
        // 验证邮箱
        var validateUsername = (rule, value, callback) => {
            var reg =/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if (!reg.test(value)) {
                callback(new Error('邮箱格式错误'));
            }else{
                callback();
            }
        };
        // 验证密码
        var validatePassword = (rule, value, callback) => {
            // 验证的字段  输入的值  验证后做什么 (回调函数)
            let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
                callback(new Error('密码格式6~20位'));
            } else {
                // 正确
                callback();
            }
        };
        return{
            menuTab:[
                {txt:"登录" ,current:false},
                {txt:"注册" ,current:true}
            ],
            // input双向绑定数据
            ruleForm: {
                username: '',
                password: '',
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
        },
        submitForm(formName) {
            // 对表单的每一个字段进行验证
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
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
        margin: 0 auto;
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