import {get,post} from './request.js'


module.exports = {
	login: function(code,user){
		user.code = code
		return post("login_by_weixin", user)
	},
	getEvent: function(){
		return get("api/event/today")
	},
	addEvent: function(event){
		return post("api/event", event)
	},
	getAllEvent: function(){
		return get("api/event/all")
	}
}
