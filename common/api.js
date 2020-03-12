import {get,post} from './request.js'


module.exports = {
	login: function(code,user){
		user.code = code
		return post("login_by_weixin", user)
	},
	// event
	getEvent: function(){
		return get("api/event/today")
	},
	addEvent: function(event){
		return post("api/event", event)
	},
	getAllEvent: function(){
		return get("api/event/all")
	},
	updateStatusCompleted: function(id,data){
		return post("api/event/completed/" + id,data)
	},
	getYearEvents: function(year) {
		return get("api/event/year/" + year)
	},
	getEventTimeLine: function(date) {
		return get("api/event/neighbour/" + date)
	},
	getEventTimeLineNext: function(date) {
		return get("api/event/neighbour/" + date + "/1")
	},
	getEventTimeLinePrev: function(date) {
		return get("api/event/neighbour/" + date + "/2")
	}
}
