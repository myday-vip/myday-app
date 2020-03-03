import {get,post} from './request.js'


module.exports = {
	login: function(code,user){
		user.code = code
		console.log(user)
		return post("login_by_weixin", user)
	}
}
