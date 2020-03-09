<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">时间</block></cu-custom>


		<view class="cu-timeline" v-for="(item,index) in data" :key="index">
			<view class="cu-time" :class="item[0].current?'current':''">{{item[0].time1}}</view>
			<view class="cu-item" 
			:class="subitem.classify == 'INPUT'?'text-orange':(subitem.classify == 'OUTPUT'?'text-green':'text-red')"
			v-for="(subitem,subindex) in item" :key="subindex">
				<view class="content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-cyan">{{subitem.updateTime | fomate3}}</view>
						<view class="cu-tag line-cyan">{{subitem.updateTime | fomate2}}</view>
					</view>
					<view class="margin-top">{{subitem.subject}}</view>
					<view class="margin-top">{{subitem.text}}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {getEventTimeLine} from '../../common/api.js'
	import {dateformat} from '../../common/util.js'
	export default {
		data() {
			return {
				data:[],
				currentDate: null//点击进来的时间 e.g:2020-01-01
			};
		},
		onLoad: function (option) { 
			if (option.date) {
				this.fetchData(option.date)
			}
		},
		mounted: function () {
		  this.$nextTick(function () {
			uni.createSelectorQuery().select(".cu-timeline").boundingClientRect(data=>{
				uni.createSelectorQuery().select(".current").boundingClientRect((res)=>{
					uni.pageScrollTo({
						duration:2000,
						scrollTop:res.top - data.top
					})
				}).exec()
			}).exec();
		  })
		},
		filters:{
			fomate1: function(time) {
				var date = new Date(time)
				return dateformat.all(date,"MM-dd")
			},
			fomate2: function(time) {
				var date = new Date(time)
				return dateformat.all(date,"hh:mm")
			},
			fomate3: function(time) {
				var date = new Date(time)
				var hour = date.getHours()
				var timeLabel
				if (hour>=1 && hour<5) {
					timeLabel = "凌晨"
				}else if (hour>=5 && hour<8){
					timeLabel = "清晨"
				}else if (hour>=8 && hour<11){
					timeLabel = "上午"
				}else if (hour>=11 && hour<13){
					timeLabel = "中午"
				}else if (hour>=13 && hour<18){
					timeLabel = "下午"
				}else if (hour>=18 && hour<21){
					timeLabel = "傍晚"
				}else{
					timeLabel = "深夜"
				}
				return timeLabel
			}
		},
		methods:{
			fetchData: function(date) {
				this.currentDate = date
				getEventTimeLine(date).then((res) => {
					res.forEach( e => {
						let updateTime = new Date(e[0].updateTime || e[0].createTime)
						let fdate = dateformat.all(updateTime,"yyyy-MM-dd hh:mm")
						let fdateArr = fdate.split(" ")
						e[0].time1 = fdateArr[0].substr(5)
						//e[0].time2 = fdateArr[1]
						e[0].current = fdateArr[0] == this.currentDate
					})
					this.data = res
				})
			}
		}
	}
</script>

<style>

</style>
