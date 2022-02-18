import axios from 'axios'
import storage from 'store'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { ElMessage } from 'element-plus'
import i18n from '@/locales'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 30000
})

// request
service.interceptors.request.use(config => {
    const token = storage.get(ACCESS_TOKEN)
    if (token) {
        config.headers['Authorization'] = token
    }
    const lang = store.getters.lang
    config.headers['language'] = lang ? lang.substr(0, 2) : 'en'
    return config
}, error => {
    return Promise.reject(error)
})

const errorHandler = (error) => {
    if (error.response) {
        const { data, status } = error.response
        switch (status) {
            case 403:
                ElMessage.error(data.message)
                break
            case 404:
                ElMessage.error(data.message)
                break
            default:
                break
        }
    }
    return Promise.reject(error)
}

// response
service.interceptors.response.use(response => {
    return response.data
}, errorHandler)

export const createRequest = (url, params, method) => {
    return new Promise((resolve, reject) => {
        const query = {
            url: url,
            method: method
        }
        if (method === 'get') {
            query.params = params
        } else {
            query.data = params
        }
        service(query).then(res => {
            const { code, data, msg } = res
            if (code === 1000) {
                resolve(data)
            } else {
                const message = i18n.global.te(`result.error.${code}`) ? i18n.global.t(`result.error.${code}`) : msg
                reject(Error(`${message || msg || ''}`))
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export const post = (url, params) => {
    return createRequest(url, params, 'post')
}

export const put = (url, params) => {
    return createRequest(url, params, 'put')
}

export const get = (url, params) => {
    return createRequest(url, params, 'get')
}
