import request from '@/utils/request.js';

export const GetUserNum = () => {
    return request.get('/public/GetPilotNum');
}

export const GetATCnum = () => {
    return request.get('/public/GetAtcNum');
}

export const GetActNum = () => {
    return request.get('/public/GetActNum');
}

export const GetActivitys = (params) => {
    return request.get('/public/getAllEvent', { params: params });
}

export const GetNotices = (params) => {
    return request.get('/public/getAllNotice', { params: params });
}

export const GetOnlineTimeUsers = () => {
    return request.get('/public/GetAllOnlineSort');
}
export const GetHotAirport =()=>{
    return request.get('/public/GetAirportList');
}
