import axios from 'axios'
import config from './config.js'
// import Cookies from 'cookies-js'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const instance = axios.create({
	baseURL: config.baseURL,
	headers: config.headers,
	transformResponse: [function (data) {}]
})

instance.interceptors.request.use(
	config => {
		return config
	},
	error => {
		if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
			alert('请求超时！')
			// return service.request(originalRequest)
		}
		// if (config.method.toLocaleLowerCase() === 'post'
		// 	|| config.method.toLocaleLowerCase() === 'put'
		// 	|| config.method.toLocaleLowerCase() === 'delete') {

		// 	config.data = qs.stringify(config.data)
		// }
		const errorInfo = error.response
		console.log(errorInfo)
		// if (errorInfo) {
		// const errorStatus = errorInfo.status // 404 403 500 ... 等
		// router.push({
		//   path: `/error/${errorStatus}`
		//  })
		// }
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

		// if (data.retcode == 2) { //未登录
		// 	Cookies.set('phone', undefined)
		// 	// main.$router.push('/login?isOrigin=1')
		// }
		// 若不是正确的返回code，且已经登录，就抛出错误
		// const err = new Error(data.description)

		// err.data = data
		// err.response = response

		// throw err
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
