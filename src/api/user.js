import request from '@/utils/request.js'
import {ActivityDetail, ActivityPublish, updateEvent} from "@/api/ActivityControl";
import data from "bootstrap/js/src/dom/data";

export const userRegisterService=(registerData)=>{
    const params= new URLSearchParams();
    for(let key in registerData){
        params.append(key,registerData[key]);
    }

    return  request.post('/reg',params);

}

//登录接口函数
export const userLoginService=(loginData)=>{
    const params = new URLSearchParams();
    for(let key in loginData){
        params.append(key,loginData[key])
    }
    return  request.post('/login',params)
}

export const GetUserInfo=()=>{
    return request.get('/user/GetSelfInfo')
}

export const GetFlightByid=(params)=>{
    return request.get('/public/GetFlightByid2',{params:params});
}

export const getUserLevel=()=>{
    return request.get('/user/GetUserLevel', data.level)
}