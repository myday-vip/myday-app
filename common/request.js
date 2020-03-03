function getToken(){
	try{
		return uni.getStorageSync("MYDAY-TOKEN")
	}catch(e){
		console.error(e)
	}
}
function setToken(token){
	try{
		uni.setStorageSync("MYDAY-TOKEN", token)
	}catch(e){
		console.error(e)
	}
}
function request(url, postData, method, type, showLoading) {
		//接口请求
		if (showLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...'
			})
		}
		url = "http://localhost:8080/" + url
		const token = getToken()
		console.log(token)
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: postData,
				header: {
					'content-type': 'application/json',
					'Authorization': 'Bearer ' + token
				},
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					showLoading && uni.hideLoading()
					resolve(res.data)
				},
				fail: (res) => {
					fetch.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
}
function get(api){
	return request(api, null, 'GET', null, true)
}
function post(api,data){
	return request(api, data, 'POST', null, true)
}

module.exports = {
	get: get,
	post: post,
	setToken: setToken,
	getToken: getToken
}