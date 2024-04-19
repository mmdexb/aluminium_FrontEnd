import request from '@/utils/request.js'


export const Activitylist = (params) => {


    return request.get('/public/getAllEvent', { params: params })
}