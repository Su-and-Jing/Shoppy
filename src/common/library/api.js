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


