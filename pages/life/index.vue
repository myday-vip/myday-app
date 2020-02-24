<template>
	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/myday-banner2.png"
			 mode="widthFix" class="response"></image>
				 <view class="bg-white padding flex  p-xs  mb-sm">
					<view class="flex-sub margin-xs">
						<view class="lex flex-wrap" style="height: 100%;">
							<view>2020</view>
							<view class="year" v-for="(item,index) in 12" :key="index" >{{(index+1) + '月'}}</view>							
						</view>
					</view>
				 	<view class="grid col-7 grid-square" style="width: 90%;">
						<view class="text-center text-black" style="margin-top: 10rpx;" v-for="(item,index) in 7" :key="index" >{{'星期' + (index+1)}}</view>
						<view style="background-color: #FFFFFF;" v-for="(item,index) in drawFirstDay" :key="index" ></view>
				 		<view style="background-color: #E7EBED;" v-for="(item,index) in 365" :key="index" ></view>
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
					firstDay: 1
				}
		},
		computed:{
			drawFirstDay(){
				return this.firstDay-1
			}
		},
		onReady() {
			this.firstDay = this.getCurrentWeekday()
		},
		methods: {
			getCurrentWeekday: function(){
				let now = new Date();
				console.log(now.getFullYear())
				let date = new Date(now.getFullYear(), 0, 1);
				console.log(date)
				let day = date.getDay()
				return day == 0?7:day
			},
			
		}
	}

</script>

<style>
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
	.grid.col-7.grid-square>view:nth-child(7n) {
		margin-right: 0;
	}
	.grid.col-7>view {
		width: 20%;
	}
</style>
