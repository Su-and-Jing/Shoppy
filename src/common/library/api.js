import axios from '../http/axios'

export const login = data => {
  return axios.post('/login/login', data)
}

export const UploadImg = data => {
  return axios.post('/api/imgAI', data)
}
export const institution = data => {
  return axios.post('/api/sales/', data)
}
export const price = data => {
  return axios.post('/api/quote/', data)
}
//手机号登录接口
export const iphoneLogin = data => {
  return axios.post('/login/login/phone', data)
}
//核保接口
export const confirmInsured = data => {
  return axios.post('/api/under/', data)
}
//生成报价单接口
export const Offer = orderNo => {
  return axios.get(`/api/quote/bill/${orderNo}`,
  )
}
//查看报价单接口
export const OfferPage = orderNo => {
  return axios.get(`/api/quote/bill/page/${orderNo}/a/`,
  )
}
//确认报价到核保页面
export const priceToConfirm = orderNo => {
  return axios.get(`/api/under/pre/${orderNo}`,
  )
}
//确认报价到平台信息参考页面
export const TerracePage = orderNo => {
  return axios.get(`/api/quote/platFormMessage/${orderNo}`,
  )
}
// 订单列表页
export const orderInfoList = data => {
  return axios.post('/api/orderInfo/orderInfoList', data)
}
// 在线支付接口
export const apply = orderNo => {
  return axios.get(`/api/payment/apply/${orderNo}`,
  )
}
// 获取特约接口
export const engage = data => {
  return axios.get('/api/engage/', data)
}
// 添加特约接口
export const addEngage = data => {
  return axios.post('/api/engage/', data)
}
//电子发票获取

export const edownload = contractNo => {
  return axios.get(`/api/policy/edownload/${contractNo}`,
  )
}




