//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token.js';


//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

instance.interceptors.request.use(
    (config)=>{
        //在发送请求之前做什么
        let tokenStore = useTokenStore()
        //如果token中有值，在携带
        if(tokenStore.token){
            config.headers.Authorization=tokenStore.token
        }
        return config
    },
    (err)=>{
        //如果请求错误做什么
        return Promise.reject(err)
    }
)
import router from '@/router';

//添加响应拦截器
instance.interceptors.response.use(
    result => {
        //如果业务状态码为0，代表本次操作成功
        if (result.data.code == 1) {
            return result.data;
        }
        if(result.data.code==0&&result.data.msg=="NOT_LOGIN"){
            ElMessage.error('未登录，将跳转到登陆界面');
            router.push('/login')
        }

    }
)

export default instance;
