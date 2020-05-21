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

var base_url_api = "http://localhost:8080/"
var base_url_oss = "http://localhost:8080/"


function uploadCommon(path,filePath, successFun, completeFun){
	return uni.uploadFile({
		url: base_url_api + path,
		filePath: filePath,
		fileType: 'image', //支付宝必填
		header: {'Authorization': 'Bearer ' + getToken()},
		name: 'file',
		success: (uploadFileRes) => {
			if (successFun){
				successFun(JSON.parse(uploadFileRes.data))
			}
		},
		fail: (res) => {
			console.log(res)
			uni.showToast({
				image:'/static/logo.png',
				title:'请检查网络'
			})						
		},
		complete: (res) => {
			if(completeFun){
				completeFun(res)
			}
		}
	});
	
}
function upload(filePath, successFun, completeFun){
	return uploadCommon("api/attachments/upload",filePath, successFun,completeFun)
	
}

function request(url, postData, method, type, showLoading) {
		//接口请求
		if (showLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...'
			})
		}
		url = base_url_api + url
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
						if (token == null && method !== 'POST') {
							//微信小程序审核，请在用户了解体验小程序功能后，再要求用户进行帐号登录。https://developers.weixin.qq.com/community/operate/doc/000640bb8441b82900e89f48351401
							reject(res)
						}else {
							uni.showToast({
								image:'/static/logo.png',
								title:'请登录'
							})
							setToken(null)
							uni.$emit('updatePageCur',{cur:'about'})							
						}

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
	uploadCommon: uploadCommon,
	upload: upload,
	setToken: setToken,
	getToken: getToken,
	baseUrlOss: function(url){
		if (!url){
			return null
		}
		if (url.indexOf("http")!=0){
			url = base_url_oss + url
		}
		return url
	}
}