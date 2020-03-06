module.exports = {
	storage: {
		put: function(key, val) {
			try{
				uni.setStorageSync(key, val)
			}catch(e){
				console.error(e)
			}
		},
		get: function(key) {
			try{
				return uni.getStorageSync(key)
			}catch(e){
				console.error(e)
			}
		}
	}
}