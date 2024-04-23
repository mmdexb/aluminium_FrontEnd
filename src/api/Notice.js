import request from "@/utils/request";

export const NoticeList = (params) => {
    return request.get('/public/getAllNotice', { params });
};

export const NoticePublish = (params) => {
    return request.post('/admin/addNotice',  params );
};

export const NoticeDetail = (id) => {
    return request.get(`/public/GetNoticeByid?id=${id}`)

};

export const NoticeDelete = (params) => {
    return request.get(`/admin/deleteNotice`,{params});
}

export const updateNotice =(params) =>{
    return request.post(`/admin/UpdateNotice`, params);
}
//这个我就完全照搬活动做了公告,但是尝试读取 nid 属性，但它是未定义的。