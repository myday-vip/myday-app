<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">取消</block>
			<block slot="content">所在位置</block>
			<block slot="right" @click="checkCompleted">确定</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]" >
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索附加位置" confirm-type="search"></input>
			</view>
		</view>
		<view class=" cu-list menu-avatar" >
			<view class="cu-item" style="height: 100rpx;">
				<view class="content">
					<view class="text-grey"></view>
				</view>
			</view>
			<view class="cu-item" style="height: 100rpx;" @click="checked(null,-1)">
				<view class="content" style="left: 30upx;">
					<view class="text-grey">不显示位置</view>
				</view>
				<view class="action text-xxl" v-show="currentIndex === -1">
					<text class="cuIcon-check text-green"></text>
				</view>
			</view>
			<view class="cu-item" v-for="(item,index) in list" :key="index" @click="checked(item,index)">
				<view class="content" style="left: 30upx;width: 100%;">
					<view class="text-grey">{{item.name}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							{{item.address || item.name}}
						</view> 
					</view>
				</view>
				<view class="action text-xxl" v-show="currentIndex === index">
					<text class="cuIcon-check text-green"></text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import amap from '../../common/amap-wx.js'
	
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				list:[],
				currentIndex: -1,
				currentPosition:{}
			}
		},
		onLoad() {
			this.fetchLocation(getApp().globalData.GD_KEY)
		},
		onReady() {
		},
		methods: {
			checkCompleted(){
				uni.$emit("loaction:checked",this.currentPosition)
				uni.navigateBack({
				    delta: 1,
				    animationType: 'slide-out-bottom',
				});
			},
			checked(item,index){
				this.currentIndex = index
				if(index >= 0) {
					this.currentPosition = item
					this.currentPosition.city = this.list[0].city
				}else {
					this.currentPosition = null
				}
			},
			fetchLocation(key){
				uni.showLoading({
						title: '获取位置信息'  
				});
				var amapPlugin = new amap.AMapWX({
					key: key
				});
				amapPlugin.getRegeo({
					success: (data) => {  
						uni.hideLoading()
						
						let plist = []
						for (let i=0; i<data.length; i++ ) {
							let obj = data[i]
							let city = obj.regeocodeData.addressComponent.city
							plist.push({
								name: obj.name,
								address: obj.desc,
								location: obj.longitude + "," + obj.latitude,
								city: city,
								country: obj.regeocodeData.addressComponent.country
							})
							plist = plist.concat(obj.regeocodeData.roads)
							plist = plist.concat(obj.regeocodeData.aois)
							plist = plist.concat(obj.regeocodeData.pois)
						}
						this.list = plist
					},
					fail: function(info){
						console.log(info)
						uni.hideLoading()
					}
				});
			}
		}
	}
</script>

<style>

</style>
