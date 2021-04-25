import axios from 'axios'

const service = axios.create({
  timeout: 30 * 1000,
  maxRedirects: 3
})

// request 拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.error(error?.message || '未知错误')

    return Promise.reject(error)
  }
)

// respone 拦截器
service.interceptors.response.use(
  res => {
    const data = res.data

    if (data.code !== 0) {
      console.warn(data?.msg || data?.message || res?.message || '未知错误')
    }

    return res.data
  },
  error => {
    const response = error.response

    console.error(response?.data?.msg || response?.data?.message || response?.message || error?.message || '未知错误')

    return Promise.reject(error)
  }
)

export default service
