<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/myday-banner2.png"
			 mode="widthFix" class="response"></image>
				 <view class="bg-white padding flex p-xs mb-sm">
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
							<view v-if="!data[index]" class="day-deep-0"></view>
							<view v-else-if="data[index].length == 1" class="day-deep-1" @click="dayClick(data[index])"></view>
							<view v-else-if="data[index].length == 2" class="day-deep-2" @click="dayClick(data[index])"></view>
							<view v-else-if="data[index].length == 3" class="day-deep-3" @click="dayClick(data[index])"></view>
							<view v-else-if="data[index].length == 4" class="day-deep-4" @click="dayClick(data[index])"></view>
							<view v-else-if="data[index].length == 5" class="day-deep-5" @click="dayClick(data[index])"></view>
							<view v-else-if="data[index].length >=8" class="day-deep-8" @click="dayClick(data[index])"></view>
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
	export default {
		data() {
			return {
					days: {days:365,firstDay:1},
					years:[2020,2019,2018],//TODO DData
					currentYearLabel:'',
					weekDays:['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'],
					data:{
						6:[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-1-6 21:21:21"}, 
							{"subject": "英语口语", "classify": "INPUT", "createTime":"2020-1-6 21:21:21"}, 
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-1-6 21:21:21"}],
						21:[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-1-21 21:21:21"},
							{"subject": "写读后感", "classify": "OUTPUT", "createTime":"2020-1-21 21:21:21"},
							{"subject": "跑步5公里", "classify": "PHYSICAL_AGILITY", "createTime":"2020-1-21 21:21:21"}],
						32:[
							{"subject": "写读后感", "classify": "OUTPUT", "createTime":"2020-2-1 21:21:21"},
							{"subject": "跑步5公里", "classify": "PHYSICAL_AGILITY", "createTime":"2020-2-1 21:21:21"}],
						53:[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-2-22 21:21:21"}, 
							{"subject": "英语口语", "classify": "INPUT", "createTime":"2020-2-22 21:21:21"}, 
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-2-22 21:21:21"},
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-2-22 21:21:21"}],
					}
				}
		},
		computed:{
			drawFirstDay(){
				return this.days.firstDay-1
			}
		},
		onReady() {
			this.days = this.getDay(this.years[0])
		},
		methods: {
			dayClick: function(data){
				uni.navigateTo({
				    url: '/pages/life/timeline?id=1&name=uniapp',
					animationType: 'pop-in',
					animationDuration: 260,
					complete: function(e){
						console.log(e)
					}
				});
				console.log(data)
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
				//
				//year = year+'';Math.ceil(( new Date(year,0,1) - new Date(year))/(24*60*60*1000))+1;
				return {'days': days,'firstDay': firstDay}
			},
			
		}
	}

</script>

<style>
	.day-deep-0 {
		background-color: #E7EBED;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-1 {
		background-color: #66d09f;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-2 {
		background-color: #56af85;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-3 {
		background-color: #438968;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-4 {
		background-color: #758cde;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-5 {
		background-color: #6074b7;
		position: absolute;top: 0;bottom: 0;right: 0;left: 0;
	}
	.day-deep-8 {
		background-color: #d05518;
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
		border-radius: 0;
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
</style>
