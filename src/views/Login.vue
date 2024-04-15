<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token.js'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
const router = useRouter();
const tokenStore = useTokenStore();
//定义数据模型
const registerData=ref({
    cid:'',
    password:'',
    repassword:'',
    realname:'',
    email:''
})

//校验密码函数
const checkRepassword=(rule,value,callback)=>{
    if(value==''){
        callback(new Error('请再次确认密码'))
    }else if(value !==registerData.value.password){
        callback(new Error('两次密码不同'))
    }else{
        callback()
    }

}
//校验邮箱函数
const validate_email = (rule, value, callback) => {
    var emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var emailRegExp1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if ((!emailRegExp.test(value) && value != '') || (!emailRegExp1.test(value) && value != '')) {
        callback(new Error('请输入有效邮箱格式！'));
    } else {
        callback();
    }
};

//定义表单校验规则
const rules={
    cid:[
        {required:true,message:"请输入用户名",trigger:'blur'},
        {min:4,max:16,message:"cid应在4-16位字符",trigger:'blur'}

    ],
    password:[
        {required:true,message:"请输入密码",trigger:'blur'},
        {min:5,max:16,message:"密码应在5-16位字符",trigger:'blur'}
    ],
    repassword:[
        {validator:checkRepassword,trigger:'blur'}
    ],
    realname:[
        {required:true,message:"请输入真实姓名",trigger:'blur'},
    ],
    email:[
        {required:true,message:"请输入邮箱",trigger:'blur'},
        {validator:validate_email,trigger:'blur'}
    ]
}
//调用后台接口完成注册
import {userRegisterService,userLoginService} from '@/api/user'

const register=async ()=>{
    let result = await userRegisterService(registerData.value);
    ElMessage.success("注册成功")
    router.push('/login')
    // if (result.code==1){
    //   alert("注册成功");
    // }else{
    //   alert(result.msg);
    // }
}

const login=async ()=>{
    let result=await userLoginService(registerData.value);
    tokenStore.setToken(result.data)
    ElMessage.success("登陆成功")
    router.push('/')
    // if(result.code==1){
    //   alert("登陆成功")
    // }else{
    //   alert(result.msg)
    // }
}
//清空数据模型的数据
const clearRegisterData=()=>{
    registerData.value={
      cid:'',
      password:'',
      repassword:'',
      realname:'',
      email:''
    }
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="cid">
                    <el-input :prefix-icon="User" placeholder="请输入cid" v-model="registerData.cid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.repassword"></el-input>
                </el-form-item>
                <el-form-item prop="realname">
                    <el-input  placeholder="请输入真实姓名" v-model="registerData.realname"></el-input>
                </el-form-item>
                <el-form-item prop="email"> 
                    <el-input  placeholder="请输入邮箱" v-model="registerData.email"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="cid">
                    <el-input :prefix-icon="User" placeholder="请输入cid" v-model="registerData.cid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login" >登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>