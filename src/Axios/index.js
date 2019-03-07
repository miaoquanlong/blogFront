import axios from 'axios'
import { Loading } from 'element-ui'
let loading
function startLoading () {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading () {
    loading.close()
}
const $request = axios.create({
    baseURL: '/api',
    timeout: 15000
})


let needLoadingRequestCount = 0

function showFullScreenLoading () {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function tryHideFullScreenLoading () {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
// 添加请求拦截器

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    showFullScreenLoading()
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
// respone拦截器
axios.interceptors.response.use(response => {
    tryHideFullScreenLoading()
    return new Promise((resolve, reject) => {
        const { code, data } = response.data
        switch (code) {
            case 0:
                // 成功
                resolve(data)
                break
            case -1:
                // 失败
                reject(data)
                break
            default:
                resolve(data)
        }
    })
},
    error => {
        let message
        const {
            config: {
                name,
                baseURL,
                url
            },
            response
        } = error
        if (response) {
            const status = response.status
            if (name) {
                message = `获取${name}失败，code:${status}`
            } else {
                message = `请求${url.replace(baseURL, '')}失败，code:${status}`
            }
        } else {
            message = '服务无法访问，请联系管理员'
        }
        // this.$message({
        //     massage: message,
        //     type: error
        // })
        return Promise.reject(error)
    }
)

export default axios