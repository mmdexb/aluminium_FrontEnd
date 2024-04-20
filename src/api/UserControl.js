import request from '@/utils/request.js'
export const Userlist = (params) => {
    return request.get('/admin/getAllCert', { params: params })
}
export const userDelete = (params) => {
    return request.post(`/admin/delCert`,null, {params});
}

export const userPublish = (params) => {
    return request.post(`/admin/addCert`, null,{params});
}

export const userDetail = (cid) => {
    return request.get(`/public/getCertByid?cid=${cid}`)
        // .then(response => response.data);
};

export const updateuserLevel = (params) => {
    return request.post(`/admin/modCertLevel`,null, {params});
}
// request 也就是axios实例 这就是他们传参的区别
// request.get('请求地址',{headers,params,data})  请求参数query是拼在请求地址上的,这里的params都是 
// request.post('请求地址',data,{headers,params})  put  delete等都是和post一样  请求体body 是放在请求里的  所有请求都能同时传这两个,但是一般来说,get请求传params,post请求传body
