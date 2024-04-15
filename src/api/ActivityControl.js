import request from '@/utils/request.js'
import { useTokenStore } from '../stores/token'

export const Activitylist = (params) => {


    return request.get('/public/getAllEvent', { params: params })
}