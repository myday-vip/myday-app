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

var base_url = "http://localhost:8080/"

function upload(filePath, successFun, completeFun){
	return uni.uploadFile({
		url: base_url + "api/attachments/upload",
		filePath: filePath,
		fileType: 'image', //支付宝必填
		header: {'Authorization': 'Bearer ' + getToken()},
		name: 'file',
		success: (uploadFileRes) => {
			successFun(JSON.parse(uploadFileRes.data))
		},
		fail: (res) => {
			console.log(res)
			uni.showToast({
				image:'/static/logo.png',
				title:'请检查网络'
			})						
		},
		complete: (res) => {
			completeFun(res)
		}
	});
	
}

function request(url, postData, method, type, showLoading) {
		//接口请求
		if (showLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...'
			})
		}
		url = base_url + url
		const token = getToken()
		var header = {}
		if (token) {
			header['Authorization']= 'Bearer ' + token
		}
		if (method === 'POST') {
			header['content-type']= 'application/json'
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: postData,
				header: header,
				method: method,
				dataType: 'json',
				success: (res) => {
					if (res.statusCode === 200) {
						resolve(res.data)
					}else if (res.statusCode === 401) {
						uni.showToast({
							image:'/static/logo.png',
							title:'请登录'
						})
						setToken(null)
						uni.$emit('updatePageCur',{cur:'about'})
					}else if (res.statusCode === 400) {	
						uni.showToast({
							image:'/static/logo.png',
							title: res.data
						})
						reject(res)
					}else {
						reject(res)
					}
				},
				fail: (res) => {
					uni.showToast({
						image:'/static/logo.png',
						title:'请检查网络'
					})						
					reject(res)
				},
				complete: () => {
					showLoading && uni.hideLoading()
				}
			})
		})
}
function get(api){
	return request(api, null, 'GET', null, false)
}
function post(api,data){
	return request(api, data, 'POST', null, false)
}

module.exports = {
	get: get,
	post: post,
	upload: upload,
	setToken: setToken,
	getToken: getToken
}