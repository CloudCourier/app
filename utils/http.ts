import axios from 'axios'
import { Toast } from 'native-base'
const http = axios.create({
  baseURL: 'https://cccs.sunxinao.cn',
  // timeout: 5000, // request timeout
  withCredentials: true,
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

// 添加响应拦截器
http.interceptors.response.use(
  (response) => response,
  (err) => {
    const { response } = err
    Toast.show({
      title: response.data.message,
    })
  }
)
export default http
