import request from '@/utils/request.js'
import { useTokenStore } from '../stores/token'

export const Userlist = (params) => {


    return request.get('/admin/getAllCert', { params: params })
}