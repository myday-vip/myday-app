<template>
	<view>
		<scroll-view scroll-y class="page bg-white">
			<image src="/static/bannerBG.png"
			 mode="widthFix" class="response"></image>
			 <view class="padding-xl text-white" style="position: absolute;top: 50rpx;">
			 	<view class="padding-xs text-xxl text-bold">
			 		<!-- <view class="cu-avatar xl round margin-right" style="background-image:url(../../static/logo.png);"></view> -->
			 		我的天啊 myday.vip
			 	</view>
			 	<view class="padding-xs text-lg">
			 		Focus on what matters. 专注于重要的事情
			 	</view>
			 </view>
				 <view class="bg-white flex p-xs mb-sm" style="padding: 0 30rpx 30rpx 30rpx;">
					<view class="flex-sub margin-xs">
						<view class="lex flex-wrap" style="height: 100%;">
							<view class="padding-sm">
								<picker @change="switchYear" :value="index" :range="years">
									<view class="picker text-bold">
										{{currentYearLabel}}
									</view>
								</picker>
							</view>
							<view class="year" v-for="(item,index) in 12" :key="index" >{{(index+1) + '月'}}</view>							
						</view>
					</view>
				 	<view class="grid col-7 grid-square" style="width: 90%;">
						<view class="text-center text-black text-bold" style="margin-top: 10rpx;" v-for="(item,index) in weekDays" :key="index" >{{item}}</view>
						<view style="background-color: #FFFFFF;" v-for="(item,index) in drawFirstDay" :key="index" ></view>
				 		<view v-for="(item,index) in days.days" :key="index" >
						<view :class="{'day-deep-0':!data[item.key],
						'day-deep-1':data[item.key] && data[item.key].length == 1,
						'day-deep-2':data[item.key] && data[item.key].length == 2,
						'day-deep-3':data[item.key] && data[item.key].length == 3,
						'day-deep-4':data[item.key] && data[item.key].length == 4,
						'day-deep-5':data[item.key] && data[item.key].length == 5,
						'day-deep-8':data[item.key] && data[item.key].length >5,
						'day-deep-future':item.key > nowDate}"
						:id="item.key == nowDate?'now-date':null" @click="dayClick(item)">
								<block v-if="item.key == nowDate">
									<view class="cu-tag badge bg-gradual-red" >
										<block>今天</block>
										<!-- {{item.key.substr(5)}} -->
									</view>
								</block>
						</view>
						
<!-- 						<view :class="!data[item.key].length?'day-deep-0':(data[item.key].length == 1?'day-deep-1':(data[item.key].length == 2?'day-deep-2':(data[item.key].length == 3?'day-deep-3':(data[item.key].length == 4?'day-deep-4':(data[item.key].length == 5?'day-deep-5':'day-deep-8')))))"
							:id="item.key == nowDate?'now-date':null" @click="dayClick(item)">
							<block v-if="item.key == nowDate">
								<view class="cu-tag badge bg-gradual-red" >
									<block>今天</block>
								</view>
							</block>
						</view> -->
						
						</view>
				 	</view>
				 </view>
			 <view>
				 <image src="/static/myday-banner2.png"
				  mode="widthFix" class="response"></image>
			 </view>
		</scroll-view>
	</view>
</template>

<script>
	import {getYearEvents} from '../../common/api.js'
	import {dateformat} from '../../common/util.js'
	export default {
		data() {
			return {
					monthDay:[
					  31, null, 31, 30, 
					  31, 30, 31, 31,
					  30, 31, 30, 31
					],
					days: {days:365,firstDay:1},
					years:[2020,2019,2018],//TODO DData
					currentYearLabel:'',
					weekDays:['周一','周二','周三','周四','周五','周六','周天'],
					data:{},
					nowDate: dateformat.all(new Date(),"yyyy-MM-dd")
				}
		},
		computed:{
			drawFirstDay(){
				return this.days.firstDay-1
			}
		},
		filters:{
			rectClass(item){
				console.log(item)
			}
		},
		onReady() {
			this.days = this.getDay(this.years[0])
		},
		updated: function () {
			let windowHeight = 0
			try{
				windowHeight = uni.getSystemInfoSync().windowHeight
			}catch(e){}
			
			uni.createSelectorQuery().in(this).select("#now-date").boundingClientRect((res)=>{
				let scrollto = res.top
				let duration = 2000
				if (windowHeight >0){
					let t = scrollto - windowHeight/2
					scrollto = t>0?t:scrollto
				}
				if (scrollto < windowHeight/2) {
					duration = 1000
				}
				uni.pageScrollTo({
					duration:duration,
					scrollTop:scrollto
				})
			}).exec()
			
		},
		methods: {
			dayClick: function(item){
				let day = this.data[item.key]
				if (!day){
					uni.showToast({
						icon:'none',
						title:item.key
					})
					
				}else {
					uni.navigateTo({
					    url: '/pages/life/timeline?date=' + item.key,
						animationType: 'pop-in',
						animationDuration: 260
					});
				}

			},
			switchYear: function(e){
				this.days = this.getDay(this.years[e.detail.value])
			},
			getDay: function(year){
				this.currentYearLabel = year
				let date = new Date(year, 0, 1)
				let day = date.getDay()
				//指定年天数,计算闰年
				let days = year%4==0 && year%100!=0 || year%400==0 ? 366 : 365
				//指定年第一天星期几
				let firstDay = day == 0?7:day
				
				let everyday = []
				for (let i=0; i<12; i++){
					let dayCount = this.monthDay[i] || (days==366? 29 : 28);
					for (let j=1; j<=dayCount; j++){
						let m = i+1
						m = m < 10?'0'+m:m
						let d = j
						d = d< 10?'0'+d:d,
						everyday.push({key:year+"-"+m+"-"+d})
					}
				}
				this.fetchData(year)
				return {'days': everyday,'firstDay': firstDay}
			},
			fetchData(year){
				getYearEvents(year).then((resp) => {
					this.data = resp
				})
			}
			
		}
	}

</script>

<style>
	.day-deep-future {
		background-color: #f4f8f9;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-0 {
		background-color: #E7EBED;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-1 {
		background-color: #c6e48b;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-2 {
		background-color: #7bc96f;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-3 {
		background-color: #6cb564;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-4 {
		background-color: #25a741;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-5 {
		background-color: #239a3b;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-8 {
		background-color: #196127;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	
	.year {
		height: calc((100% - 10upx)/12);
	}
	.grid.grid-square>view {
		margin: 0;
		border-width: 0.1rpx;
		border-color: white;
		border-style: solid;
		border-radius: 10;
		position: relative;
		overflow: hidden;
	}
	.cu-list.grid.col-7>.cu-item:nth-child(7n):after {
		border-right-width: 0
	}
	.grid.col-7.grid-square>view {
		padding-bottom: calc((100% - 10upx)/7);
		height: 0;
		width: calc((100% - 10upx)/7);
	}
	.grid.col-7.grid-square>view:nth-child(7) {
		height: 0;
		width: calc((100% - 10upx)/7);
	}
	.grid.col-7>view {
		width: 20%;
	}
	.now-date {
		border-width: 0.1rpx;
		border-color: red;
		border-style: solid;
	}
</style>
