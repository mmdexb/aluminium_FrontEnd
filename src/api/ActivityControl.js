import request from '@/utils/request.js';

export const ActivityList = (params) => {
    return request.get('/public/getAllEvent', { params });
};