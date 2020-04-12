import axios from 'axios'
import { baseUrl } from '../config/env'

axios.defaults.baseURL = baseUrl
// axios.defaults.timeout = Timeout

// 请求拦截器
axios.interceptors.request.use(request => {
  return request
})

export default async (url = '', datas = {}, type = 'GET') => {
  type = type.toUpperCase()

  if (type === 'GET') {
    const { data, status } = await axios.get(url, {
      params: datas
    })
    if (status === 200) {
      return data
    } else {
      return status
    }
  } else if (type === 'POST') {
    const { data, status } = await axios.post(url, datas)
    if (status === 200) {
      return data
    } else {
      return status
    }
  }
}
