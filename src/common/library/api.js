import axios from '../http/axios'

export const login = data => {
  return axios.post('/login/login', data)
}
//选择出单机构
export const institution = data => {
  return axios.post('/api/sales/', data)
}
//手机号登录接口
export const iphoneLogin = data => {
  return axios.post('/login/login/phone', data)
}



