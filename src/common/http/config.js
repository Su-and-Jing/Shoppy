
export default {
	// method: 'post',
	baseURL: process.env.NODE_ENV === 'development' ? 'http://test.h5.chinahuanong.com.cn:8080' : '线上地址',
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Type': 'application/json;charset=UTF-8',
		'token': window.localStorage.getItem("token"),
	},
	data: {},
	timeout: 5000,
	withCredentials: false,
	responseType: 'json'
}


