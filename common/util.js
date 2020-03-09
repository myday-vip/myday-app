function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}
	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time
	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}
function dateformat (date, fmt) {
   if (/(y+)/.test(fmt)) {
	   fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   let o = {
	   'M+': date.getMonth() + 1,
	   'd+': date.getDate(),
	   'h+': date.getHours(),
	   'm+': date.getMinutes(),
	   's+': date.getSeconds()
   };
   for (let k in o) {
	   if (new RegExp(`(${k})`).test(fmt)) {
		   let str = o[k] + '';
		   //fmt = fmt.replace(RegExp.$1, str);
		   fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
	   }
   }
   return fmt;
}

function padLeftZero (str) {
   return ('00' + str).substr(str.length)
}

function dateformat1(value) {
        if(value==null || value == undefined){
            return "";
        }
        var date = new Date(value);
        
        var Y = date.getFullYear(),
            m = date.getMonth()+1,
            d = date.getDate(),
            H = date.getHours(),
            i = date.getMinutes(),
            s = date.getSeconds();
        return Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
}
function dateformat2(value) {
        if(value==null || value == undefined){
            return "";
        }
        var date = new Date(value);
        
        var m = date.getMonth()+1,
            d = date.getDate();
        return m+'-'+d;
}
function dateformat3(value) {
        if(value==null || value == undefined){
            return "";
        }
        var date = new Date(value);
        
        var H = date.getHours(),
            i = date.getMinutes();
        return H+':'+i;
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

module.exports = {
	dateformat: {
		all:dateformat,
		f1:dateformat1,
		f2:dateformat2,
		f3:dateformat3
	},
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils
}
