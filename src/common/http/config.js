
export default {
	// method: 'post',
	baseURL: process.env.NODE_ENV === 'development' ? 'http://test.h5.chinahuanong.com.cn' : '线上地址',
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Type': 'application/json;charset=UTF-8',
		// 'token': window.localStorage.getItem('userCode'),
		'token': 'sinPH27sos20190909174639272oft0Bo62'
	},
	data: {},
	timeout: 5000,
	withCredentials: false,
	responseType: 'json'
}
