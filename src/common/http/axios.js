import axios from 'axios'
import config from './config.js'
// import Cookies from 'cookies-js'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const instance = axios.create({
	baseURL: config.baseURL,
	headers: config.headers,
	transformResponse: [function (data) { }]
})

instance.interceptors.request.use(
	config => {

		var token = window.sessionStorage.getItem("token")
		if (token) {
			config.headers.token = token
		}

		return config
	},
	error => {
		if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
			alert('请求超时！')
			// return service.request(originalRequest)
		}
		const errorInfo = error.response
		console.log(errorInfo)
		return error
	}
)

instance.interceptors.response.use(
	response => {
		let data
		if (response.data === undefined) { // IE9
			data = response.request.responseText
		} else {
			data = response.data
		}
		data = JSON.parse(data)
		return data
	},
	err => {
		if (err && err.response) {
			switch (err.response.status) {
				case 400:
					err.message = '请求错误'
					break

				case 401:
					err.message = '未授权，请登录'
					break

				case 404:
					err.message = '404'
					break

				default:
			}
		}
		return err
	}
)

export default instance
