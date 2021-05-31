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
                                <el-button type="success" v-bind:disabled="codeButtonStatus" class="block" @click="getCode">{{codeButtonText}}</el-button><!-- 点击获取验证码 -->
                            </el-col>
                        </el-row>
                </el-form-item>

                <el-form-item class="form-item">
                    <el-button class="block top" type="danger" :disabled="buttonStatus" @click="submitForm('ruleForm')">{{this.mode=='login' ? '登陆' : '注册'}}</el-button><!-- 是否禁用:disabled -->
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import validateUtils from "@/utils/validate.js"
import {onMounted,reactive,ref} from "@vue/composition-api"
import {get_code,do_register,do_login} from "@/api/login.js" 
export default {
    setup(prop,{refs,root}) {
// ---------------------------- 生命周期 --------------------------------------
        // onMounted(()=>{
        //     get_code().then(res=>{
        //         console.log(res)
        //     })
        // })
// ----------------------------- data -----------------------------------------
        const status_username=ref(false)
        const status_password=ref(false)
        const status_password1=ref(false)
        // 验证邮箱
        let validateUsername = (rule, value, callback) => {
            ruleForm.username=value=validateUtils.validate_inputValue(value,'email')
            if (value === '') {
                status_username.value=false
                callback(new Error('请输入邮箱'));
             } else if (validateUtils.test_email(value)) {
                status_username.value=false
                callback(new Error('邮箱格式错误'));
            }else{
                status_username.value=true 
                callback();
            }
        };
        // 验证密码
        let validatePassword = (rule, value, callback) => {
            // 验证的字段  输入的值  验证后做什么 (回调函数)
            ruleForm.password=value=validateUtils.validate_inputValue(value,'password')
            if (value === '') {
                status_password.value=false
                callback(new Error('请输入密码'));
            } else if (validateUtils.test_password(value)) {
                status_password.value=false
                callback(new Error('密码格式6~20位'));
            } else {
                // 正确
                status_password.value=true
                callback();
            }
        };
        // 验证重复密码
        let validatePassword1 = (rule, value, callback) => {
            if(mode.value == 'login') {

                callback();
                return
            }
            // 验证的字段  输入的值  验证后做什么 (回调函数)
            ruleForm.password1=value=validateUtils.validate_inputValue(value,'password1')
            if(value!==ruleForm.password){
                status_password1.value=false//判断格式是否正确
                callback(new Error('两次密码不一致'));
            }else{
                status_password1.value=true
                callback();
            }
        };
        // 验证验证码
        let validateCode = (rule, value, callback) => {
            // console.log(validate_inputValue(value));
            // 过滤非法字符
            ruleForm.code=value=validateUtils.validate_inputValue(value,'code')
            // 验证码有六位
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(validateUtils.test_code(value)){
                callback(new Error('验证码格式错误'));
            }else{
                callback()
            }
        };

        // 定义tab切换模式
        const mode=ref("login")
        // 定义表单相关数据
        const  menuTab= reactive([
            {txt:"登录" ,current:true,type:'login'},
            {txt:"注册" ,current:false,type:'register'}
        ])
        // input双向绑定数据
        const ruleForm= reactive({
            username: '',
            password: '',
            password1:'',
            code: ''
        })
        // 校验方式
        const rules=reactive({
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
        })
       
       
       // 定义登陆注册按钮启用和禁用
        const buttonStatus=ref(true) 
        // 定义验证码按钮的启用和禁用
        const codeButtonStatus=ref(false)
        // 定义验证码按钮文本
         const codeButtonText=ref('获取验证码')
        // 定义验证码延迟定时器
        const timer_delay=ref(null)
        // 定义验证码倒计时定时器
        const timer_count_down=ref(null)
// ----------------------------- methods -----------------------------------
        
        const submitForm=(formName=> {
            // 对表单的每一个字段进行验证
            refs[formName].validate((result) => {
                if (result) {
                    // 执行登陆注册
                    mode.value=='login' ? doLogin() :doRegister()
                } else {
                    return false;
                }
            });
        })
         
        const toggleMenu=((item)=>{
            menuTab.map(item=>item.current=false)
            item.current=true
            mode.value=item.type
            // 点击切换的时候清空表单数据
            refs['ruleForm'].resetFields()
            // 还原验证码相关状态
            resetCodeButton()
            // 还原登陆注册按钮状态
            buttonStatus.value=true
        }) 

        // 获取验证码
        const getCode=(()=>{
            const {result,filed}=validataFileds()
            let offset=0
            // 判断邮箱格式 密码 重复密码的格式
            if(!result){//true 验证通过 false 验证未通过
            filed.map(item=>{
                offset+=40
                root.$message({
                    type:"error",
                    message:`错误字段:${item.message}`,//显示错误字段
                    offset:offset,//间距
                    duration:2000//延迟时间
                })
            })
                return false
            }
            // 点击获取验证码之后 让按钮禁用 显示‘发送中’
            setCodeButton({
                status:true,
                text:'发送中'
            })
            // 为了模拟网络延迟 定时器  一次性
            timer_delay.value=setTimeout(()=>{
                const data={
                    username:ruleForm.username,
                    // module:"login",
                    module:"mode.value"
                }
                get_code(data).then((res)=>{
                    // console.log(1)
                    // console.log(res)
                    // console.log(res.data.message)
                    // 获取到对应的验证码
                    root.$message.success(res.data.message)
                    // 显示倒计时
                    countDown(10)
                    // 登陆注册按钮启用
                    buttonStatus.value=false
                }).catch((err)=>{
                    console.log(2)
                })
            },3000)
        })
// ------------------------------辅助方法-----------------------------------
        // 验证码定时器的倒计时效果 周期性 
        const countDown =(timer)=>{
            if(timer_count_down.value){//存在定时器
                clearInterval(timer_count_down.value)
            }
            timer_count_down.value=setInterval(()=>{
                timer--;
                if(timer===0){
                    clearInterval(timer_count_down.value)
                    // 显示重新发送
                    setCodeButton({
                        status:false,
                        text:'重新发送'
                    })
                }else{
                    codeButtonText.value=`倒计时${timer}秒`
                }
            },1000)
        }
        // 还原验证码相关状态
        const resetCodeButton=()=>{
            // 默认启用 获取验证码
            setCodeButton({
                status:false,
                text:'获取验证码'
            })
            // 清空所有定时器
            clearTimeout(timer_delay.value)
            clearInterval(timer_count_down.value)
        }
        
        // 设置获取验证码的相关状态
        const setCodeButton=({status,text})=>{
            codeButtonStatus.value=status
            codeButtonText.value=text
        }

        // 执行登陆
        const doLogin=()=>{
            const data={
                username:ruleForm.username,
                password:ruleForm.password,
                code:ruleForm.code
            }
            root.$store.dispatch('app/login',data).then(res=>{
                root.$message.success(res.data.message)
                // 登陆后跳转到首页
                root.$router.push({
                    name:"Home"
                })
            }).catch(err=>{

            })
            // 网络请求  vuex-actions--mutations --state
            // do_login(data).then(res=>{
                // root.$message.success(res.data.message)
                // // 登陆后跳转到首页
                // root.$router.push({
                //     name:"Home"
                // })
            // }).catch(err=>{

            // })
        }
        // 执行注册 
        const doRegister=()=>{
            const data={
                username:ruleForm.username,
                password:ruleForm.password,
                code:ruleForm.code
            }
            // 执行注册 
            do_register(data).then(res=>{
                // 提示注册成功
                root.$message.success(res.data.message)
                // console.log(res)
                // 注册成功后直接切换到登陆tab
                toggleMenu(menuTab[0])
            }).catch(err=>{

            })
        }
        // 获取验证码是验证相关字段
        const validataFileds=()=>{
            const result=status_username.value && status_password.value
            const _filed_arr=[
                {filed:"username",flag:status_username.value,message:"邮箱格式错误"},
                {filed:"password",flag:status_password.value,message:"密码格式错误"},
            ]
            if(mode.value==='register'){
                _filed_arr.push({filed:"password1",flag:status_password1.value,message:"重复密码错误"})
                result=status_username.value&&status_password.value&&status_password1.value
            }
            return{
                result:result,
                filed:_filed_arr.filter(item=>!item.flag)
            }
        }
        return {
            mode,
            menuTab,
            ruleForm,
            rules,
            submitForm,
            toggleMenu,
            getCode,
            buttonStatus,
            codeButtonStatus,
            codeButtonText
        }
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