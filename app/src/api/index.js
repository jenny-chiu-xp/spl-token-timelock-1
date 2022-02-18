import { post, get } from './request'

/** **********************user api********************/
export const loginByWallet = (params) => post('/api/user/login/address', params)

/** **********************order api********************/
export const createOrder = (params) => post('/api/order/create', params)
export const orderSuccess = (params) => post('/api/order/success', params)
export const orderWithdrawn = (params) => post('/api/order/withdrawn', params)
export const getOrderList = (params) => get('/api/order/list', params)
export const getOrderDetail = (id) => get(`/api/order/${id}`, {})
