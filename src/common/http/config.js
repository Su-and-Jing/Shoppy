
export default {
	// method: 'post',
	// baseURL: process.env.NODE_ENV === 'development' ? 'http://test.h5.chinahuanong.com.cn:8080/apollo' : '线上地址',
	baseURL: process.env.NODE_ENV === 'development' ? 'http://10.0.7.87:9080/apollo' : '线上地址',
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Type': 'application/json;charset=UTF-8',
		'token': window.sessionStorage.getItem("token"),
	},
	data: {},
	timeout: 5000,
	withCredentials: false,
	responseType: 'json'
}


