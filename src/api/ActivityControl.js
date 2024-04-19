import request from '@/utils/request.js';

export const ActivityList = (params) => {
    return request.get('/public/getAllEvent', { params });
};

export const ActivityPublish = (params) => {
    return request.post('/admin/addEvent',  params );
};

export const ActivityDetail = (id) => {
    return request.get(`/public/GetEvent?id=${id}`)
        .then(response => response.data);
};

export const ActivityDelete = (params) => {
    return request.get(`/admin/deleteEvent`, {params});
}

export const updateEvent =(params) =>{
    return request.post(`/admin/updateEvent`, params);
}