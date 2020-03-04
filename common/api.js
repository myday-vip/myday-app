import {get,post} from './request.js'


module.exports = {
	login: function(code,user){
		user.code = code
		return post("login_by_weixin", user)
	},
	getEvent: function(){
		return get("api/event/today")
	}
}
