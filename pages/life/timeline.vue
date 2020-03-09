<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">时间</block></cu-custom>


		<view class="cu-timeline" v-for="(item,index) in data" :key="index">
			<view class="cu-time">{{item[0].createTime | fomate1}}</view>
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
					data:[
						[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-1-6 21:21:21"}, 
							{"subject": "英语口语", "classify": "INPUT", "createTime":"2020-1-6 21:21:21"}, 
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-1-6 21:21:21"}],
						[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-1-21 21:21:21"},
							{"subject": "写读后感", "classify": "OUTPUT", "createTime":"2020-1-21 21:21:21"},
							{"subject": "跑步5公里", "classify": "PHYSICAL_AGILITY", "createTime":"2020-1-21 21:21:21"}],
						[
							{"subject": "写读后感", "classify": "OUTPUT", "createTime":"2020-2-1 21:21:21"},
							{"subject": "跑步5公里", "classify": "PHYSICAL_AGILITY", "createTime":"2020-2-1 21:21:21"}],
						[
							{"subject": "英语单词", "classify": "INPUT", "createTime":"2020-2-22 21:21:21"}, 
							{"subject": "英语口语", "classify": "INPUT", "createTime":"2020-2-22 21:21:21"}, 
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-2-22 21:21:21"},
							{"subject": "写博客", "classify": "OUTPUT", "createTime":"2020-2-22 21:21:21"}],
					],
					timeLabel:["清晨5-8","上午8-11","中午11-13","下午13-18","傍晚18-21","深夜21-1","凌晨1-5"]
			};
		},
		onLoad: function (option) { 
			if (option.date) {
				this.fetchData(option.date)
			}
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
				getEventTimeLine(date).then((res) => {
					this.data = res
				})
			}
		}
	}
</script>

<style>

</style>
