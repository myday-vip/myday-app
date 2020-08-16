import {get,post,uploadCommon} from './request.js'


module.exports = {
	login: function(code,user){
		user.code = code
		return post("login_by_weixin", user)
	},
	loginwxapp: function(token,openid){
		var user = {}
		user.accessToken = token
		user.openid = openid
		return post("login_by_weixin_app", user)
	},
	updatePhoto: function(img,success){
		return uploadCommon("api/user/photo",img,success)
	},
	updateBirthday: function(date) {
		let data = {}
		data.birthday = date
		return post("api/user/birthday", data)
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
	updateStatusFinal: function(id){
		return post("api/event/final/" + id)
	},
	updateSubject: function(event){
		return post("api/event/subject?id="+event.id+"&subject="+event.subject)
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
	},
	getAllEventDetail: function() {
		return get("api/event/all/detail")
	},
	getEventDetail: function(id){
		return get("api/event/"+id+"/detail")
	},
	getReportWeeks: function(flag){
		return get("api/reports/weeks?flag="+flag)
	},
	getReportMonths: function(flag){
		return get("api/reports/months?flag="+flag)
	}
}
